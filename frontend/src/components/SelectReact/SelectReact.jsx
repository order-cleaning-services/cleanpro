import Select from 'react-select'
import './SelectReact.scss'
import { useState } from 'react'
import { customerStylesSelect } from '../../constants/constants'
import { options } from '../../utils/initialData'

function SelectReact({ time }) {
  const [userChoice, setUserChoice] = useState('')
  console.log(userChoice)
  return (
    <Select
      name={time}
      className="select-time"
      classNamePrefix="select-time"
      options={options}
      styles={customerStylesSelect}
      onChange={choice => setUserChoice(choice.value)}
    />
  )
}

export default SelectReact
