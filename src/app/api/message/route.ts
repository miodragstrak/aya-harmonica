// src/app/api/message/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { content, person2Joined } = body

  // When Person 2 joined, no AI involved
  if (person2Joined) {
    return NextResponse.json({
      replies: [
        { sender: 'Person 2', content: 'Message sent to Person 1 (simulated).' },
      ],
    })
  }

  // Simulate sessionId (could use UUID, wallet, user ID...)
  const sessionId = 'person1-session-id'

  const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        sessionId,
        action: 'sendMessage',
        chatInput: content,
      },
    ]),
  })

  const n8nData = await response.json()

  // You may adjust this based on your AI agent's output structure
  const aiReply = n8nData[0]?.reply || 'No response from AI'

  return NextResponse.json({
    replies: [
      {
        sender: 'AI',
        content: aiReply,
      },
    ],
  })
}
