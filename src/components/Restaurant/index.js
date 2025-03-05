import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import DishItem from '../DishItem'
import Header from '../Header'
import './index.css'

const Restaurant = () => {
  const [loading, setLoading] = useState(true)
  const [dishList, setDishList] = useState([])
  const [activeTab, setActiveTab] = useState('')
  const [items, setItems] = useState([])

  const getUpdatedList = list =>
    list.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(eachcat => ({
        dishId: eachcat.dish_id,
        dishName: eachcat.dish_name,
        dishPrice: eachcat.dish_price,
        dishCurrency: eachcat.dish_currency,
        dishDescription: eachcat.dish_description,
        dishCalories: eachcat.dish_calories,
        dishImage: eachcat.dish_image,
        dishType: eachcat.dish_Type,
        dishAvailability: eachcat.dish_Availability,
        addonCat: eachcat.addonCat,
      })),
    }))

  const addItem = dishes => {
    const item = items.find(each => each.dishId === dishes.dishId)
    console.log(item)
    if (!item) {
      const newItem = {...dishes, quantity: 1}
      setItems(prevState => [...prevState, newItem])
    } else {
      setItems(prevState =>
        prevState.map(each =>
          each.dishId === dishes.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      )
    }
  }

  const removeItem = dishes => {
    const item = items.find(each => each.dishId === dishes.dishId)
    if (item) {
      setItems(prev =>
        prev
          .map(each =>
            each.dishId === dishes.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(each => each.quantity > 0),
      )
    }
  }

  const fetchDishesList = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    const updatedData = getUpdatedList(data[0].table_menu_list)
    setDishList(updatedData)
    setActiveTab(updatedData[0].menuCategoryId)
    setLoading(false)
  }

  useEffect(() => {
    fetchDishesList()
  }, [])

  const onUpdateTab = id => {
    setActiveTab(id)
  }

  const renderMenuList = () =>
    dishList.map(each => {
      const onClickTab = () => onUpdateTab(each.menuCategoryId)
      return (
        <li
          key={each.menuCategoryId}
          className={`tab ${
            each.menuCategoryId === activeTab ? 'active-tab' : ''
          }`}
          onClick={onClickTab}
        >
          <button type="button" className="tab-button">
            {each.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = dishList.find(
      each => each.menuCategoryId === activeTab,
    )
    return (
      <ul>
        {categoryDishes.map(eachdish => (
          <DishItem
            dish={eachdish}
            addItem={addItem}
            removeItem={removeItem}
            items={items}
            key={eachdish.dishId}
          />
        ))}
      </ul>
    )
  }

  return (
    <div>
      {loading ? (
        <Loader type="ThreeDots" width={50} height={50} />
      ) : (
        <div>
          <Header items={items} />
          <ul className="menu-list">{renderMenuList()}</ul>
          {renderDishes()}
        </div>
      )}
    </div>
  )
}

export default Restaurant
