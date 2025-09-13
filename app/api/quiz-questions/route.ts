import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type QuizQuestion = {
  question: string
  options: string[]
  answer: number
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  explanation?: string
}

export async function GET(req: NextRequest) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 501 })
  }

  const { searchParams } = new URL(req.url)
  const count = parseInt(searchParams.get('count') || '5')
  const category = searchParams.get('category') || 'mixed'
  const difficulty = searchParams.get('difficulty') || 'mixed'

  // Add randomization to ensure different questions each time
  const timestamp = Date.now()
  const randomSeed = Math.random().toString(36).substring(2, 15)
  const sessionId = `${timestamp}-${randomSeed}`

  // Add random topic emphasis for more variety
  const topics = [
    'regional variations and styles',
    'historical origins and evolution',
    'symbolic meanings and spirituality',
    'materials, tools, and techniques',
    'festival associations and rituals',
    'cultural significance and traditions',
    'modern adaptations and contemporary uses',
    'learning methods and artistic development',
    'environmental and ecological aspects',
    'famous artists and regional masters'
  ]
  const randomTopic = topics[Math.floor(Math.random() * topics.length)]

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })

    const prompt = `You are an expert on South Indian Kolam traditions and culture. Generate ${count} UNIQUE multiple-choice questions about Kolam art, culture, and traditions.

SESSION ID: ${sessionId}
TIMESTAMP: ${timestamp}
RANDOM FOCUS: ${randomTopic}

IMPORTANT: Generate COMPLETELY DIFFERENT questions than any previous requests. Focus on variety and ensure no question repeats common themes unless specifically asked.

Requirements:
- Each question must have exactly 4 options (A, B, C, D)
- Only one correct answer per question
- Questions should be educational and accurate
- Include questions about history, symbolism, regional variations, materials, festivals, and techniques
- Vary the difficulty levels (easy, medium, hard)
- Categorize each question appropriately
- Make questions unique and diverse - avoid repeating similar concepts

${category !== 'mixed' ? `Focus on the category: ${category}` : `Mix different categories with emphasis on: ${randomTopic}`}
${difficulty !== 'mixed' ? `Focus on ${difficulty} difficulty level` : 'Mix difficulty levels: easy (basic facts), medium (deeper understanding), hard (specific details)'}

Return ONLY a valid JSON array of objects with this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0,
    "category": "Regional/Symbolism/Festivals/Materials/History/Technique/Cultural Significance/Modern Applications",
    "difficulty": "easy/medium/hard",
    "explanation": "Brief explanation of why this is the correct answer"
  }
]

CRITICAL INSTRUCTIONS FOR VARIETY:
- Generate questions that explore different aspects of Kolam culture
- Include specific examples, names, and details that vary each time
- Avoid generic questions - be specific and detailed
- Mix up the order and focus of questions
- Ensure each question covers a different sub-topic within the broader category
- Use different question structures (What, How, Why, When, Where, Which)
- Include both traditional and contemporary aspects

Examples of diverse topics to cover:
• Specific regional styles (Tamil Nadu, Karnataka, Andhra Pradesh, Kerala)
• Historical origins and evolution
• Symbolic meanings and spiritual significance
• Materials and tools used
• Festival associations and rituals
• Famous Kolam artists or styles
• Modern adaptations and contemporary uses
• Cultural preservation efforts
• Learning methods and techniques
• Environmental and ecological aspects

Make each question unique and engaging!`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean the response to extract JSON
    let jsonText = text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\s*/, '').replace(/\s*```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\s*/, '').replace(/\s*```$/, '')
    }

    const questions: QuizQuestion[] = JSON.parse(jsonText)

    // Validate the response format
    if (!Array.isArray(questions)) {
      throw new Error('Invalid response format: expected array')
    }

    // Validate each question
    const validatedQuestions = questions.map((q, index) => {
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.answer !== 'number') {
        throw new Error(`Invalid question format at index ${index}`)
      }
      return {
        ...q,
        answer: Math.max(0, Math.min(3, q.answer)) // Ensure answer is within bounds
      }
    })

    return NextResponse.json({
      success: true,
      questions: validatedQuestions,
      count: validatedQuestions.length,
      generated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating quiz questions:', error)
    return NextResponse.json({
      error: 'Failed to generate quiz questions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}