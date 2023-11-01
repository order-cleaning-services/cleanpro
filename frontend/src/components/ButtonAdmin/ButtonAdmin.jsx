import './ButtonAdmin.scss'

function ButtonAdmin({ text, style, id, onSubmit, onClick }) {
  return (
    <button
      onClick={onClick}
      onSubmit={e => onSubmit(e)}
      id={id}
      type="submit"
      className={`button-admin ${style}  text-m-bold`}>
      {text}
    </button>
  )
}

export default ButtonAdmin
