import './index.css'

const Header = props => {
  const {items} = props
  return (
    <div className="header-container">
      <h1 className="header-heading">UNI Resto Cafe</h1>
      <div className="header-inner-container">
        <p className="order-text">My orders</p>
        <p className="cart-length">{items.length}</p>
      </div>
    </div>
  )
}

export default Header
