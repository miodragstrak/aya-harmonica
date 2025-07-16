import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { content, person2Joined } = body

    if (person2Joined) {
      return NextResponse.json({
        replies: [{ sender: 'Person 2', content: 'Simulated reply' }],
      })
    }

    const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          sessionId: 'person1-session-id',
          action: 'sendMessage',
          chatInput: content,
        },
      ]),
    })

    const data = await res.json()

    return NextResponse.json({
      replies: [
        {
          sender: 'AI',
           content: data.output || 'No reply from AI',
        },
      ],
    })
  } catch (error) {
    console.error('🔥 API Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
