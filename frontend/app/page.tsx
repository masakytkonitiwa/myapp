

  import HelloClient from "./hello-client";

  export default function Page() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full p-8 bg-white rounded-2xl shadow">
          <h1 className="text-3xl font-bold">Hello World 👋</h1>
          <p className="text-gray-600 mt-2">
            フロント→（同一オリジンの）API→Django の順に呼びます（CORS不要）。
          </p>
          <div className="mt-6">
            <HelloClient />
          </div>
        </div>
      </main>
    );
  }

