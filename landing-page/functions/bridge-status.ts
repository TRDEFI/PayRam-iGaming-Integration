import type { Context } from "@netlify/functions";

const BRIDGE_API = "https://bridge.polymarket.com";

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");

  if (!address) {
    return new Response(JSON.stringify({ error: "Address parameter required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await fetch(`${BRIDGE_API}/status/${address}`, {
      headers: {
        "X-Builder-Code": process.env.POLY_BUILDER_CODE || "",
      },
    });
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get status" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/bridge/status",
};
