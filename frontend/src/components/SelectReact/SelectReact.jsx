import Select from 'react-select'
import './SelectReact.scss'

function SelectReact() {
  const options = [
    { value: '09:00', label: '09 : 00' },
    { value: '10:00', label: '10 : 00' },
    { value: '11:00', label: '11 : 00' },
    { value: '12:00', label: '12 : 00' },
    { value: '13:00', label: '13 : 00' },
    { value: '14:00', label: '14 : 00' },
    { value: '15:00', label: '15 : 00' },
    { value: '16:00', label: '16 : 00' },
  ]

  const customerStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: '13px',
      boxSizing: 'border-box',
      fontSize: '1.6rem',
      boxShadow: isFocused ? '0px 0px 0px 2px rgba(129, 172, 229, 0.3)' : 'none',
      border: isFocused ? '1px solid #81ACE5' : 'none',
    }),
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? '#EAEAEA' : '',
        background: isSelected ? '#C0D5F2' : '',
        cursor: 'pointer',
        textAlign: 'center',
        height: '28px',
        lineHeight: '2.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '-36px',
        margin: '0 auto',
        fontSize: '1.6rem',
      }
    },
    menu: styles => {
      return {
        ...styles,
        maxWidth: '120px',
        borderRadius: '2rem',
        overflow: 'hidden',
      }
    },
  }

  const handleChangeSelect = selectedOption => {
    console.log('handleChange', selectedOption.value)
  }
  return (
    <Select
      className="select-time"
      classNamePrefix="select-time"
      options={options}
      styles={customerStyles}
      onChange={handleChangeSelect}
    />
  )
}

export default SelectReact
