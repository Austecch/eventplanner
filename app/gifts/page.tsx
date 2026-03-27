"use client"

import { useEffect, useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  description: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'Anniversary Gift Set', category: 'Anniversary', price: 49.99, description: 'Elegant gift set with wine and chocolates.' },
  { id: 2, name: 'Kids Surprise Package', category: 'Kids', price: 19.99, description: 'Toys and treats for children.' },
  { id: 3, name: 'Corporate Appreciation Box', category: 'Corporate', price: 39.99, description: 'Premium desk gift for teams.' },
  { id: 4, name: 'Romantic Couple Bundle', category: 'Spouse', price: 59.99, description: 'Luxury package for couples.' },
]

const STORAGE_KEY = 'eventora_cart'

export default function Gifts() {
  const [cart, setCart] = useState<{ productId: number; quantity: number }[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    }
    fetchProducts()

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id)
      if (existing) {
        return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { productId: product.id, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId))
  }

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId)
      return sum + ((product?.price || 0) * item.quantity)
    }, 0)
  }, [cart, products])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gift Store</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map(product => (
              <article key={product.id} className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="mt-2 text-gray-700">{product.description}</p>
                <p className="mt-4 font-bold">${product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)} className="btn-primary mt-4 w-full">Add to Cart</button>
              </article>
            ))}
          </div>

          <aside className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500 mt-3">Your cart is empty.</p>
            ) : (
              <ul className="space-y-2 mt-3">
                {cart.map(item => {
                  const product = PRODUCTS.find(p => p.id === item.productId)
                  if (!product) return null
                  return (
                    <li key={item.productId} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} x ${product.price.toFixed(2)}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.productId)} className="text-red-600">Remove</button>
                    </li>
                  )
                })}
              </ul>
            )}
            <div className="mt-4 border-t pt-4">
              <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
              <button className="btn-primary mt-3 w-full">Checkout (Stripe)</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}