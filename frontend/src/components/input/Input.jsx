import "./Input.scss"

function Input({ placeholder, size }) {
  return (
    <input
      className={`form-input ${size === "small" ? "form-input-small" : ""}`}
      placeholder={placeholder}
    />
  )
}

export default Input
