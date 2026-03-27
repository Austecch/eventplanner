"use client"

import { useEffect, useState } from 'react'

type Vendor = {
  id: number
  name: string
  category: string
  price: number
  rating: number
  availability: string
  description: string
}

const STORAGE_KEY = 'eventora_bookings'

const VENDORS: Vendor[] = [
  { id: 1, name: 'Luxe Lens Studio', category: 'Photography', price: 1200, rating: 4.9, availability: 'Open', description: 'Professional wedding photography packages.' },
  { id: 2, name: 'Gastrono Magic', category: 'Catering', price: 30, rating: 4.7, availability: 'Limited', description: 'Global cuisine catering for 50+ guests.' },
  { id: 3, name: 'Bloom & Bliss', category: 'Decorations', price: 950, rating: 4.8, availability: 'Open', description: 'Full venue styling and floral design.' },
  { id: 4, name: 'DJ Vibe Crew', category: 'Entertainment', price: 500, rating: 4.6, availability: 'Open', description: 'Premium DJ and sound system package.' },
  { id: 5, name: 'Glam Squad', category: 'Makeup', price: 450, rating: 4.8, availability: 'Booked', description: 'Professional makeup artists and styling.' },
]

export default function Vendors() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [bookings, setBookings] = useState<number[]>([])
  const [vendorList, setVendorList] = useState<Vendor[]>([])

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch('/api/vendors')
      if (res.ok) {
        const data = await res.json()
        setVendorList(data)
      }
    }

    fetchVendors()
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setBookings(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  const filtered = selectedCategory === 'All'
    ? vendorList
    : vendorList.filter(v => v.category === selectedCategory)

  const bookVendor = (id: number) => {
    if (!bookings.includes(id)) setBookings(prev => [...prev, id])
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Vendor Marketplace</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          {['All', 'Photography', 'Catering', 'Decorations', 'Entertainment', 'Makeup'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(vendor => (
            <article key={vendor.id} className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
                <span className="text-sm px-2 py-1 rounded-full bg-green-100 text-green-700">{vendor.availability}</span>
              </div>
              <p className="text-gray-600 mt-2">{vendor.description}</p>
              <p className="mt-3 font-semibold">${vendor.price}{vendor.category === 'Catering' ? '/guest' : ''}</p>
              <p className="text-sm text-gray-500">Rating: {vendor.rating}</p>
              <button onClick={() => bookVendor(vendor.id)} className="btn-primary mt-4 w-full" disabled={bookings.includes(vendor.id) || vendor.availability === 'Booked'}>
                {bookings.includes(vendor.id) ? 'Added' : vendor.availability === 'Booked' ? 'Unavailable' : 'Book Vendor'}
              </button>
            </article>
          ))}
        </div>

        <section className="mt-8 bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Booked Vendors</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No vendor booked yet.</p>
          ) : (
            <ul className="space-y-2">
              {bookings.map(id => {
                const vendor = VENDORS.find(v => v.id === id)
                return vendor ? <li key={id} className="text-gray-700">{vendor.name} • {vendor.category} • ${vendor.price}</li> : null
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}