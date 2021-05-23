import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import "./ModalCreatorEnhanced.css";

const ModalCreatorEnhanced = (props) => {
  const [greeting, setGreeting] = useState(
    false
  );

  const [buttonText, setButtonText] = useState(
    "Onayla"
  );

  const [applied, setApplied] = useState(
    false
  );

  const [modalShow, setModalShow] = React.useState(true);

  const handleChange = event => {setGreeting(event.target.checked);
    //console.log(event);
  };

  const handleAcceptDone = args => {
    setModalShow(false);
    setApplied(true);
    props.sendInformation(true);
  };

  const handleUnacceptDone = args => {
    setModalShow(false);
    setApplied(false);
    props.sendInformation(false);
  };

  const showModal = args => {
    setModalShow(true);
    setButtonText("Onayla");
    setGreeting(false);
  };

  const closeModal = args => {
    setModalShow(false);
    setButtonText("Onayla");
  };

  const showModalNot = args => {
    setModalShow(true);
    setButtonText("İptal Et");
    setGreeting(true);
  };

  let formSituation = null;

  let decisionButton = null;  
  let decisionButton2 = null;

  if(applied === true){
    formSituation = <Button variant="success" onClick={showModalNot}> Onam Formu Onaylandı </Button>;
    decisionButton = <InputGroup.Text><Button variant="outline-info" onClick={greeting ? handleUnacceptDone : undefined}>{buttonText}</Button></InputGroup.Text>;
    decisionButton2 = <InputGroup.Text><Button variant="outline-warning" onClick={handleAcceptDone}>{props.buttonText2}</Button></InputGroup.Text>;
  }else{
    formSituation = <Button variant="danger" onClick={showModal}> Onam Formu Onaylanmadı </Button>
    decisionButton = <InputGroup.Text><Button variant="outline-info" onClick={greeting ? handleAcceptDone : undefined}>{buttonText}</Button></InputGroup.Text>;
    decisionButton2 = <InputGroup.Text><Button variant="outline-warning" onClick={handleUnacceptDone}>{props.buttonText2}</Button></InputGroup.Text>;
  }
 
  return (
    <div>
      {formSituation}
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.title1}
          <p>{props.title2}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="rHeader">
            <b>{props.rHeader}</b>
          </h4>
          <p className="researcher1">
            <b><p>{props.researcherName1}</p></b>
            {props.researcher1}
          </p>
          <p className="researcher2">
            <b><p>{props.researcherName2}</p></b>
            {props.researcher2}
          </p>
          <p className="researcher2">
            <b><p>{props.researcherName3}</p></b>
            {props.researcher3}
          </p>
          
          <br/>
          <p className="regular">
            <b><p>{props.part1Heading}</p></b>
            {props.part1}
          </p>
          <p className="regular">
            <b><p>{props.part2Heading}</p></b>
            {props.part2}
          </p>
          <p className="regular">
            <b><p>{props.part3Heading}</p></b>
            {props.part3}
          </p>
          <p className="regular">
            <b><p>{props.part4Heading}</p></b>
            {props.part4}
          </p>
          <p className="regular">
            <b><p>{props.part5Heading}</p></b>
            {props.part5}
          </p>
          <p className="regular">
            <b><p>{props.part6Heading}</p></b>
            {props.part6}
          </p>
        </Modal.Body>
        <Modal.Footer>
        <InputGroup.Prepend>
          <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={greeting} onChange={handleChange} />
          {/*<InputGroup.Text><Button variant="outline-dark" onClick={greeting ? props.submitted : undefined}>{props.buttonText}</Button></InputGroup.Text>*/}
          {decisionButton}
          {decisionButton2} 
        </InputGroup.Prepend>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ModalCreatorEnhanced;

