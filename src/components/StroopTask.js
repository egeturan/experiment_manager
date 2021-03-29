import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import axios from 'axios';
// CSS
import '../style/Stroop.css';

const timing = 1.5;

let stroopS = null;

class StroopTask extends React.Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 0, colors: ["green", "blue", "purple", "red", "orange", "yellow"], colorsT: ["yeşil", "mavi", "mor", "kırmızı", "turuncu", "sarı"],
     A: [], main: "", left: " ", right: "  ", mainColor: "   ", answer: "", stroopCount: 0, results: [], cong: "",mainO: "", leftO: "", rightO: "", mainColorO: "", token: "", dilemmaCount: 0, busy: false};
    this.timer = 0;
    this.timer2 = 0;
    this.startTimer = this.startTimer.bind(this);
    this.startTimer2 = this.startTimer2.bind(this);
    this.countUp = this.countUp.bind(this);
    this.countUp2 = this.countUp2.bind(this);
    this.finishTimer = this.finishTimer.bind(this);
    this.refresher = 0;
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

  componentDidMount() {
    //let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: 0, token: this.props.token });
    this.startTimer();
  }

  startTimer = () => {
    console.log("Timer Started")
    if (this.timer == 0 && this.state.seconds >= 0) {
      this.timer = setInterval(this.countUp, 750);
    }
  }

  startTimer2 = () => {
    if (this.state.seconds >= 0) {
      console.log("Timer Started")
      this.timer2 = setInterval(this.countUp2, 500);
    }
  }

  countUp() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds + 1;
    
    //console.log("Stroop Count " + stroopC)
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });



    if(this.state.seconds <= 10){
      let congProb = this.getconGProb();
      this.showStroop(congProb);
      stroopS = this.lookTime();
    }
    
    console.log(seconds);
  }

  countUp2() {
    console.log("Timer 2")

    

    let congProb = this.getconGProb();
    this.showStroop(congProb);
    stroopS = this.lookTime();
    this.setState({busy: false});

    clearInterval(this.timer2);

  }

  componentWillUnmount()
  {
    clearInterval(this.timer);

    const data = {
        token: this.state.token,
        results: this.state.results
      };
        
      axios.post(`http://localhost:8080/sendStroop/`, data )
      .then(res => {
  
        if(res.data.situation == 1)
        {
          
        }
        else
        {
  
        }             
      })

  }

  finishTimer() {
    let initial_time = 0;
    this.setState({
      time: this.secondsToTime(initial_time),
      seconds: initial_time,
      timer: 0
    });
    this.timer = null;
  }

  getconGProb() {
    let possibiltyCong = Math.floor(Math.random() * 4);
    let stroop = null;
    if(possibiltyCong == 0){
      stroop = "incong";
    }else{
      stroop = "cong";
    }
    return stroop;
  }

  controlKey(args) {
    let arr = null;
    
    if(this.state.seconds >= 10 && this.state.busy === false)
    {
      this.setState({busy: true});
      if(args == 'left')
      {
        //console.log(args);
        if(this.state.mainColor == this.state.left){
          arr = this.state.results;
          arr.push([this.state.cong, 'T'])
        }else{
          arr = this.state.results;
          arr.push([this.state.cong, 'F'])
        }
      }
      else if(args == 'right')
      {
        //console.log(args);
        if(this.state.mainColor == this.state.right){
          arr = this.state.results;
          arr.push([this.state.cong, 'T'])
        }else{
          arr = this.state.results;
          arr.push([this.state.cong, 'F'])
        }
      }else{
        console.log("error");
      }

      stroopS = null;

      this.setState({results: arr});
      console.log(arr)
      this.startTimer2();

      

    }

  }


  returnM() {
    const mystyle = {
      color : this.state.mainColor,
      fontSize: "90px"
    }
    let main = this.state.colors.indexOf(this.state.main);
    return <p style={mystyle}>{this.state.colorsT[main]}</p>;
    
  }

  returnL() {
    const mystyle = {
      fontSize: "90px"
    }
    let left = this.state.colors.indexOf(this.state.left);
    return <p style={mystyle}>{this.state.colorsT[left]}</p>;
  }


  returnR() {
    const mystyle = {
      fontSize: "90px"
    }
    let right = this.state.colors.indexOf(this.state.right);
    return <p style={mystyle}>{this.state.colorsT[right]}</p>;
  }

  lookTime(args) {

    let main = this.state.colors.indexOf(this.state.main);
    let left = this.state.colors.indexOf(this.state.left);
    let right = this.state.colors.indexOf(this.state.right);
    let stroop = <div className="Stroop"> 
    <tr>
    {this.state.seconds >= 0 &&
        <Badge className="BoxM" style={{}}>{this.returnM()}</Badge>
    }
        
    </tr>
    <tr>
        <Badge className="BoxL">{this.returnL()}</Badge>
        <Badge className="BoxM">{this.returnR()}</Badge>
    </tr>
  </div>
    if(this.state.seconds < 10){
      return <div className="CountD">{10 - this.state.seconds}</div>;
    }else if(this.state.seconds < 1200){
      return <div>{stroop}</div>;
    }else{
      return <div><Button variant="success" className="BoxM" onClick={this.props.submited}>Testi Tamamla</Button></div>;
    }
  }

  showStroop(congProb) {

    let possibblilityColor = Math.floor(Math.random() * 6); // 7 possibility
    let firstColor = this.state.colors[possibblilityColor];
    //console.log(firstColor);
    let otherColors = [];
    for(let i = 0; i < this.state.colors.length; i++){
      if(possibblilityColor != i){
        otherColors.push(this.state.colors[i]);
      }
    }

    let secondColorPossbility = Math.floor(Math.random() * 5);
    let secondColor = otherColors[secondColorPossbility];

    if(congProb == "incong"){
      //console.log("incog first: " + firstColor + " second " + secondColor);
      let leftRight = [firstColor, secondColor];
      let leftRightPossibility = Math.floor(Math.random() * 2);
      let leftColor = leftRight[leftRightPossibility];
      let rightColor = null;
      if(leftRightPossibility == 0){
          rightColor = leftRight[1];
      }else{
          rightColor = leftRight[0];
      }
      this.setState({
        main: firstColor,
        left: leftColor,
        right: rightColor,
        mainColor: secondColor,
        answer: secondColor,
        cong: congProb,
        mainO: this.state.main,
        leftO: this.state.left,
        rightO: this.state.right,
        mainColorO: this.state.mainColor
      });

    }else if(congProb == "cong"){
      //console.log("cong first: " + firstColor + " second " + secondColor);
      let leftRight = [firstColor, secondColor];
      let leftRightPossibility = Math.floor(Math.random() * 2);
      let leftColor = leftRight[leftRightPossibility];
      let rightColor = null;
      if(leftRightPossibility == 0){
          rightColor = leftRight[1];
      }else{
          rightColor = leftRight[0];
      }
      this.setState({
        main: firstColor,
        left: leftColor,
        right: rightColor,
        mainColor: firstColor,
        answer: firstColor,
        cong: congProb,
        mainO: this.state.main,
        leftO: this.state.left,
        rightO: this.state.right,
        mainColorO: this.state.mainColor
      });
    }
  }
 
  render() {

    const ComponentA = (props) => (<div>
      <div> {props.eventKey}</div>
      <KeyboardEventHandler
        handleKeys={['left', 'right']}
        onKeyEvent={(key, e) => this.controlKey(key)} />
    </div>);

    
    return (
      <div>
        <div>
        {stroopS}
        </div>
        <ComponentA></ComponentA>
        </div>
    );
  }
}

export default StroopTask;