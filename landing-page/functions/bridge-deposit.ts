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
    const { address } = await req.json();

    if (!address) {
      return new Response(JSON.stringify({ error: "Address required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(`${BRIDGE_API}/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Builder-Code": process.env.POLY_BUILDER_CODE || "",
      },
      body: JSON.stringify({ address }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create deposit address" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/bridge/deposit",
};
