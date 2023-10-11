import { useState } from 'react'

import './Search.scss'

import search from '../../images/search.svg'

function Search({ placeholder }) {
  const [searchText, setSearchText] = useState('')
  console.log(searchText)

  const handleChange = evt => {
    setSearchText(evt.target.value)
  }

  return (
    <>
      <div className="search">
        <input placeholder={placeholder} className="search__input" onChange={handleChange} />
        <button type="submit" className="search__button"></button>
        <img className="search__input-icon" src={search} alt="Поиск" />
      </div>
    </>
  )
}

export default Search
