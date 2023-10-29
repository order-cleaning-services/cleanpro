import './Check.scss'

function Check({ name, value = false, updateValue = () => {}, children }) {
  const handleChange = () => {
    updateValue(!value, name)
  }

  return (
    <div className="check">
      <input
        className="check__input"
        type="checkbox"
        id={`${name}-checkbox`}
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <label htmlFor={`${name}-checkbox`}>{children}</label>
    </div>
  )
}

export default Check
