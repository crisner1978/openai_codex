/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { Message } from './App'

export default function ChatMessages({ messages }: { messages: Message[] }) {
  const [botMessage, setBotMessage] = useState('')

  useEffect(() => {
    const chatContainer = document.getElementById('chat_container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    let interval: any
    if (messages.length) {
      if (messages[messages.length - 1].type === 'bot') {
        const text = messages[messages.length - 1].text

        let index = 0

        interval = setInterval(() => {
          if (index < text.length) {
            setBotMessage((prevMessage) => prevMessage + text.charAt(index))
            index++
          } else {
            clearInterval(interval)
          }
        }, 30)
      } else {
        setBotMessage('')
      }
    } else {
      setBotMessage('')
    }
    return () => clearInterval(interval)
  }, [messages])

  return (
    <div id='chat_container'>
      {messages.map((message, index) => (
        <div key={index} className={`wrapper ${message.type === 'bot' && 'ai'}`}>
          <div className='chat'>
            <div className='profile'>
              <img
                src={`${message.type === 'bot' ? './assets/user.svg' : './assets/user.svg'}`}
                alt={`${message.type === 'bot' ? 'bot' : 'user'}`}
              />
            </div>
            <div className='message' id={`${message.id}`}>
              {message.type === 'bot' && messages.length - 1 === index ? botMessage : message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
