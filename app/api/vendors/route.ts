import { NextResponse } from 'next/server'
import { vendors } from '../../../lib/mockData'

export async function GET() {
  return NextResponse.json(vendors)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.name || !body.category) {
    return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }
  const vendor = {
    id: Date.now(),
    name: body.name,
    category: body.category,
    price: Number(body.price) || 0,
    rating: Number(body.rating) || 0,
    availability: body.availability || 'Open',
    description: body.description || '',
  }
  vendors.unshift(vendor)
  return NextResponse.json(vendor)
}
