export async function POST() {
  // You might save to session, DB, etc. This is in-memory only for demo
  return new Response('Person 2 joined', { status: 200 })
}
