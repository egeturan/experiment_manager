import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
 
const ReCAPTCHAForm = (props) => {

  function onChange(value) {
    if(value != null){
      props.sendInformation(value);
    }
  }
 
  return (
      <ReCAPTCHA
        sitekey="6LdRCuUaAAAAACTH-85xRAH0bkvG_20ae5G8ZJkV"
        onChange={onChange}
      />
  )
}

export default ReCAPTCHAForm;