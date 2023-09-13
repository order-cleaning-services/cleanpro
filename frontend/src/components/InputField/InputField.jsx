import './InputField.scss'

function InputField({ placeholder = '', size, type = 'text', focus = false, label }) {
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
      />
    </div>
  )
}

export default InputField
