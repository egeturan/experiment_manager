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


class DilemmaPage extends Component{

    constructor() {
        super();
        this.state = { time: {}, seconds: 0, situation: [false, false, false, false, false, false, false],
        dillemaNumber: 0,
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
        console.log(args + 1);
        let situation2 = [false, false, false, false, false, false, false];
        situation2[args] = true;
        this.setState({situation: situation2})
        console.log(this.state.situation);
    }

    componentDidMount(){
        if (this.props.number === 3 || this.props.number === 6 || this.props.number === 11 || this.props.number === 15 || this.props.number === 4)
        {
          this.setState({ time: 0, token: this.props.token, flag: true});
        }else{
          this.setState({ time: 0, token: this.props.token });
        }
        if (this.timer === 0 && this.state.seconds >= 0) {
            this.timer = setInterval(this.countUp, 1000);
        }
    }

    componentWillUnmount(){
      clearInterval(this.timer);
    }

    control_filled = (args) => {
        if(this.state.situation[0] || this.state.situation[1] || this.state.situation[2] || this.state.situation[3] || this.state.situation[4] || this.state.situation[5] || this.state.situation[6])
        {
            if(this.state.answer1 !== "")
            {
                const data = {
                  token: this.state.token,
                  dilemma: this.state.situation,
                  dillemmaNumber: this.props.number,
                  dilemmaText: this.state.answer1,
                  time: this.state.seconds
                };
                
                console.log(data);
                //axios.post(`http://localhost:8080/sendDilemma/`, data )
                axios.post(`https://cognitivee.herokuapp.com/sendDilemma/`, data )
                .then(res => {
          
                  console.log(res.data.situation);

                })
                this.props.submited(args);
            }
        }
    }

    decide(){
      const { answer1 } = this.state;
      if (this.props.number === 3 || this.props.number === 6 || this.props.number === 11 || this.props.number === 15 || this.props.number === 16 || this.props.number === 4)
      {
        if(this.props.number === 3)
        {
          return <div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
          <p>{this.props.dilemma} </p>
          <p>{this.props.dilemma2} </p>
          <p>{this.props.dilemma3} </p>
          <Container className="containerEffective">
          <h1>Ölçüt</h1>
          <Row className="row">
              <Col><InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" />
              a.	Bir çocuğu arkada bırak ve öteki iki çocuğu kurtar.</InputGroup.Prepend></Col>
              <Col><InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" />
              b.	Çocuğu geride bırakma ve hiçbir çocuğu kurtarama.</InputGroup.Prepend></Col>
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
          </div></div>;
        }
        if(this.props.number === 6)
        {
          return <div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
          <p>{this.props.dilemma} </p>
          <p>{this.props.dilemma2} </p>
          <p>{this.props.dilemma3} </p>
          <h1>Ölçüt</h1>
              <Row>
              <Col><InputGroup.Prepend className="col" > <InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" />a.	Üçüncü çocuğu geride bırak. Kendini ve iki çocuğu kurtar.</InputGroup.Prepend>  </Col>
              <Col> <InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" />b.	Üçüncü çocuğun sana tutunmasına izin ver ve kimseyi kurtarama.</InputGroup.Prepend></Col>
              </Row>
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
          </div></div>;
        }
        if(this.props.number === 11)
        {
          return <div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
          <p>{this.props.dilemma} </p>
          <p>{this.props.dilemma2} </p>
          <p>{this.props.dilemma3} </p>
          <Container className="containerEffective">
          <h1>Ölçüt</h1>
          <Row className="row">
          <Col><InputGroup.Prepend><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button" />a.	Köy konseyine haber ver. Kendini ve köyü kurtar.</InputGroup.Prepend></Col>
          <Col><InputGroup.Prepend ><InputGroup.Radio  checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button" />b.	Virüslü adamın köye ulaşmasına izin ver ve onu kurtar.</InputGroup.Prepend></Col>    
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
          </div></div>;
          
        }
        if(this.props.number === 15)
        {
          return<div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
        <p>{this.props.dilemma} </p>
        <p>{this.props.dilemma2} </p>
        <p>{this.props.dilemma3} </p>
        <Container className="containerEffective">
        <h1>Ölçüt</h1>
        <Row className="row">
          <Col><InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" />a. Yaralı dalgıcı vur. Kendini ve gruptaki diğer dalgıçları kurtar.</InputGroup.Prepend></Col>
          <Col><InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" />b.	Yaralı dalgıcın kafese ulaşmasına izin ver ve sadece bir dalgıcı kurtar.</InputGroup.Prepend></Col>
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
        </div></div>;
        }
        if(this.props.number === 16)
        {
          return<div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
        <p>{this.props.dilemma} </p>
        <p>{this.props.dilemma2} </p>
        <p>{this.props.dilemma3} </p>
        <Container className="containerEffective">
        <h1>Ölçüt</h1>
        <Row className="row">
          <Col><InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" />a. Annenin, çocuklarını doyurmak için babalarını öldüren şizofreni adamdan para almasını değerlendiriniz.</InputGroup.Prepend></Col>
          <Col><InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" />b.	Annenin, çocuklarının babasını öldüren şizofreni adama aşık olmasını değerlendiriniz. </InputGroup.Prepend></Col>
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
        </div></div>;
        }
        if(this.props.number === 4)
        {
          return<div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
        <p>{this.props.dilemma} </p>
        <p>{this.props.dilemma2} </p>
        <p>{this.props.dilemma3} </p>
        <Container className="containerEffective">
        <h1>Ölçüt</h1>
        <Row className="row">
          <Col><InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" />a. Diğer çocukları kurtarmak için ağlayan öksüz bebeğin ağzını kapa.</InputGroup.Prepend></Col>
          <Col><InputGroup.Prepend className="col"  ><InputGroup.Radio checked={this.state.situation[1]} onClick={this.changeInValue.bind(this, 1)} aria-label="Radio button for following text input" />b.	Ağlayan öksüz bebeğin ağzını kapama ve askerler sizi bulsun. </InputGroup.Prepend></Col>
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
        </div></div>;
        }
      }else{
        return <div className="dilemmaContainer"><h1> Soru {this.props.number}. {this.props.header} </h1>
        <p>{this.props.dilemma} </p>
        <p>{this.props.dilemma2} </p>
        <p>{this.props.dilemma3} </p>
        <Container className="containerEffective">
        <h1>Ölçüt</h1>
        <Row className="row">
            <Col>1 - Kesinlikle Kabul Edilemez. <InputGroup.Prepend className="col" ><InputGroup.Radio onClick={this.changeInValue.bind(this, 0)} checked={this.state.situation[0]} aria-label="Radio button for following text input" /></InputGroup.Prepend></Col>
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
      }
    }

    
    render(){
        return(
            <div className="DillemPage">
              {this.decide()}               
            </div>
        );
    }

}

export default DilemmaPage;