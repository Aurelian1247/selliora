import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { shop, accessToken, title, content } = body;

  if (!shop || !accessToken) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const res = await fetch(`https://${shop}/admin/api/2024-01/blogs.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blog: {
        title: "Selliora Blog",
      },
    }),
  });

  const blogData = await res.json();

  const blogId = blogData.blog?.id;

  if (!blogId) {
    return NextResponse.json({ error: "Blog creation failed" }, { status: 500 });
  }

  const articleRes = await fetch(
    `https://${shop}/admin/api/2024-01/blogs/${blogId}/articles.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        article: {
          title,
          body_html: content,
        },
      }),
    }
  );

  const articleData = await articleRes.json();

  return NextResponse.json(articleData);
}