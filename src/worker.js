export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/home") {
      return new Response(`<!doctype html><html><head>
        <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Stadli Admin</title><script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="/css/base.css" />
      </head><body class='container'>
        <h1 class='text-2xl font-semibold mb-4'>Welcome to Stadli</h1>
        <p class='text-gray-700'>This is an empty-but-configured Worker.</p>
        <p class='mt-4'><a class='underline' href='/contact'>Contact form</a></p>
      </body></html>`, { headers: {"content-type":"text/html;charset=utf-8"} });
    }
    if (url.pathname === "/contact" && request.method === "GET") {
      return new Response(`<!doctype html><html><head>
        <meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Contact</title><script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="/css/base.css" />
      </head><body class='container'>
        <h1 class='text-xl font-semibold mb-4'>Contact</h1>
        <form method="POST" action="/contact" class="space-y-3">
          <label class="block">Name <input name="name" class="border rounded px-2 py-1" required/></label>
          <label class="block">Email <input name="email" type="email" class="border rounded px-2 py-1" required/></label>
          <label class="block">Message <textarea name="message" rows="4" class="border rounded px-2 py-1"></textarea></label>
          <button class="px-3 py-1 rounded bg-black text-white">Send</button>
        </form>
      </body></html>`, { headers: {"content-type":"text/html;charset=utf-8"} });
    }
    if (url.pathname === "/contact" && request.method === "POST") {
      const form = await request.formData();
      const name = form.get("name");
      const email = form.get("email");
      const message = form.get("message");
      try {
        await env.DB.prepare("INSERT INTO contacts (name, email, message) VALUES (?1, ?2, ?3)").bind(name, email, message).run();
      } catch (e) {}
      return Response.redirect("/thank-you", 303);
    }
    if (url.pathname === "/thank-you") {
      return new Response("<!doctype html><html><body class='container'><h1>Thanks!</h1><p>We got your message.</p></body></html>", { headers: {"content-type":"text/html;charset=utf-8"} });
    }
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({
        ok: true,
        bindings: { d1: !!env.DB, kv_sessions: !!env.SESSIONS, kv_config: !!env.CONFIG, r2: !!env.ASSETS, ai: !!env.AI }
      }, null, 2), { headers: {"content-type":"application/json;charset=utf-8"} });
    }
    return new Response("Not found", { status: 404 });
  }
}