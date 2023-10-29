import './InputParameters.scss'

function InputParameters({ placeholder, name, label, type, className, style, width, min }) {
  return (
    <div className={`input-parameters ${className}`}>
      <label className="input-parameters__label">{label}</label>
      <input
        name={name}
        style={{ width: width }}
        min={min}
        placeholder={placeholder}
        type={type}
        className={`input-parameters__input  ${className} ${style}`}
      />
    </div>
  )
}

export default InputParameters
