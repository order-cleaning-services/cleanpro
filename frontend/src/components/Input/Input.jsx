import React, { forwardRef } from "react";
import { useController, useForm } from "react-hook-form";
import "../../../../styles/Input.css";

// function Input(props, ref) {

//   return (
//     <input
//       type={props.inputType}
//       className={props.inputClassName}
//       placeholder={props.inputPlaceHolder}
//       autoComplete="off"
//       inputref={ref}
//       name={props.name}
//     />
//   );
// }

const Input = forwardRef((props, ref) => {
  const [value, setValue] = React.useState(props.value || "");
  return (
    <input
      name={props.name}
      type={props.inputType}
      className={props.inputClassName}
      placeholder={props.inputPlaceHolder}
      autoComplete="off"
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
      }}
    />
  );
});

export default Input;
