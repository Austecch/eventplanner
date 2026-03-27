"use client"

import { useEffect, useMemo, useState } from 'react'

export default function Dashboard() {
  const [events, setEvents] = useState<any[]>([])
  const [bookings, setBookings] = useState<number[]>([])
  const [cart, setCart] = useState<any[]>([])
  const [rentals, setRentals] = useState<any[]>([])
  const [adminStats, setAdminStats] = useState({ users: 0, vendors: 0, orders: 0, revenue: 0 })

  useEffect(() => {
    const fetchData = async () => {
      const [eventsRes, vendorsRes, productsRes, rentalsRes, adminRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/vendors'),
        fetch('/api/products'),
        fetch('/api/rentals'),
        fetch('/api/admin'),
      ])

      if (eventsRes.ok) setEvents(await eventsRes.json())
      if (vendorsRes.ok) setBookings((await vendorsRes.json()).map((_: any, i: number) => i))
      if (productsRes.ok) setCart(await productsRes.json())
      if (rentalsRes.ok) setRentals(await rentalsRes.json())
      if (adminRes.ok) setAdminStats(await adminRes.json())
    }

    fetchData()
  }, [])

  const revenue = useMemo(() => {
    const vendorRevenue = bookings.length * 100
    const cartRevenue = cart.reduce((sum, item: any) => {
      const prices = {1:49.99,2:19.99,3:39.99,4:59.99}
      return sum + ((prices[item.productId]||0)*item.quantity)
    },0)
    const rentalRevenue = rentals.reduce((sum, item: any) => sum + (item.totalPrice || 0),0)
    return vendorRevenue + cartRevenue + rentalRevenue
  }, [bookings, cart, rentals])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Active Events</p>
            <p className="text-3xl font-bold">{events.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Vendor Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Cart Orders</p>
            <p className="text-3xl font-bold">{cart.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Rental Bookings</p>
            <p className="text-3xl font-bold">{rentals.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Insights</h2>
            <p className="text-gray-700">Monthly revenue estimate: <strong>${revenue.toFixed(2)}</strong></p>
            <p className="text-gray-500 mt-2">(Simulated with static unit prices for MVP)</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li><a href="/plan" className="text-blue-600">Add Event</a></li>
              <li><a href="/vendors" className="text-blue-600">Book Vendor</a></li>
              <li><a href="/gifts" className="text-blue-600">Review Gifting Cart</a></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}