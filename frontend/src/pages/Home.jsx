import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/products`)
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <h2>Loading products...</h2>

  return (
    <div>
      <h2>Our Cosmic Collection</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <Link to={`/product/${product._id}`} className="btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
