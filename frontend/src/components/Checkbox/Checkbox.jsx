import './Checkbox.scss'

function Checkbox({ label, className }) {
  return (
    <div className="checkbox form-group">
      <label className={`checkbox__label ${className}`}>
        <input className="checkbox__input" type="checkbox" />
        {label}
      </label>
    </div>
  )
}

export default Checkbox
