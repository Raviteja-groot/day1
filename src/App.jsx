import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from "./components/login";
import SignUp from "./components/signup";
import api from "./utils/api";


const CATEGORIES = [
  { id: 'genz', label: 'Fashion GenZ' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'casuals', label: 'Casuals' },
  { id: 'footwear', label: 'Footwear' },
]

const PRICE_FILTERS = [
  { id: 'all', label: 'Any price' },
  { id: 'under1000', label: 'Under ₹1000' },
  
  { id: '1000to2000', label: '₹1000 to ₹2000' },
  { id: 'above2000', label: 'Above ₹2000' },
]

const TAG_FILTERS = ['NEW', 'FESTIVE', 'POPULAR']

const PRODUCTS = [
  // GenZ (8)
  {
    id: 1,
    name: 'Oversized Graphic Tee',
    price: '₹799',
    priceValue: 799,
    category: 'genz',
    tag: 'NEW',
    description: 'Soft cotton, bold print, perfect for street style.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Baggy Cargo Pants',
    price: '₹1,499',
    priceValue: 1499,
    category: 'genz',
    description: 'Utility pockets, relaxed fit, everyday comfort.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Neon Zip Hoodie',
    price: '₹1,899',
    priceValue: 1899,
    category: 'genz',
    tag: 'POPULAR',
    description: 'Bold neon accents with cropped, boxy fit.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Patchwork Denim Jacket',
    price: '₹2,499',
    priceValue: 2499,
    category: 'genz',
    description: 'Mixed washes and panels for a statement outer layer.',
    image: 'https://images.unsplash.com/photo-1544966503-7d5a5c5f3c7d?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Checkered Skater Skirt',
    price: '₹1,299',
    priceValue: 1299,
    category: 'genz',
    description: 'High-waist skirt with soft pleats and contrast checks.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Layered Chain Set',
    price: '₹599',
    priceValue: 599,
    category: 'genz',
    description: 'Stacked metallic chains to finish every outfit.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Crop Top & Shrug Combo',
    price: '₹1,099',
    priceValue: 1099,
    category: 'genz',
    description: 'Ribbed crop top with sheer shrug overlay.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Street Graphic Joggers',
    price: '₹1,599',
    priceValue: 1599,
    category: 'genz',
    description: 'Tapered joggers with graffiti-style side print.',
    image: 'https://images.unsplash.com/photo-1506629905951-4e4c1e6d83c6?w=400&h=400&fit=crop',
  },
  // Traditional (8)
  {
    id: 9,
    name: 'Embroidered Kurta Set',
    price: '₹2,199',
    priceValue: 2199,
    category: 'traditional',
    tag: 'FESTIVE',
    description: 'Rich fabric with subtle thread work for occasions.',
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop',
  },
  {
    id: 10,
    name: 'Silk Saree',
    price: '₹3,999',
    priceValue: 3999,
    category: 'traditional',
    description: 'Classic drape in soft silk with contrast border.',
    image: 'https://images.unsplash.com/photo-1565250051182-6e8d30a41be1?w=400&h=400&fit=crop',
  },
  {
    id: 11,
    name: 'Banarasi Dupatta',
    price: '₹1,499',
    priceValue: 1499,
    category: 'traditional',
    description: 'Gold zari motifs on a rich, woven base.',
    image: 'https://images.unsplash.com/photo-1611025818240-765c9babc7d5?w=400&h=400&fit=crop',
  },
  {
    id: 12,
    name: 'Printed Anarkali Gown',
    price: '₹2,799',
    priceValue: 2799,
    category: 'traditional',
    description: 'Floor length flare with all-over floral print.',
    image: 'https://images.unsplash.com/photo-1594633314842-7a28b6cbb4b8?w=400&h=400&fit=crop',
  },
  {
    id: 13,
    name: 'Cotton Straight Kurta',
    price: '₹899',
    priceValue: 899,
    category: 'traditional',
    description: 'Everyday kurta with minimal embroidery at yoke.',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
  },
  {
    id: 14,
    name: 'Ethnic Palazzos',
    price: '₹1,099',
    priceValue: 1099,
    category: 'traditional',
    description: 'Wide-leg palazzos with block print detailing.',
    image: 'https://images.unsplash.com/photo-1602810319097-1b3c11b5dd04?w=400&h=400&fit=crop',
  },
  {
    id: 15,
    name: 'Festive Lehenga Skirt',
    price: '₹3,499',
    priceValue: 3499,
    category: 'traditional',
    tag: 'FESTIVE',
    description: 'Sequin work on a flowing lehenga base.',
    image: 'https://images.unsplash.com/photo-1602810319428-7262e86c45aa?w=400&h=400&fit=crop',
  },
  {
    id: 16,
    name: 'Classic Nehru Jacket',
    price: '₹2,299',
    priceValue: 2299,
    category: 'traditional',
    description: 'Structured sleeveless jacket to layer on kurtas.',
    image: 'https://images.unsplash.com/photo-1602810318692-019b8c759258?w=400&h=400&fit=crop',
  },
  // Casuals (8)
  {
    id: 17,
    name: 'Everyday Denim Jeans',
    price: '₹1,299',
    priceValue: 1299,
    category: 'casuals',
    description: 'Mid-rise, straight fit, goes with everything.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
  },
  {
    id: 18,
    name: 'Relaxed Fit Hoodie',
    price: '₹1,199',
    priceValue: 1199,
    category: 'casuals',
    tag: 'POPULAR',
    description: 'Cozy fleece for daily wear.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
  },
  {
    id: 19,
    name: 'Basic Crew Neck Tee',
    price: '₹499',
    priceValue: 499,
    category: 'casuals',
    description: 'Soft touch cotton tee for daily layering.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: 20,
    name: 'Chino Shorts',
    price: '₹999',
    priceValue: 999,
    category: 'casuals',
    description: 'Above-knee shorts with stretch for movement.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
  },
  {
    id: 21,
    name: 'Striped Polo T-Shirt',
    price: '₹1,099',
    priceValue: 1099,
    category: 'casuals',
    description: 'Weekend-ready polo with contrast collar.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
  },
  {
    id: 22,
    name: 'Lightweight Windcheater',
    price: '₹1,899',
    priceValue: 1899,
    category: 'casuals',
    description: 'Packable jacket for breezy evenings.',
    image: 'https://images.unsplash.com/photo-1544966503-7d5a5c5f3c7d?w=400&h=400&fit=crop',
  },
  {
    id: 23,
    name: 'Everyday Joggers',
    price: '₹1,199',
    priceValue: 1199,
    category: 'casuals',
    description: 'Tapered joggers with elasticated waist.',
    image: 'https://images.unsplash.com/photo-1506629905951-4e4c1e6d83c6?w=400&h=400&fit=crop',
  },
  {
    id: 24,
    name: 'Relaxed Linen Shirt',
    price: '₹1,599',
    priceValue: 1599,
    category: 'casuals',
    description: 'Breathable linen blend with laid-back fit.',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop',
  },
  // Footwear (8)
  {
    id: 25,
    name: 'Chunky Sneakers',
    price: '₹2,499',
    priceValue: 2499,
    category: 'footwear',
    description: 'Cushioned sole, bold design, all-day comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  },
  {
    id: 26,
    name: 'Classic Loafers',
    price: '₹1,799',
    priceValue: 1799,
    category: 'footwear',
    description: 'Clean silhouette for work and evenings.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
  },
  {
    id: 27,
    name: 'Everyday Flip Flops',
    price: '₹399',
    priceValue: 399,
    category: 'footwear',
    description: 'Soft, cushioned base for daily wear.',
    image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400&h=400&fit=crop',
  },
  {
    id: 28,
    name: 'Slip-On Canvas Shoes',
    price: '₹999',
    priceValue: 999,
    category: 'footwear',
    description: 'Easy slip-on style with contrast side elastic.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop',
  },
  {
    id: 29,
    name: 'Block Heel Sandals',
    price: '₹1,699',
    priceValue: 1699,
    category: 'footwear',
    description: 'Stable block heel with ankle strap support.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
  },
  {
    id: 30,
    name: 'Training Running Shoes',
    price: '₹2,999',
    priceValue: 2999,
    category: 'footwear',
    description: 'Engineered mesh upper with responsive cushioning.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  },
  {
    id: 31,
    name: 'Ethnic Mojaris',
    price: '₹1,299',
    priceValue: 1299,
    category: 'footwear',
    description: 'Traditional slip-on with embroidered upper.',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop',
  },
  {
    id: 32,
    name: 'High-Top Sneakers',
    price: '₹2,199',
    priceValue: 2199,
    category: 'footwear',
    description: 'Ankle-high sneakers with padded collar.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
  },
]

function App() {

  const [currentView, setCurrentView] = useState('landing') // 'landing' | 'login' | 'signup' | 'home'
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('genz')
  const [activeView, setActiveView] = useState('store') // 'store' | 'wishlist' | 'bag' | 'checkout'
  const [priceFilter, setPriceFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all') // 'all' or one of TAG_FILTERS
  const [wishlist, setWishlist] = useState([])
  const [bag, setBag] = useState([]) // Array of { productId, quantity }
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [selectedUpiApp, setSelectedUpiApp] = useState(null)

  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }

    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };


  const isInWishlist = (productId) => wishlist.includes(productId)

  const addToBag = async (productId) => {
    if (!isLoggedIn) {
      alert("Please login first");
      return;
    }
    
    setBag((prevBag) => {
      const existingItem = prevBag.find((item) => item.productId === productId)
      if (existingItem) {
        return prevBag.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prevBag, { productId, quantity: 1 }]
    })
  }

  const removeFromBag = (productId) => {
    setBag((prevBag) => prevBag.filter((item) => item.productId !== productId))
  }

  const updateBagQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromBag(productId)
      return
    }
    setBag((prevBag) =>
      prevBag.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const getBagItemQuantity = (productId) => {
    const item = bag.find((item) => item.productId === productId)
    return item ? item.quantity : 0
  }

  const bagProducts = PRODUCTS.filter((p) =>
    bag.some((item) => item.productId === p.id),
  ).map((product) => ({
    ...product,
    quantity: bag.find((item) => item.productId === product.id)?.quantity || 1,
  }))

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'raviteja') {
      setAppliedCoupon({ code: 'raviteja', discount: 250 })
    } else {
      setAppliedCoupon(null)
    }
  }

  const calculateBilling = () => {
    const subtotal = bagProducts.reduce(
      (sum, item) => sum + item.priceValue * item.quantity,
      0,
    )
    const gst = subtotal * 0.18 // 18% GST
    const deliveryCharge = subtotal > 1000 ? 0 : 50 // Free delivery above ₹1000
    const discount = appliedCoupon?.discount || 0
    const total = subtotal + gst + deliveryCharge - discount

    return {
      subtotal,
      gst,
      deliveryCharge,
      discount,
      total,
    }
  }

  const billing = calculateBilling()

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showWelcome])

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Validate token by making a test API call
      api('/api/protected')
        .then(() => {
          setIsLoggedIn(true)
          setCurrentView('home')
        })
        .catch(() => {
          // Token is invalid, remove it
          localStorage.removeItem('token')
          setCurrentView('landing')
        })
    } else {
      setCurrentView('landing')
    }
    setIsLoading(false)
  }, [])

  

  const handleSignUpSuccess = (userData, token) => {
    if (token) {
      localStorage.setItem('token', token)
    }
    if (userData) {
      setUser(userData)
    }
    setIsLoggedIn(true)
    setCurrentView('home')
    setShowWelcome(true)
  }

  // Show landing page
  if (currentView === 'landing') {
    return (
      <div className="app-shell">
        <Landing
          onLoginClick={() => setCurrentView('login')}
          onSignUpClick={() => setCurrentView('signup')}
        />
      </div>
    )
  }

function handleLoginSuccess(userData, token) {
  if (token) {
    localStorage.setItem('token', token);
  }
  setUser(userData);          // save user
  setIsLoggedIn(true);        // set logged in state
  setCurrentView('home');     // go to home page
}

function handleLogout() {
  localStorage.removeItem("token");
  setUser(null);
  setIsLoggedIn(false);
  setWishlist([]);
  setBag([]);
  setCurrentView("landing");
}


  // Show login page
  if (currentView === 'login') {
    return (
      <div className="app-shell">
        <Login
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setCurrentView('landing')}
        />
      </div>
    )
  }

  // Show signup page
  if (currentView === 'signup') {
    return (
      <div className="app-shell">
        <SignUp
          onSignUpSuccess={handleSignUpSuccess}
          onBack={() => setCurrentView('landing')}
        />
      </div>
    )
  }

  // Show home page (store)
  if (currentView === 'home') {

  const filterByPrice = (product) => {
    const price = product.priceValue
    if (priceFilter === 'under1000') return price < 1000
    if (priceFilter === '1000to2000') return price >= 1000 && price <= 2000
    if (priceFilter === 'above2000') return price > 2000
    return true
  }

  const filterByTag = (product) => {
    if (tagFilter === 'all') return true
    return product.tag === tagFilter
  }

  const visibleProducts = PRODUCTS.filter(
    (product) =>
      product.category === selectedCategory &&
      filterByPrice(product) &&
      filterByTag(product),
  )

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id))

  const currentCategory = CATEGORIES.find(
    (cat) => cat.id === selectedCategory,
  )

  return (
  <div className="app-shell">
    <Header onLogout={handleLogout} />


      <main className="store-main">
        <section className="store-hero">
          <div className="store-hero-text">
            <h1>Discover your style</h1>
            <p>
              Choose your vibe first – we'll show you curated looks just like
              Ajio: GenZ fits, timeless tradition, easy casuals, and must-have
              footwear.
            </p>
          </div>
          <div className="store-hero-pill">
            <span>Step 1</span> Pick your style section
          </div>
        </section>

        <section className="view-toggle">
          <button
            className={`view-chip ${
              activeView === 'store' ? 'active' : ''
            }`}
            onClick={() => setActiveView('store')}
          >
            Browse store
          </button>
          <button
            className={`view-chip ${
              activeView === 'wishlist' ? 'active' : ''
            }`}
            onClick={() => setActiveView('wishlist')}
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            className={`view-chip ${
              activeView === 'bag' ? 'active' : ''
            }`}
            onClick={() => setActiveView('bag')}
          >
            Bag ({bag.length})
          </button>
        </section>

        {activeView === 'store' && (
          <>
            <section className="category-strip">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={`category-chip ${
                    selectedCategory === category.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </section>

            <section className="products-section">
              <header className="products-header">
                <div>
                  <h2>{currentCategory?.label}</h2>
                  <p>
                    Handpicked pieces for this mood. Use filters on the left to
                    narrow by price and tags.
                  </p>
                </div>
              </header>

              <div className="store-layout">
                <aside className="filters-panel">
                  <div className="filter-group">
                    <h3>Price</h3>
                    <div className="filter-options">
                      {PRICE_FILTERS.map((item) => (
                        <button
                          key={item.id}
                          className={`filter-chip ${
                            priceFilter === item.id ? 'active' : ''
                          }`}
                          onClick={() => setPriceFilter(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <h3>Tag</h3>
                    <div className="filter-options">
                      <button
                        className={`filter-chip ${
                          tagFilter === 'all' ? 'active' : ''
                        }`}
                        onClick={() => setTagFilter('all')}
                      >
                        Any tag
                      </button>
                      {TAG_FILTERS.map((tag) => (
                        <button
                          key={tag}
                          className={`filter-chip ${
                            tagFilter === tag ? 'active' : ''
                          }`}
                          onClick={() => setTagFilter(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                <div className="products-grid">
                  {visibleProducts.length === 0 ? (
                    <p className="empty-state">
                      No products match these filters. Try changing the price or
                      tag.
                    </p>
                  ) : (
                    visibleProducts.map((product) => (
                      <article key={product.id} className="product-card">
                        <div className="product-image-container">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                          />
                        </div>
                        <div className="product-content">
                          <div className="product-title-row">
                            <h3>{product.name}</h3>
                            <div className="product-title-badges">
                              {product.tag && (
                                <span className="product-tag">
                                  {product.tag}
                                </span>
                              )}
                              <button
                                type="button"
                                className={`wishlist-toggle ${
                                  isInWishlist(product.id) ? 'active' : ''
                                }`}
                                onClick={() => toggleWishlist(product.id)}
                                aria-label="Toggle wishlist"
                              >
                                ♥
                              </button>
                            </div>
                          </div>
                          <p className="product-description">
                            {product.description}
                          </p>
                          <div className="product-footer-row">
                            <span className="product-price">
                              {product.price}
                            </span>
                            <button 
                              className="product-cta"
                              onClick={() => addToBag(product.id)}
                            >
                              Add to Bag
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === 'wishlist' && (
          <section className="products-section wishlist-section">
            <header className="products-header">
              <div>
                <h2>Your wishlist</h2>
                <p>
                  {wishlistProducts.length === 0
                    ? 'You have not added anything yet. Go to Browse store and tap the heart to save items.'
                    : 'All the looks you loved. You can remove items or switch back to the store to keep exploring.'}
                </p>
              </div>
            </header>

            {wishlistProducts.length === 0 ? (
              <div className="empty-wishlist">
                <p>Wishlist is empty.</p>
                <button
                  className="product-cta"
                  onClick={() => setActiveView('store')}
                >
                  Browse store
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {wishlistProducts.map((product) => (
                  <article key={product.id} className="product-card">
                    <div className="product-image-container">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="product-content">
                      <div className="product-title-row">
                        <h3>{product.name}</h3>
                        <div className="product-title-badges">
                          {product.tag && (
                            <span className="product-tag">{product.tag}</span>
                          )}
                          <button
                            type="button"
                            className="wishlist-toggle active"
                            onClick={() => toggleWishlist(product.id)}
                            aria-label="Remove from wishlist"
                          >
                            ♥
                          </button>
                        </div>
                      </div>
                      <p className="product-description">
                        {product.description}
                      </p>
                      <div className="product-footer-row">
                        <span className="product-price">
                          {product.price}
                        </span>
                        <button 
                          className="product-cta"
                          onClick={() => addToBag(product.id)}
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeView === 'bag' && (
          <section className="products-section bag-section">
            <header className="products-header">
              <div>
                <h2>Your Bag</h2>
                <p>
                  {bagProducts.length === 0
                    ? 'Your bag is empty. Start shopping to add items!'
                    : `You have ${bag.reduce((sum, item) => sum + item.quantity, 0)} item(s) in your bag.`}
                </p>
              </div>
            </header>

            {bagProducts.length === 0 ? (
              <div className="empty-wishlist">
                <p>Your bag is empty.</p>
                <button
                  className="product-cta"
                  onClick={() => setActiveView('store')}
                >
                  Browse store
                </button>
              </div>
            ) : (
              <div className="bag-layout">
                <div className="bag-items">
                  {bagProducts.map((product) => (
                    <article key={product.id} className="bag-item-card">
                      <div className="bag-item-image">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="product-image"
                          loading="lazy"
                        />
                      </div>
                      <div className="bag-item-details">
                        <h3>{product.name}</h3>
                        <p className="product-description">{product.description}</p>
                        <div className="bag-item-price">₹{product.priceValue.toLocaleString()}</div>
                        <div className="bag-item-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateBagQuantity(product.id, product.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="quantity-display">{product.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateBagQuantity(product.id, product.quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromBag(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="bag-item-total">
                          Total: ₹{(product.priceValue * product.quantity).toLocaleString()}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <aside className="bag-summary">
                  <div className="summary-card">
                    <h3>Order Summary</h3>
                    
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>₹{billing.subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span>GST (18%)</span>
                      <span>₹{billing.gst.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-row">
                      <span>Delivery Charges</span>
                      <span>
                        {billing.deliveryCharge === 0 ? (
                          <span className="free-delivery">FREE</span>
                        ) : (
                          `₹${billing.deliveryCharge}`
                        )}
                      </span>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="summary-row discount-row">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span className="discount-amount">-₹{appliedCoupon.discount}</span>
                      </div>
                    )}
                    
                    <div className="coupon-section">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="coupon-input"
                      />
                      <button
                        className="coupon-btn"
                        onClick={applyCoupon}
                      >
                        Apply
                      </button>
                    </div>
                    
                    {appliedCoupon && (
                      <div className="coupon-success">
                        Coupon "{appliedCoupon.code}" applied! Save ₹{appliedCoupon.discount}
                      </div>
                    )}
                    
                    <div className="summary-divider"></div>
                    
                    <div className="summary-row total-row">
                      <span>Total</span>
                      <span>₹{billing.total.toLocaleString()}</span>
                    </div>
                    
                    <button
                      className="checkout-btn"
                      onClick={() => {
                        setActiveView('checkout')
                        setSelectedPaymentMethod(null)
                        setSelectedUpiApp(null)
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </aside>
              </div>
            )}
          </section>
        )}

        {activeView === 'checkout' && (
          <section className="products-section checkout-section">
            <header className="products-header">
              <div>
                <h2>Payment</h2>
                <p>
                  Choose how you want to pay for your order from Suchi Fashion
                  House.
                </p>
              </div>
              <button
                className="product-cta"
                onClick={() => setActiveView('bag')}
              >
                Back to Bag
              </button>
            </header>

            <div className="checkout-layout">
              <div className="checkout-methods">
                <h3>Select payment method</h3>
                <div className="payment-options">
                  <button
                    className={`payment-chip ${
                      selectedPaymentMethod === 'credit' ? 'active' : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod('credit')}
                  >
                    Pay by Credit Card
                  </button>
                  <button
                    className={`payment-chip ${
                      selectedPaymentMethod === 'debit' ? 'active' : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod('debit')}
                  >
                    Pay by Debit Card
                  </button>
                  <button
                    className={`payment-chip ${
                      selectedPaymentMethod === 'upi' ? 'active' : ''
                    }`}
                    onClick={() => setSelectedPaymentMethod('upi')}
                  >
                    Pay by UPI
                  </button>
                </div>

                {selectedPaymentMethod === 'upi' && (
                  <div className="upi-section">
                    <h4>Choose UPI app</h4>
                    <div className="upi-options">
                      {['phonepe', 'paytm', 'gpay', 'bhim'].map((app) => (
                        <button
                          key={app}
                          className={`upi-chip ${
                            selectedUpiApp === app ? 'active' : ''
                          }`}
                          onClick={() => setSelectedUpiApp(app)}
                        >
                          {app === 'phonepe' && 'PhonePe'}
                          {app === 'paytm' && 'Paytm'}
                          {app === 'gpay' && 'GPay'}
                          {app === 'bhim' && 'BHIM'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPaymentMethod && (
                  <button className="checkout-btn confirm-btn">
                    Confirm &amp; Pay
                  </button>
                )}
              </div>

              <aside className="bag-summary">
                <div className="summary-card">
                  <h3>Order Summary</h3>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{billing.subtotal.toLocaleString()}</span>
                  </div>

                  <div className="summary-row">
                    <span>GST (18%)</span>
                    <span>₹{billing.gst.toFixed(2)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Delivery Charges</span>
                    <span>
                      {billing.deliveryCharge === 0 ? (
                        <span className="free-delivery">FREE</span>
                      ) : (
                        `₹${billing.deliveryCharge}`
                      )}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="summary-row discount-row">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="discount-amount">
                        -₹{appliedCoupon.discount}
                      </span>
                    </div>
                  )}

                  <div className="summary-divider"></div>

                  <div className="summary-row total-row">
                    <span>Total</span>
                    <span>₹{billing.total.toLocaleString()}</span>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>

      {bag.length > 0 && activeView !== 'bag' && activeView !== 'checkout' && (
        <div className="go-to-bag-floating">
          <button
            className="go-to-bag-btn"
            onClick={() => setActiveView('bag')}
          >
            Go to Bag ({bag.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      )}

      {showWelcome && (
        <div className="welcome-toast">
          welcome to suchi fashion store
        </div>
      )}

      <Footer />
    </div>
  )
  }

  return null
}

export default App