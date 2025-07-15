'use client'

import React, { useState } from 'react'

type Reply = {
  sender: string
  content: string
}

export default function Person1Page() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [person2Joined] = useState(false) // Removed unused setPerson2Joined

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const userMsg = input.trim()
      setMessages((prev) => [`You: ${userMsg}`, ...prev])
      setInput('')

      const res = await fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify({ content: userMsg, person2Joined }),
      })

      const data = await res.json()
      data.replies?.forEach((m: Reply) =>
        setMessages((prev) => [`${m.sender}: ${m.content}`, ...prev])
      )
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Person 1 Chat</h1>
      <div className="border h-64 overflow-y-scroll p-2 flex flex-col-reverse mb-2">
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={sendMessage}
        className="w-full border p-2"
        placeholder="Type and press Enter"
      />
    </div>
  )
}
