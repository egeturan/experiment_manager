import React, {Component} from 'react';
import Soundfile from "../assets/classic2.m4a";
import Button from 'react-bootstrap/Button';
//CSS
import '../style/Music.css'

class PlayClassicSound2 extends Component{

  constructor() {
    super();
    this.state = { time: {}, seconds: 0, play_audio: null };
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
    this.startTimer();
  }

  componentWillUnmount(){
    this.countUp = null;
    clearInterval(this.timer);
  }

  startTimer = () => {
    if (this.timer == 0 && this.state.seconds >= 0) {
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

    if(this.state.seconds == 10){
      this.start();
  }
  //console.log(this.state.seconds)

  if(this.state.seconds == 400){
    this.stop();
    this.timer = null;
    this.countUp = null;
    this.props.submited();
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

    start = () => {
      let audio = new Audio(Soundfile);
      var playPromise = audio.play();
      this.setState({play_audio: audio})
  
      // In browsers that don’t yet support this functionality,
      // playPromise won’t be defined.
      if (playPromise !== undefined) {
        playPromise.then(function() {
          // Automatic playback started!
        }).catch(function(error) {
          console.log(error);
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
        });
    }
  }

  stop = () => {
    let audio = this.state.play_audio;
    if(audio != null)
    {
      console.log(this.state.play_audio);
      let audio = this.state.play_audio;
      audio.pause();
      this.setState({play_audio: null})
    }
    else{
      console.log("No audio is selected");
    }
  }

  lookTime(args) {

  }

  screenstatus(args) {
    if(this.state.seconds < 10){
      return <div className="time">{10 - this.state.seconds}</div>;
    }
    else if(this.state.seconds > 10){
      return <div className="experiment"><Button variant="success" className="button1" onClick={this.props.submited}>Deneye Devam Et</Button></div>;
    }
  }

    render(){
        return(
            <div>
              <h1>Müzik Arası Kategori 2</h1>
              <p className="music">Lütfen kulaklıklarınızla dinleyiniz ve dikkatinizi müzikten başka bir şeye odaklamayınız. </p>
              {this.lookTime()}
              {this.screenstatus()}
              
            </div>
        );
    }

}

export default PlayClassicSound2;