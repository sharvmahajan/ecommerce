import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`)
      .then(res => {
        setProduct(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <h2>Loading...</h2>
  if (!product) return <h2>Product not found!</h2>

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductDetail
