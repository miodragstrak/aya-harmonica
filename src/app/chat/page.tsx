'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'

type Message = {
  sender: 'Person1' | 'Person2' | 'AI'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [person2Joined, setPerson2Joined] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    const res = await fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify({ content: input, person2Joined }),
    })
    const data = await res.json()
    setMessages((prev) => [...prev, { sender: 'Person1', content: input }, ...data.replies])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage()
  }

  const joinChat = async () => {
    await fetch('/api/join', { method: 'POST' })
    setPerson2Joined(true)
    setMessages((prev) => [...prev, { sender: 'System', content: 'Person 2 joined. AI left.' }])
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Simple Chat</h1>

      <div className="border h-80 overflow-y-scroll p-2 flex flex-col-reverse">
        {messages.map((m, i) => (
          <div key={i} className="my-1">
            <strong>{m.sender}:</strong> {m.content}
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        className="w-full border px-2 py-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
      />

      {!person2Joined && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={joinChat}>
          Person 2 Join Chat
        </button>
      )}
    </div>
  )
}
