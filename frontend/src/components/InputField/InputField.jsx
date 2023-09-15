import { forwardRef } from 'react'
import './InputField.scss'

const InputField = forwardRef(({ placeholder = '', size, type = 'text', focus = false, label, ...rest }, ref) => {
  function handleFocus(e) {
    if (focus) e.target.setAttribute('type', 'date')
  }
  return (
    <div className={`input__wrapper ${type === 'password' ? 'input__wrapper__password' : ''}`}>
      <label>{label}</label>
      <input
        className={`form-input ${size === 'small' ? 'form-input-small' : ''} ${
          type === 'password' ? 'input__password' : ''
        }`}
        placeholder={placeholder}
        type={type}
        onFocus={e => handleFocus(e)}
        ref={ref}
        {...rest}
      />
    </div>
  )
})

InputField.displayName
export default InputField
