import './Button.scss'

function Button({ buttonClassName, buttonText, type, onClick }) {
  return (
    <button type={type} className={buttonClassName} onClick={onClick}>
      {buttonText}
    </button>
  )
}

export default Button
