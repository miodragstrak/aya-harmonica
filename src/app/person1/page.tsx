'use client'

import React, { useState, useEffect, useRef } from 'react'

type Reply = {
  sender: string
  content: string
}

export default function Person1Page() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [person2Joined] = useState(false)

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const userMsg = input.trim()
      setMessages(prev => [...prev, `You: ${userMsg}`])
      setInput('')

      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMsg, person2Joined }),
      })

      const data = await res.json()
      data.replies?.forEach((m: Reply) =>
        setMessages(prev => [...prev, `${m.sender}: ${m.content}`])
      )
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Person 1 Chat</h1>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 p-2 border rounded bg-gray-50">
        {messages.map((m, i) => {
          const isUser = m.startsWith('You:')
          return (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                isUser
                  ? 'bg-blue-500 text-white self-end ml-auto'
                  : 'bg-gray-200 text-gray-900 self-start mr-auto'
              }`}
            >
              {m}
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={sendMessage}
        placeholder="Type your message..."
        className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}
