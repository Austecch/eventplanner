import { NextResponse } from 'next/server'
import { rentals } from '../../../lib/mockData'

export async function GET() {
  return NextResponse.json(rentals)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name || !body.category || !body.pricePerDay || !body.stock) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  const rental = {
    id: Date.now(),
    name: body.name,
    category: body.category,
    pricePerDay: Number(body.pricePerDay),
    stock: Number(body.stock),
  }

  rentals.unshift(rental)
  return NextResponse.json(rental)
}
