import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
//CSS
import "../style/DilemmaPage.css";


class DilemmaExceptional extends Component{

    constructor() {
        super();
        this.state = { time: {}, seconds: 0, situation: [false, false, false, false, false, false, false], situation2: [false, false, false, false, false, false, false],
        answer1: "", token: "", flag: false};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countUp = this.countUp.bind(this);
        this.finishTimer = this.finishTimer.bind(this);
      }
    
      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
    
      startTimer = () => {
        if (this.timer === 0 && this.state.seconds >= 0) {
          this.timer = setInterval(this.countUp, 1000);
        }
      }


    
      countUp() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds + 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        if(this.state.seconds === 150){
            clearInterval(this.timer);
            this.props.submited(seconds);
        }
      }
  
      finishTimer() {
        let initial_time = 0;
        this.timer = null;
        this.setState({
          time: this.secondsToTime(initial_time),
          seconds: initial_time,
          timer: 0
        });
      }

    displayErrors = errors =>
      errors.map((error, i) => <p key={i}>{error.message}</p>);
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : "";
    };
    
    changeInValue = (args) => {
        //console.log(args + 1);
        let situation2 = [false, false, false, false, false, false, false];
        situation2[args] = true;
        this.setState({situation: situation2})
        ////console.log(this.state.situation);
    }

    changeInValue2 = (args) => {
        //console.log(args + 1);
        let situation4 = [false, false, false, false, false, false, false];
        situation4[args] = true;
        this.setState({situation2: situation4})
    }

    componentDidMount(){
        if (this.timer === 0 && this.state.seconds >= 0) {
            this.timer = setInterval(this.countUp, 1000);
        }
        this.setState({token: this.props.token});
    }

    componentWillUnmount(){
      clearInterval(this.timer);
    }

    control_filled = (args) => 
    {
      if(this.state.situation[0] || this.state.situation[1] || this.state.situation[2] || this.state.situation[3] || this.state.situation[4] || this.state.situation[5] || this.state.situation[6])
      {
        if(this.state.situation2[0] || this.state.situation2[1] || this.state.situation2[2] || this.state.situation2[3] || this.state.situation2[4] || this.state.situation2[5] || this.state.situation2[6])
        {
          var i;
          var option1 = "";
          var option2 = "";
          for (i = 0; i < this.state.situation.length; i++) 
          {
            if(this.state.situation[i] === true)
            {
              option1 = (i + 1);
              break;
            }
          }

          for (i = 0; i < this.state.situation2.length; i++) 
          {
            if(this.state.situation2[i] === true)
            {
              option2 = (i + 1);
              break;
            }
          }
        
          if(this.state.answer1 !== "")
          {
              const data = {
                  token: this.state.token,
                  option1: option1,
                  option2: option2,
                  dilemmaText: this.state.answer1,
                  time: this.state.seconds
              };
              //console.log(data);
              //axios.post(`http://localhost:8080/sendDillemmaExceptional/`, data )
              //axios.post(`http://localhost:8080/sendExp/`, data )
              axios.post(`https://riverend.herokuapp.com/sendExp/`, data )
              .then(res => {
                  //console.log(res.data);
              })
              this.props.submited(args);
        }
      }
    }
  }
    
    render(){
        const { answer1 } = this.state;

        return(
            <div className="DillemPage">
              <div><h1> Soru {this.props.number}. {this.props.header} </h1>
                <p className="defaultText">{this.props.dilemma} </p>
                <p className="defaultText">{this.props.dilemma2} </p>
                <p className="defaultText">{this.props.dilemma3} </p>
                <Container className="containerEffective">
                <h1 className="defaultText">Annenin, ??ocuklar??n?? doyurmak i??in babalar??n?? ??ld??ren ??izofreni adamdan para almas??n?? de??erlendiriniz.</h1>
                <Row className="row">
                    <Col>1 - Kesinlikle Kabul Edilemez. <InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>2 <InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>3 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[2]} onClick={this.changeInValue.bind(this, 2)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>4 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[3]} onClick={this.changeInValue.bind(this, 3)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>5 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[4]} onClick={this.changeInValue.bind(this, 4)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>6 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[5]} onClick={this.changeInValue.bind(this, 5)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>7 - Kesinlikle Kabul Edilir. <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation[6]} onClick={this.changeInValue.bind(this, 6)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                </Row>
                <h1 className="defaultText">Annenin, ??ocuklar??n??n babas??n?? ??ld??ren ??izofreni adama a????k olmas??n?? de??erlendiriniz. </h1>
                <Row className="row">
                    <Col>1 - Kesinlikle Kabul Edilemez. <InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue2.bind(this, 0)} checked={this.state.situation2[0]} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>2 <InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation2[1]} onClick={this.changeInValue2.bind(this, 1)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>3 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation2[2]} onClick={this.changeInValue2.bind(this, 2)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>4 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation2[3]} onClick={this.changeInValue2.bind(this, 3)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>5 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation2[4]} onClick={this.changeInValue2.bind(this, 4)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>6 <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation2[5]} onClick={this.changeInValue2.bind(this, 5)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                    <Col>7 - Kesinlikle Kabul Edilir. <InputGroup.Prepend className="col"  ><InputGroup.Radio  checked={this.state.situation2[6]} onClick={this.changeInValue2.bind(this, 6)} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
                </Row>
                </Container>
                <div className="dilemma4">
                    <p>{this.props.dilemma4} </p>
                    <FormControl className="form"
                        inline
                        name="answer1"
                        placeholder="     "
                        onChange={this.handleChange}
                        value={answer1}
                        type="text"
                    />
                    <br/>
                    <Button variant="success" className="Button1" onClick={this.control_filled.bind(this, 1)}>Devam Et</Button>
                </div></div>
            </div>
        );
    }

}

export default DilemmaExceptional;