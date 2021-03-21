import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Checkbox } from 'semantic-ui-react'
import "./DilemmaPage.css";

class DilemmaPage extends Component{

    state = {
        situation: [false, false, false, false, false, false, false],
        dillemaNumber: 0
    }

    changeInValue = (args) => {
        console.log(args + 1);
        let situation2 = [false, false, false, false, false, false, false];
        situation2[args] = true;
        this.setState({situation: situation2})
        console.log(this.state.situation);
    }

    componentDidMount(){
        let situation2 = [false, false, false, false, false, false, false];
        this.setState({situation: situation2})
    }

    control_filled = (args) => {
        if(this.state.situation[0] || this.state.situation[1] || this.state.situation[2] || this.state.situation[3] || this.state.situation[4] || this.state.situation[5] || this.state.situation[6])
        {
            this.props.submited(args);
        }
    }

    componentWillUnmount(){
        let situation2 = [false, false, false, false, false, false, false];
        this.setState({situation: situation2})
        const data = {
            situation: this.state.situation,
            dillemaNumber: this.state.dillemaNumber
          };
    
          /*
          axios.post(`http://localhost:8080/sendDilemma/`, data )
          .then(res => {
    
            if(res.data.situation == 1)
            {
              
              console.log("LoggedIn");
              console.log("Token:"  + res.data.key);
    
            }
            else
            {
              alert("Yanlış Şifre | Wrong Password")
            }             
          })
          */
    }

    


    render(){
        return(
            <div className="DillemPage">
                <h1> {this.props.number}. Hikaye </h1>
                <p>{this.props.dilemma} </p>
                <p>{this.props.dilemma2} </p>
                <p>{this.props.dilemma3} </p>
                <Container className="containerEffective">
                <h1>Ölçüt</h1>
                <Row>
                    <Col>1 - Kesinlikle Kabul Edilemez. <InputGroup.Prepend  ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>2 <InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>3 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[2]} onClick={this.changeInValue.bind(this, 2)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>4 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[3]} onClick={this.changeInValue.bind(this, 3)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>5 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[4]} onClick={this.changeInValue.bind(this, 4)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>6 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[5]} onClick={this.changeInValue.bind(this, 5)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>7 - Kesinlikle Kabul Edilir. <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[6]} onClick={this.changeInValue.bind(this, 6)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                </Row>
                </Container>
                <div className="dilemma4">
                <p>{this.props.dilemma4} </p>
                <FormControl
                    placeholder="         "
                    aria-label="Amount (to the nearest dollar)"
                />
                <br/>
                <div className="experiment"><Button variant="success" className="button1" onClick={this.control_filled.bind(this, 1)}>Devam Et</Button></div>
                </div>
                
            </div>
        );
    }

}

export default DilemmaPage;