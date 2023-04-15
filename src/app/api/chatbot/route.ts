import { Configuration, OpenAIApi } from 'openai'
import { NextResponse } from 'next/server'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function GET(request: Request) {
  return NextResponse.json('Hello from CodeX!')
}

export async function POST(request: Request) {
  const { prompt } = await request.json()
  console.log('prompt', prompt)

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })

    return NextResponse.json({ bot: response.data.choices[0].text })
  } catch (error) {
    console.error(error)
    NextResponse.json({ message: 'Internal Server Error' })
  }
}
