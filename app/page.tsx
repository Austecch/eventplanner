export default function Home() {
  return (
    <main className="min-h-screen gradient-bg">
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center animate-fade-in">
            <h1 className="hero-text animate-float">
              Plan Your Perfect
              <br />
              <span className="text-gradient">Event</span>
            </h1>
            <p className="hero-subtitle">
              The all-in-one platform for event planning, vendor booking, and gifting.
              Create unforgettable moments with AI-powered assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/plan" className="btn-primary">Start Planning</a>
              <a href="/vendors" className="btn-secondary">Explore Vendors</a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose Eventora?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">End-to-End Planning</h3>
                <p className="text-gray-600">From concept to execution, manage every aspect of your event with our comprehensive planning tools.</p>
              </div>

              <div className="feature-card animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Vendor Marketplace</h3>
                <p className="text-gray-600">Connect with verified vendors, compare prices, and book services with confidence.</p>
              </div>

              <div className="feature-card animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">AI-Powered Insights</h3>
                <p className="text-gray-600">Get smart recommendations, budget optimization, and automated planning assistance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white bg-opacity-10 backdrop-blur-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Magic?</h2>
            <p className="text-xl text-purple-100 mb-8">Join thousands of event planners who trust Eventora for their special occasions.</p>
            <a href="/plan" className="btn-primary">Get Started Today</a>
          </div>
        </section>
      </div>
    </main>
  )
}