import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Simple demo auth - in production, use a proper DB
    // For now, accept any email/password combination
    const user = {
      id: Buffer.from(email).toString("base64").slice(0, 20),
      email,
      name: email.split("@")[0],
      createdAt: new Date().toISOString(),
    };

    // Generate a simple token (in production, use JWT with secret)
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
  path: "/api/auth/login",
};
