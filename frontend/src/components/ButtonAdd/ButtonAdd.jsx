import './ButtonAdd.scss'

function ButtonAdd({ text, onClick }) {
  return (
    <button type="text" className="button-add text-m-bold" onClick={onClick}>
      {text}
    </button>
  )
}

export default ButtonAdd
