import { NextResponse } from 'next/server'

let person2Joined = false

export async function POST(req: Request) {
  const { content, person2Joined: localJoined } = await req.json()

  // Update server state
  person2Joined = localJoined

  if (!person2Joined) {
    // Call AI via n8n webhook
    const aiRes = await fetch('https://mstrak.app.n8n.cloud/webhook-test/api/n8b-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: content }),
    })
    const aiReply = await aiRes.text()
    return NextResponse.json({ replies: [{ sender: 'AI', content: aiReply }] })
  } else {
    // Person 2 should send reply manually (or simulate)
    return NextResponse.json({ replies: [] })
  }
}
