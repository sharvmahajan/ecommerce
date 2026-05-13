import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Cart({ cart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return alert("Cart is empty!")

    axios.post(`${API_URL}/orders`, {
      items: cart,
      totalAmount: total
    })
    .then(res => {
      alert("Order placed successfully! Simulation complete.")
      clearCart()
    })
    .catch(err => {
      console.error(err)
      alert("Checkout failed!")
    })
  }

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ${total}</strong>
          </div>
          <button className="btn" style={{ width: '100%', marginTop: '2rem' }} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
