import { useState } from 'react'
import './Search.scss'
import search from '../../assets/images/search.svg'

function Search() {
  const [searchText, setSearchText] = useState('')
  console.log(searchText)
  const handleChange = evt => {
    setSearchText(evt.target.value)
  }

  return (
    <>
      <div className="search">
        <input placeholder="Номер заказа" className="search__input" onChange={handleChange} />
        <button type="submit" className="search__button"></button>
        <img className="search__input-icon" src={search} alt="Поиск" />
      </div>
    </>
  )
}

export default Search
