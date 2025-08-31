// 任意: ルートを常に動的に（App Routerのキャッシュ回避）
export const dynamic = 'force-dynamic';

export async function GET() {
  const base = process.env.DJANGO_BASE; // 例: http://localhost:8000 or https://your-api.run.app
  if (!base) {
    return new Response(JSON.stringify({ message: "DJANGO_BASE が未設定です" }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  try {
    const r = await fetch(`${base.replace(/\/$/, "")}/api/hello/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    // 後段の Content-Type を尊重。charset が無ければ付与
    const upstreamCT = r.headers.get("content-type");
    const contentType =
      upstreamCT
        ? (/\bcharset=/i.test(upstreamCT) ? upstreamCT : `${upstreamCT}; charset=utf-8`)
        : "application/json; charset=utf-8";

    // ★ 文字化け回避のため、テキストにせず「バイトのまま」中継
    const body = await r.arrayBuffer();

    return new Response(body, {
      status: r.status,
      headers: {
        "content-type": contentType,
        "cache-control": "no-store",
      },
    });
  } catch {
    // 上流に到達できない等
    return new Response(JSON.stringify({ message: "Upstream fetch failed" }), {
      status: 502,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
