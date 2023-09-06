import "./Input.scss"

function Input({
  placeholder = "",
  size,
  type = "text",
  focus = false,
  label,
}) {
  function handleFocus(e) {
    if (focus) e.target.setAttribute("type", "date")
  }

  return (
    <div className="input__wrapper">
      <label>{label}</label>
      <input
        className={`form-input ${size === "small" ? "form-input-small" : ""}`}
        placeholder={placeholder}
        type={type}
        onFocus={(e) => handleFocus(e)}
      />
    </div>
  )
}

export default Input
