export type EventItem = {
  id: number
  type: string
  title: string
  date: string
  budget: number
  description: string
  guests: number
}

export type VendorItem = {
  id: number
  name: string
  category: string
  price: number
  rating: number
  availability: string
  description: string
}

export type ProductItem = {
  id: number
  name: string
  category: string
  price: number
  description: string
}

export type RentalItem = {
  id: number
  name: string
  category: string
  pricePerDay: number
  stock: number
}

export const events: EventItem[] = []

export const vendors: VendorItem[] = [
  { id: 1, name: 'Luxe Lens Studio', category: 'Photography', price: 1200, rating: 4.9, availability: 'Open', description: 'Professional wedding photography packages.' },
  { id: 2, name: 'Gastrono Magic', category: 'Catering', price: 30, rating: 4.7, availability: 'Limited', description: 'Global cuisine catering for 50+ guests.' },
  { id: 3, name: 'Bloom & Bliss', category: 'Decorations', price: 950, rating: 4.8, availability: 'Open', description: 'Full venue styling and floral design.' },
  { id: 4, name: 'DJ Vibe Crew', category: 'Entertainment', price: 500, rating: 4.6, availability: 'Open', description: 'Premium DJ and sound system package.' },
  { id: 5, name: 'Glam Squad', category: 'Makeup', price: 450, rating: 4.8, availability: 'Booked', description: 'Professional makeup artists and styling.' },
]

export const products: ProductItem[] = [
  { id: 1, name: 'Anniversary Gift Set', category: 'Anniversary', price: 49.99, description: 'Elegant gift set with wine and chocolates.' },
  { id: 2, name: 'Kids Surprise Package', category: 'Kids', price: 19.99, description: 'Toys and treats for children.' },
  { id: 3, name: 'Corporate Appreciation Box', category: 'Corporate', price: 39.99, description: 'Premium desk gift for teams.' },
  { id: 4, name: 'Romantic Couple Bundle', category: 'Spouse', price: 59.99, description: 'Luxury package for couples.' },
]

export const rentals: RentalItem[] = [
  { id: 1, name: 'Chairs + Tables Set', category: 'Furniture', pricePerDay: 50, stock: 20 },
  { id: 2, name: 'Premium Sound System', category: 'Sound', pricePerDay: 150, stock: 5 },
  { id: 3, name: 'Event Lighting Kit', category: 'Lighting', pricePerDay: 90, stock: 8 },
]
