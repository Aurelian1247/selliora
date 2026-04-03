import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { shop, accessToken, title, content } = body;

  if (!shop || !accessToken) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // 🔥 1. LUĂM BLOGURILE EXISTENTE
  const blogsRes = await fetch(`https://${shop}/admin/api/2024-01/blogs.json`, {
    headers: {
      "X-Shopify-Access-Token": accessToken,
    },
  });

  const blogsData = await blogsRes.json();

  let blogId = blogsData.blogs?.[0]?.id;

  // 🔥 2. DACĂ NU EXISTĂ NICIUN BLOG → CREĂM UNUL
  if (!blogId) {
    const createBlogRes = await fetch(`https://${shop}/admin/api/2024-01/blogs.json`, {
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

    const newBlog = await createBlogRes.json();
    blogId = newBlog.blog?.id;

    if (!blogId) {
      return NextResponse.json({ error: "Blog creation failed" }, { status: 500 });
    }
  }

  // 🔥 3. CREĂM ARTICOLUL ÎN BLOG
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