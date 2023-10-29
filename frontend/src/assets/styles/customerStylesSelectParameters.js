export const customerStylesSelectParameters = {
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
