'use client'

import { useState } from 'react'

export default function Person2Page() {
  const [joined, setJoined] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const joinChat = async () => {
    await fetch('/api/join', { method: 'POST' })
    setJoined(true)
  }

  const sendMessage = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      const msg = input.trim()
      setMessages(prev => [`You: ${msg}`, ...prev])
      setInput('')

      // Simulate response (you can expand this to actually send messages to Person 1)
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Person 2 Chat</h1>
      {!joined ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={joinChat}
        >
          Join Chat
        </button>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
