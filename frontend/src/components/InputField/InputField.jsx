import './InputField.scss'
import { forwardRef } from 'react'

const InputField = forwardRef(
  (
    {
      placeholder = '',
      size,
      type = 'text',
      focus = false,
      error = null,
      style,
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
    return (
      <div className={`input__wrapper ${type === 'password' ? 'input__wrapper__password' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          className={`form-input ${size === 'small' ? 'form-input-small' : ''} ${
            type === 'password' ? 'input__password' : ''
          } ${classNameModal} ${isValid ? '' : 'form-input__error'} ${style}`}
          placeholder={placeholder}
          type={type}
          onFocus={e => handleFocus(e)}
          onChange={e => {
            onChange(e)
          }}
          ref={ref}
          {...rest}
        />
        {error && <span className="form-entry__error">{error.message}</span>}
      </div>
    )
  },
)

InputField.displayName = 'InputField'
export default InputField
