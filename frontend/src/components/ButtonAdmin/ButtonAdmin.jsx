import './ButtonAdmin.scss'

function ButtonAdmin({ text }) {
  return (
    <button type="submit" className="button-admin text-m-bold">
      {text}
    </button>
  )
}

export default ButtonAdmin
