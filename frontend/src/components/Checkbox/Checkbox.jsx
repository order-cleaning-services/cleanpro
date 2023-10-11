import './Checkbox.scss'

function Checkbox({ label }) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input className="checkbox__input" type="checkbox" />
        {label}
      </label>
    </div>
  )
}

export default Checkbox
