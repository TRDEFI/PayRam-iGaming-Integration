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
    const { fromAmount, fromChain, fromToken, toChain, toToken, recipientAddress } = await req.json();

    if (!fromAmount || !fromChain || !fromToken || !toChain || !toToken || !recipientAddress) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(`${BRIDGE_API}/quote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Builder-Code": process.env.POLY_BUILDER_CODE || "",
      },
      body: JSON.stringify({
        fromAmountBaseUnit: fromAmount,
        fromChainId: fromChain,
        fromTokenAddress: fromToken,
        recipientAddress,
        toChainId: toChain,
        toTokenAddress: toToken,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get quote" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/bridge/quote",
};
