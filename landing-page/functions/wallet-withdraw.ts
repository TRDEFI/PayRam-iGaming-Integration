import type { Context } from "@netlify/functions";

const BRIDGE_API = "https://bridge.polymarket.com";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { walletAddress, toChainId, toTokenAddress, recipientAddress } = await req.json();

    if (!walletAddress || !toChainId || !toTokenAddress || !recipientAddress) {
      return new Response(
        JSON.stringify({ error: "walletAddress, toChainId, toTokenAddress, and recipientAddress required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get quote first
    const quoteResponse = await fetch(`${BRIDGE_API}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromAmountBaseUnit: "0", // Quote doesn't need exact amount
        fromChainId: "137", // Polygon
        fromTokenAddress: "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB", // pUSD
        recipientAddress,
        toChainId,
        toTokenAddress,
      }),
    });

    const quoteData = await quoteResponse.json();

    // Create withdrawal addresses
    const withdrawResponse = await fetch(`${BRIDGE_API}/withdraw`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: walletAddress,
        toChainId,
        toTokenAddress,
        recipientAddr: recipientAddress,
      }),
    });

    const withdrawData = await withdrawResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        quote: quoteData,
        withdrawalAddresses: withdrawData.address,
        note: withdrawData.note,
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
  path: "/api/wallet/withdraw",
};
