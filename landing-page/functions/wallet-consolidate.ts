import type { Context } from "@netlify/functions";

const RELAYER_API = "https://relayer-v2.polymarket.com";
const PUSD_CONTRACT = "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB";

function padAddress(address: string): string {
  return address.toLowerCase().replace("0x", "").padStart(64, "0");
}

function createTransferCalldata(to: string, amountBaseUnit: string): string {
  const transferSelector = "0xa9059cbb";
  const toPadded = to.slice(2).padStart(64, "0");
  const amountPadded = BigInt(amountBaseUnit).toString(16).padStart(64, "0");
  return `${transferSelector}${toPadded}${amountPadded}`;
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { wallets, targetAddress, userPrivateKey } = await req.json();

    if (!wallets || !Array.isArray(wallets) || wallets.length === 0) {
      return new Response(JSON.stringify({ error: "Wallets array required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!targetAddress) {
      return new Response(JSON.stringify({ error: "Target address required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!userPrivateKey) {
      return new Response(JSON.stringify({ error: "User private key required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const relayerApiKey = process.env.POLY_RELAYER_API_KEY;
    const relayerApiKeyAddress = process.env.POLY_RELAYER_API_KEY_ADDRESS;

    if (!relayerApiKey || !relayerApiKeyAddress) {
      return new Response(JSON.stringify({ error: "Relayer API not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const results = [];

    for (const wallet of wallets) {
      try {
        // Get wallet balance first
        const RPC_URL = "https://polygon.drpc.org/";
        const BALANCE_OF_SIG = "0x70a08231";
        const callData = BALANCE_OF_SIG + padAddress(wallet.address);

        const balanceResponse = await fetch(RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "eth_call",
            params: [{ to: PUSD_CONTRACT, data: callData }, "latest"],
          }),
        });

        const balanceData = await balanceResponse.json();
        const hexBalance = balanceData.result || "0x0";
        const balanceRaw = parseInt(hexBalance, 16);

        if (balanceRaw === 0) {
          results.push({
            address: wallet.address,
            status: "skipped",
            reason: "Zero balance",
          });
          continue;
        }

        // Get nonce for the wallet
        const nonceResponse = await fetch(`${RELAYER_API}/relay-payload?address=${wallet.address}&type=SAFE`, {
          headers: {
            "RELAYER_API_KEY": relayerApiKey,
            "RELAYER_API_KEY_ADDRESS": relayerApiKeyAddress,
          },
        });

        const nonceData = await nonceResponse.json();
        const nonce = nonceData.nonce || "0";

        // Create transfer calldata
        const calldata = createTransferCalldata(targetAddress, balanceRaw.toString());

        // Sign the transaction (simplified - in production use proper signing)
        const signature = "0x" + "00".repeat(65); // Placeholder signature

        // Submit to relayer
        const submitResponse = await fetch(`${RELAYER_API}/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "RELAYER_API_KEY": relayerApiKey,
            "RELAYER_API_KEY_ADDRESS": relayerApiKeyAddress,
          },
          body: JSON.stringify({
            from: wallet.address,
            to: PUSD_CONTRACT,
            proxyWallet: wallet.address,
            data: calldata,
            nonce: nonce,
            signature: signature,
            signatureParams: {
              gasPrice: "0",
              operation: "0",
              safeTxnGas: "0",
              baseGas: "0",
              gasToken: "0x0000000000000000000000000000000000000000",
              refundReceiver: "0x0000000000000000000000000000000000000000",
            },
            type: "SAFE",
          }),
        });

        const submitData = await submitResponse.json();

        results.push({
          address: wallet.address,
          status: "submitted",
          transactionID: submitData.transactionID,
          amount: balanceRaw / 1e6,
        });
      } catch (error) {
        results.push({
          address: wallet.address,
          status: "error",
          error: (error as Error).message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        targetAddress,
        results,
        totalWallets: wallets.length,
        completed: results.filter(r => r.status === "submitted").length,
        failed: results.filter(r => r.status === "error").length,
        skipped: results.filter(r => r.status === "skipped").length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/wallet/consolidate",
};
