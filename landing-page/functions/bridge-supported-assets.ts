import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  try {
    const response = await fetch("https://bridge.polymarket.com/supported-assets", {
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
    return new Response(JSON.stringify({ error: "Failed to fetch supported assets" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/bridge/supported-assets",
};
