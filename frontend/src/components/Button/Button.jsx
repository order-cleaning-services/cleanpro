import './Button.scss'

function Button({ buttonClassName, buttonText }) {
  return <button className={buttonClassName}>{buttonText}</button>
}

export default Button
