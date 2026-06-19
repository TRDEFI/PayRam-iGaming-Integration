import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: "Email, password, and name required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Simple demo registration - in production, use a proper DB
    const user = {
      id: Buffer.from(email).toString("base64").slice(0, 20),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    // Generate a simple token
    const token = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 86400000 })).toString("base64");

    return new Response(JSON.stringify({ user, token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/auth/register",
};
