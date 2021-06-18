import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

const ModalCreator = (props) => {
  const [greeting, setGreeting] = useState(
    'Hello Function Component!'
  );

  //console.log(greeting);

  const [modalShow, setModalShow] = React.useState(false);
  const handleChange = event => setGreeting(event.target.value);
  
 
  return (
    <div>
        <VerticallyCenteredModal
        show={true}
        onHide={() => setModalShow(false)}
        onStart={() => setModalShow(true)}
        modalHeading={props.modalHeading}
        modalTitle={props.modalTitle}
        modalMessage={props.modalMessage}
        situation={props.situation}
        submitted={props.submitted}
        buttonText={props.buttonText}
        checked={props.checked}
        chance={props.handleChange}
      />;

      <Headline headline={greeting} />

      <Input value={greeting} onChangeInput={handleChange}>
        Set Greeting:
      </Input>
    </div>
  );
};

const VerticallyCenteredModal = (props) => { 
  const [modalShow, setModalShow] = React.useState(false);
  const [greeting, setGreeting] = useState(
    false
  );

  //console.log("greeting :" + greeting)
  const handleChange = event => setGreeting(event.target.checked);

    return (
      <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        {props.message}
      </Button>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.modalHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.modalTitle}</h4>
          <p>
            {props.modalMessage}
          </p>
        </Modal.Body>
        <Modal.Footer>
        <InputGroup.Prepend>
          <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={greeting} onChange={handleChange} />
          <InputGroup.Text><Button variant="outline-dark" onClick={greeting ? props.submitted : undefined}>{props.buttonText}</Button></InputGroup.Text>
        </InputGroup.Prepend>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }


  const Headline = ({ headline }) => <h1>{headline}</h1>;
 
const Input = ({ value, onChangeInput, children }) => (
  <label>
    {children}
    <input type="text" value={value} onChange={onChangeInput} />
  </label>
);
  


  export default ModalCreator;