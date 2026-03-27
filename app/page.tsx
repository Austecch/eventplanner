export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Event with Eventora
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The all-in-one platform for event planning, vendor booking, and gifting
          </p>
          <a href="/plan" className="btn-primary text-lg px-8 py-3">
            Start Planning
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Event Planning</h3>
            <p className="text-gray-600">Create and manage events with our intuitive planning tools</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Vendor Marketplace</h3>
            <p className="text-gray-600">Find and book the best vendors for your event</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Gifting Store</h3>
            <p className="text-gray-600">Shop for perfect gifts and event essentials</p>
          </div>
        </div>
      </div>
    </main>
  )
}