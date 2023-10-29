import Check from '../Check/Check'
import { useState } from 'react'

const listOptions = ['Поддерживающая', 'Генеральная', 'После ремонта', 'После праздника', 'Окна']

function CheckboxAll() {
  const [selected, setSelected] = useState([])

  function handleSelect(value, name) {
    if (value) {
      setSelected([...selected, name])
    } else {
      setSelected(selected.filter(item => item !== name))
    }
  }

  function selectAll() {
    setSelected(listOptions)
  }

  return (
    <div>
      <Check name="all" value={selected.length === listOptions.length} updateValue={selectAll}>
        Все пакеты
      </Check>
      {listOptions.map((item, index) => {
        return (
          <Check key={index} name={item} value={selected.includes(item)} updateValue={handleSelect}>
            {item}
          </Check>
        )
      })}
    </div>
  )
}
export default CheckboxAll
