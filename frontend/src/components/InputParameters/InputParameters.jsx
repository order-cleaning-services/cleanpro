import './InputParameters.scss'

function InputParameters({ placeholder, label, type, className }) {
  return (
    <div className={`input-parameter ${className}`}>
      <label className="input-parameters__label">{label}</label>
      <input placeholder={placeholder} type={type} className="input-parameters__input text-s" />
    </div>
  )
}

export default InputParameters
