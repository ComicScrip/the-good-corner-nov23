import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) =>
  c.html(
    `<p>To use this service, POST on ${c.req.url + "uploads"} 
    with a multipart form containing a "file" field with your file to store.</p>`
  )
);

app.use("/files/*", serveStatic({ root: "." }));

app.post("/uploads", async (c) => {
  const { file }: { file: File } = await c.req.parseBody();
  const path = "files/" + Date.now() + "-" + file.name;
  await Bun.write(path, file);

  return c.json({ path, url: c.req.url.replace("uploads", path) });
});

console.log("server ready");

process.on("SIGINT", () => {
  console.log("Exiting...");
  process.exit();
});

export default {
  port: process.env.PORT || 8000,
  fetch: app.fetch,
};
