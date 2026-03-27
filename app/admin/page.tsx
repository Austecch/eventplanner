"use client"

import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [users, setUsers] = useState(128)
  const [vendors, setVendors] = useState(14)
  const [orders, setOrders] = useState(29)

  useEffect(() => {
    // simulate live admin dashboard updates
    const timer = setInterval(() => {
      setUsers(prev => prev + Math.floor(Math.random() * 2))
      setVendors(prev => prev + Math.floor(Math.random() * 1))
      setOrders(prev => prev + Math.floor(Math.random() * 3))
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold">Users</h2>
            <p className="text-3xl mt-2 font-bold">{users}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold">Vendors</h2>
            <p className="text-3xl mt-2 font-bold">{vendors}</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold">Orders</h2>
            <p className="text-3xl mt-2 font-bold">{orders}</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
          <p className="text-gray-600">In a full backend build, actions here include vendor approvals, sales reports, commission settings, and content promotions.</p>
        </div>
      </div>
    </main>
  )
}
