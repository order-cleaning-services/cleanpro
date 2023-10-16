import Select from 'react-select'
import './SelectReact.scss'
import { useState } from 'react'
import { customerStylesSelect } from '../../assets/styles/customerStylesSelect'
import { TIME_OPTIONS } from '../../constants/constants'

function SelectReact({ time }) {
  const [userChoice, setUserChoice] = useState('')
  console.log(userChoice)
  return (
    <Select
      name={time}
      className="select-time"
      classNamePrefix="select-time"
      options={TIME_OPTIONS}
      styles={customerStylesSelect}
      onChange={choice => setUserChoice(choice.value)}
    />
  )
}

export default SelectReact
