"use client"

import { useMemo, useState } from 'react'

type Theme = { name: string; details: string }

const THEMES: Theme[] = [
  { name: 'Modern Elegance', details: 'Muted palette, minimal decor, soft lighting.' },
  { name: 'Rustic Charm', details: 'Wooden elements, mason jars, warm lighting.' },
  { name: 'Tropical Fiesta', details: 'Vibrant colors, lush greenery, island style.' },
  { name: 'Corporate Luxe', details: 'Neutral tone, sharp lines, branded details.' },
]

export default function AIPage() {
  const [eventType, setEventType] = useState('Wedding')
  const [budget, setBudget] = useState(10000)

  const recommendations = useMemo(() => {
    const base = THEMES.filter(t => t.name.toLowerCase().includes(eventType.toLowerCase())).slice(0, 1)
    const fallback = THEMES.slice(0, 2)
    return base.length > 0 ? base : fallback
  }, [eventType])

  const predictedBudget = useMemo(() => {
    if (budget < 3000) return 'Economical package suggested'
    if (budget < 8000) return 'Balanced breakdown with key services'
    return 'Premium end-to-end plan with full concierge'
  }, [budget])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Smart Event Assistant</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Type</label>
              <select value={eventType} onChange={e => setEventType(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Wedding</option>
                <option>Birthday</option>
                <option>Corporate</option>
                <option>Anniversary</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
              <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">AI Recommendation</label>
              <p className="mt-2 p-3 bg-blue-50 text-blue-700 rounded">{predictedBudget}</p>
            </div>
          </div>
        </div>

        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Theme Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map(t => (
              <div key={t.name} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold">{t.name}</p>
                <p className="text-gray-600 text-sm mt-1">{t.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
