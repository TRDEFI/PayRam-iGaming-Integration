import type { Context } from "@netlify/functions";

const USDC_CONTRACT = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";
const RPC_URL = "https://polygon.drpc.org/";

// balanceOf(address) function signature
const BALANCE_OF_SIG = "0x70a08231";

function padAddress(address: string): string {
  return address.toLowerCase().replace("0x", "").padStart(64, "0");
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { address } = await req.json();

    if (!address) {
      return new Response(JSON.stringify({ error: "Address required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build eth_call request for USDC balanceOf
    const callData = BALANCE_OF_SIG + padAddress(address);
    
    const rpcPayload = {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [
        {
          to: USDC_CONTRACT,
          data: callData,
        },
        "latest",
      ],
    };

    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rpcPayload),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "RPC error");
    }

    // Convert hex result to decimal (USDC has 6 decimals)
    const hexBalance = data.result || "0x0";
    const balanceRaw = parseInt(hexBalance, 16);
    const balance = balanceRaw / 1e6; // USDC has 6 decimals

    // Also get MATIC balance
    const maticPayload = {
      jsonrpc: "2.0",
      id: 2,
      method: "eth_getBalance",
      params: [address, "latest"],
    };

    const maticResponse = await fetch(RPC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maticPayload),
    });

    const maticData = await maticResponse.json();
    const maticHex = maticData.result || "0x0";
    const maticRaw = parseInt(maticHex, 16);
    const maticBalance = maticRaw / 1e18; // MATIC has 18 decimals

    return new Response(
      JSON.stringify({
        address,
        chain: "polygon",
        chainId: 137,
        balances: {
          USDC: {
            balance: balance,
            contract: USDC_CONTRACT,
            decimals: 6,
          },
          MATIC: {
            balance: maticBalance,
            decimals: 18,
          },
        },
        lastUpdated: new Date().toISOString(),
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
  path: "/api/balance-check",
};
