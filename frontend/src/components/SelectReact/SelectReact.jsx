import Select from 'react-select'
import './SelectReact.scss'
import { useState } from 'react'

function SelectReact({ time, options, styles }) {
  const [userChoice, setUserChoice] = useState('')
  console.log(userChoice)
  return (
    <Select
      name={time}
      className="select-time"
      classNamePrefix="select-time"
      options={options}
      styles={styles}
      onChange={choice => setUserChoice(choice.value)}
    />
  )
}

export default SelectReact
