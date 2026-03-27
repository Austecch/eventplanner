import { NextResponse } from 'next/server'
import { products } from '../../../lib/mockData'

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name || !body.category || !body.price) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  const product = {
    id: Date.now(),
    name: body.name,
    category: body.category,
    price: Number(body.price),
    description: body.description || '',
  }
  products.unshift(product)
  return NextResponse.json(product)
}
