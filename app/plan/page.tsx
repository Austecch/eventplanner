"use client"

import { useEffect, useMemo, useState } from 'react'

type EventItem = {
  id: number
  type: string
  title: string
  date: string
  budget: number
  description: string
  guests: number
}

const STORAGE_KEY = 'eventora_events'

export default function PlanEvent() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [form, setForm] = useState({
    type: 'Wedding',
    title: '',
    date: '',
    budget: 0,
    description: '',
    guests: 0,
  })

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events')
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  }, [events])

  const summary = useMemo(() => {
    const total = events.reduce((sum, event) => sum + event.budget, 0)
    return { total, count: events.length }
  }, [events])

  const handleChange = (key: string, value: string | number) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.date || form.budget <= 0) return

    const payload = {
      type: form.type,
      title: form.title,
      date: form.date,
      budget: form.budget,
      description: form.description,
      guests: form.guests,
    }

    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) return

    const created = await res.json()
    setEvents(prev => [created, ...prev])
    setForm({ type: 'Wedding', title: '', date: '', budget: 0, description: '', guests: 0 })
  }

  const removeEvent = async (id: number) => {
    const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' })
    if (res.ok) setEvents(prev => prev.filter(event => event.id !== id))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Plan Your Event</h1>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">New Event</h2>
            <form className="space-y-4" onSubmit={handleAddEvent}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Type</label>
                <select value={form.type} onChange={e => handleChange('type', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Corporate</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input value={form.title} onChange={e => handleChange('title', e.target.value)} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Elegant Gala" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input value={form.date} onChange={e => handleChange('date', e.target.value)} type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guests</label>
                  <input value={form.guests} onChange={e => handleChange('guests', Number(e.target.value))} type="number" min={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
                <input value={form.budget} onChange={e => handleChange('budget', Number(e.target.value))} type="number" min={0} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea value={form.description} onChange={e => handleChange('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-24" placeholder="Add event notes" />
              </div>

              <button type="submit" className="btn-primary w-full">Create Event</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
            <p className="text-gray-700">Events: <strong>{summary.count}</strong></p>
            <p className="text-gray-700">Total Budget: <strong>${summary.total.toLocaleString()}</strong></p>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">Focus on high-priority items and maintain 10% contingency.</p>
            </div>
          </div>
        </div>

        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Active Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-500">No events yet. Add one above to start planning.</p>
          ) : (
            <div className="space-y-4">
              {events.map(event => (
                <article key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.type} • {event.date} • {event.guests} guests</p>
                    </div>
                    <button onClick={() => removeEvent(event.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                  <p className="mt-2 text-gray-700">{event.description}</p>
                  <p className="mt-2 text-gray-800 font-semibold">Budget: ${event.budget.toLocaleString()}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}