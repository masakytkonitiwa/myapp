'use client';

import { useState } from "react";

export default function HelloClient() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true); setErr(null); setMsg(null);
    try {
      const res = await fetch("/api/hello", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json(); // { message: "..." }
      setMsg(data.message ?? JSON.stringify(data));
    } catch (e: any) {
      setErr(e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={onClick}
        className="px-5 py-2 rounded-xl shadow border hover:shadow-md active:scale-[0.99] transition"
        disabled={loading}
      >
        {loading ? "Loading..." : "バックエンドに挨拶する"}
      </button>

      {msg && (
        <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
          <div className="font-medium">Backend says:</div>
          <div className="mt-1">{msg}</div>
        </div>
      )}
      {err && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
          Error: {err}
        </div>
      )}
    </div>
  );
}
