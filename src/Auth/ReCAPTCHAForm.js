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
        sitekey="6LfqLMcbAAAAAMXIL1eKxzegSH-EnkwZDRnq_arU"
        onChange={onChange}
      />
  )
}

export default ReCAPTCHAForm;