import './index.css'

const DishItem = ({dish, items, addItem, removeItem}) => {
  const {
    dishId,
    dishCalories,
    dishDescription,
    dishCurrency,
    dishPrice,
    dishName,
    dishAvailability,
    dishImage,
    addonCat,
    dishType,
  } = dish

  const onIncrementQuantity = () => addItem(dish)
  const onDecrementQuantity = () => removeItem(dish)

  const getquantity = () => {
    const item = items.find(each => each.dishId === dishId)
    return item ? item.quantity : 0
  }

  const renderButtons = () => (
    <div className="button-container">
      <button type="button" className="button" onClick={onIncrementQuantity}>
        +
      </button>
      <p className="quantity">{getquantity()}</p>
      <button type="button" className="button" onClick={onDecrementQuantity}>
        -
      </button>
    </div>
  )

  return (
    <li className="dish-container">
      <div className={`veg ${dishType === 2 ? 'veg-border' : 'nonveg-border'}`}>
        <div className={`${dishType === 2 ? 'veg-class' : 'nonveg-class'}`} />
      </div>
      <div className="dish-inner-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-desc">{dishDescription}</p>
        {dishAvailability && renderButtons()}
        {!dishAvailability && (
          <p className="notavailable-class">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="custom-class">Customizations available</p>
        )}
      </div>
      <p className="calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem
