import { forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { setIsStateDate } from '../../store/formOrderValidation/formOrderValidation'

const InputFieldDate = forwardRef(
  (
    {
      placeholder = '',
      size,
      disabled = false,
      type = 'text',
      focus = false,
      label,
      name,
      onChange,
      isValid,
      classNameModal,
      ...rest
    },
    ref,
  ) => {
    function handleFocus(e) {
      if (focus) e.target.setAttribute('type', 'date')
    }

    const dispatch = useDispatch()

    function addLeadingZero(d) {
      return d < 10 ? '0' + d : d
    }
    const currentUserDate = new Date()
    function getUserDate(currentUserDate) {
      let Y = currentUserDate.getFullYear()
      let M = addLeadingZero(currentUserDate.getMonth() + 1)
      let D = addLeadingZero(currentUserDate.getDate())
      const stringDate = `${Y},${M},${D}`
      const dataDateUser = stringDate.split(',').map(Number)
      return dataDateUser
    }
    const userDate = getUserDate(currentUserDate)

    function handleChange(dateCleaning) {
      const date = dateCleaning.replace(/-/g, ',').split(',').map(Number)
      const valueDate = date[2]
      const valueMonth = date[1]
      const valueYear = date[0]
      const currentDate = userDate[2]
      const currentMonth = userDate[1]
      const currentYear = userDate[0]
      if (currentYear == valueYear && currentMonth == valueMonth && currentDate <= valueDate) {
        dispatch(setIsStateDate(true))
      } else if (currentYear == valueYear && currentMonth < valueMonth) {
        dispatch(setIsStateDate(true))
      } else if (currentYear < valueYear) {
        dispatch(setIsStateDate(true))
      } else {
        dispatch(setIsStateDate(false))
      }
    }

    return (
      <div className={`input__wrapper ${type === 'password' ? 'input__wrapper__password' : ''}`}>
        <label>{label}</label>
        <input
          disabled={disabled}
          name={name}
          className={`form-input ${size === 'small' ? 'form-input-small' : ''} ${
            type === 'password' ? 'input__password' : ''
          } ${classNameModal} ${isValid ? '' : 'form-input__error'}`}
          placeholder={placeholder}
          type={type}
          onFocus={e => handleFocus(e)}
          onInput={e => {
            const dateCleaning = e.target.value
            handleChange(dateCleaning)
          }}
          onChange={e => {
            onChange(e)
          }}
          ref={ref}
          {...rest}
        />
      </div>
    )
  },
)

InputFieldDate.displayName = 'InputFieldDate'
export default InputFieldDate
