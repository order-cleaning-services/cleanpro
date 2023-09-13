import './InputField.scss'
import { forwardRef } from 'react'

const InputField = forwardRef(
  ({ placeholder = '', size, type = 'text', focus = false, label, name, onChange, isValid }, ref) => {
    function handleFocus(e) {
      if (focus) e.target.setAttribute('type', 'date')
    }

    return (
      <div className={`input__wrapper ${type === 'password' ? 'input__wrapper__password' : ''}`}>
        <label>{label}</label>
        <input
          name={name}
          className={`form-input ${size === 'small' ? 'form-input-small' : ''} ${
            type === 'password' ? 'input__password' : ''
          } ${isValid? '' : 'form-input__error'}`}
          placeholder={placeholder}
          type={type}
          onFocus={e => handleFocus(e)}
          onChange={e => {
            onChange(e)
          }}      
        />
      </div>
    )
  },
)

InputField.displayName = 'InputField'
export default InputField
