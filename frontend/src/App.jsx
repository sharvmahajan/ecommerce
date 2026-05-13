import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function App() {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart([...cart, product])
    alert(`${product.name} added to cart!`)
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <Router>
      <nav className="navbar">
        <Link to="/"><h1>AntiGravity Store</h1></Link>
        <div>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} clearCart={clearCart} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
