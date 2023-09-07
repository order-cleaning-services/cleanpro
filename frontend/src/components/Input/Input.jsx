// import React from 'react';

import './Input.scss'

function Input(props) {
  return (
    <input
      type={props.inputType}
      className={props.inputClassName}
      placeholder={props.inputPlaceHolder}
      required
      autoComplete="off"
    />
  )
}

export default Input
