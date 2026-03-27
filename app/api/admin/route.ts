import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    users: 128,
    vendors: 14,
    orders: 29,
    revenue: 9200,
  })
}
