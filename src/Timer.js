import React from 'react';
import Button from 'react-bootstrap/Button';

class Timer extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 0 };
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
  
    componentDidMount() {
      //let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: 0 });
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
      this.props.timeUpdate(seconds);
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
  
    render() {
      return(
        <div>
          <Button variant="light" onClick={this.startTimer}>Start</Button>
          <Button variant="dark" onClick={this.finishTimer}>Finish</Button>
        </div>
      );
    }
  }
  
  export default Timer;