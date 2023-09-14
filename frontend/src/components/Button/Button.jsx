import './Button.scss'

function Button({ buttonClassName, buttonText, type }) {
  return (
    <button type={type} className={buttonClassName}>
      {buttonText}
    </button>
  )
}

export default Button
