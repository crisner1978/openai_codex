'use client'

import React, { useState } from 'react'
import ChatMessages from './ChatMessages'
import Image from 'next/image'
import { generateUniqueId } from '@/utils'

export interface Message {
  id: string
  text: string
  type: 'bot' | 'user'
}

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!prompt) return alert('Please enter a prompt')

    const userMessage = { id: generateUniqueId(), text: prompt, type: 'user' }
    setPrompt('')
    setMessages((prev: any) => [...prev, userMessage])

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.text }),
      })

      if (response.ok) {
        const data = await response.json()
        const parsedData = data.bot.trim()
        console.log(parsedData)

        if (parsedData) {
          const botMessage = { id: generateUniqueId(), text: parsedData, type: 'bot' }

          // Check if message with the same id already exists in the messages array
          if (!messages.some((message) => message.id === botMessage.id)) {
            setMessages((prev: any) => [...prev, botMessage])
          }
        }
      } else {
        const err = await response.text()
        alert(err)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div id='app'>
      <ChatMessages messages={messages} />
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          name='prompt'
          rows={1}
          cols={1}
          placeholder='Ask codex...'
        />
        <button type='submit'>
          <Image src='/assets/send.svg' alt='send' width={100} height={100} />
        </button>
      </form>
    </div>
  )
}
