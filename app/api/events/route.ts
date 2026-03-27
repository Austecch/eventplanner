import { NextResponse } from 'next/server'
import { events } from '../../../lib/mockData'

export async function GET() {
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.title || !body.date || !body.budget) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  const event = {
    id: Date.now(),
    type: body.type ?? 'Other',
    title: body.title,
    date: body.date,
    budget: Number(body.budget),
    description: body.description ?? '',
    guests: Number(body.guests) || 0,
  }

  events.unshift(event)
  return NextResponse.json(event)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))

  if (!id) return new NextResponse(JSON.stringify({ error: 'Missing id' }), { status: 400 })

  const idx = events.findIndex((e) => e.id === id)
  if (idx === -1) return new NextResponse(JSON.stringify({ error: 'Not found' }), { status: 404 })

  events.splice(idx, 1)
  return NextResponse.json({ success: true })
}
