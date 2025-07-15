// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Aya Harmony Chat</h1>
      <div className="space-x-4">
        <a
          href="/person1"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enter as Person 1
        </a>
        <a
          href="/person2"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Enter as Person 2
        </a>
      </div>
    </main>
  )
}
