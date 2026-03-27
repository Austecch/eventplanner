"use client"

import { useEffect, useMemo, useState } from 'react'

type RentalItem = {
  id: number
  name: string
  category: string
  pricePerDay: number
  stock: number
}

const RENTALS: RentalItem[] = [
  { id: 1, name: 'Chairs + Tables Set', category: 'Furniture', pricePerDay: 50, stock: 20 },
  { id: 2, name: 'Premium Sound System', category: 'Sound', pricePerDay: 150, stock: 5 },
  { id: 3, name: 'Event Lighting Kit', category: 'Lighting', pricePerDay: 90, stock: 8 },
]

const STORAGE_KEY = 'eventora_rentals'

export default function Rentals() {
  const [selected, setSelected] = useState<RentalItem | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookings, setBookings] = useState<any[]>([])
  const [rentalList, setRentalList] = useState<RentalItem[]>([])

  useEffect(() => {
    const fetchRentals = async () => {
      const res = await fetch('/api/rentals')
      if (res.ok) {
        setRentalList(await res.json())
      }
    }
    fetchRentals()

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setBookings(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  const duration = useMemo(() => {
    if (!startDate || !endDate) return 0
    const d1 = new Date(startDate)
    const d2 = new Date(endDate)
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }, [startDate, endDate])

  const totalPrice = selected ? selected.pricePerDay * duration : 0

  const rentNow = () => {
    if (!selected || duration <= 0) return
    setBookings(prev => [...prev, { item: selected.name, startDate, endDate, totalPrice }])
    setSelected(null)
    setStartDate('')
    setEndDate('')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Equipment Rentals</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rentalList.map(item => (
              <article key={item.id} className="bg-white p-5 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.category}</p>
                <p className="mt-2 font-semibold">${item.pricePerDay}/day</p>
                <p className="text-sm text-gray-500">{item.stock} units available</p>
                <button onClick={() => setSelected(item)} className={`btn-secondary mt-3 w-full ${item.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={item.stock === 0}>
                  {selected?.id === item.id ? 'Selected' : 'Select'}
                </button>
              </article>
            ))}
          </div>

          <aside className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold">Rental Booking</h2>
            <p className="mt-2 text-gray-700">Selected: {selected ? selected.name : 'None'}</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
              </div>
              <div>
                <label className="block text-sm text-gray-600">End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
              </div>
              <div>
                <p className="text-gray-700">Duration: {duration} day(s)</p>
                <p className="text-gray-700">Total: ${totalPrice.toFixed(2)}</p>
              </div>
              <button onClick={rentNow} className="btn-primary w-full" disabled={!selected || duration <= 0}>
                Confirm Booking
              </button>
            </div>
          </aside>
        </div>

        <section className="mt-8 bg-white p-5 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Upcoming Rentals</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No rentals booked yet.</p>
          ) : (
            <ul className="space-y-2">
              {bookings.map((b, i) => (
                <li key={i} className="border border-gray-200 rounded-lg p-3">
                  <p className="font-semibold">{b.item}</p>
                  <p className="text-sm text-gray-500">{b.startDate} to {b.endDate} | ${b.totalPrice.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}