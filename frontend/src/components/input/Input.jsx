import "./Input.scss"

function Input({ placeholder, size, type = "text" }) {
  return (
    <input
      className={`form-input ${size === "small" ? "form-input-small" : ""}`}
      placeholder={placeholder}
      type={type}
    />
  )
}

export default Input
