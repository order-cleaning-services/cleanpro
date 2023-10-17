import './InputFieldCleaner.scss'
import { forwardRef } from 'react'

const InputFieldCleaner = forwardRef(({ label, onChange, ...rest }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input className={`cleaners-change__input text-s`} type={'text'} onChange={onChange} ref={ref} {...rest} />
    </div>
  )
})
InputFieldCleaner.displayName = 'InputFieldCleaner'
export default InputFieldCleaner
