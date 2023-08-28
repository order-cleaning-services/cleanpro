import React from "react";

import "../../../../styles/Button.css";

function Button(props) {
  return (
    <button className={props.buttonClassName + ` ${props.isValid? '' : 'button_disabled'}`} type={props.type} disabled={!props.isValid}>
      {props.buttonText}
    </button>
  );
}

export default Button;
