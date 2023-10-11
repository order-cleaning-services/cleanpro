import './InputFilters.scss'

function InputFilters({ placeholder }) {
  return (
    <div className="input-filters">
      <input placeholder={placeholder} type="text" className="input-filters__input text-s" />
    </div>
  )
}

export default InputFilters
