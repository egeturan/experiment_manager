import React, {Component} from 'react';
import {
    Form,
    Segment,
    Button
  } from "semantic-ui-react";
  import axios from 'axios';
  //CSS
  import '../style/CRT.css';

class CRT extends Component{

    constructor() {
        super();
        this.state = { time: {}, seconds: 0, answer1: "",
        answer2: "",
        answer3: "",
        token: "" };

        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countUp = this.countUp.bind(this);
        this.finishTimer = this.finishTimer.bind(this);
      }
    
    displayErrors = errors =>
      errors.map((error, i) => <p key={i}>{error.message}</p>);
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
    }

    componentWillUnmount(){

        const data = {
            token: this.state.token,
            answer1: this.state.answer1,
            answer2: this.state.answer2,
            answer3: this.state.answer3,
            crtTime: this.state.seconds
          };

          clearInterval(this.timer);
                     
          //axios.post(`http://localhost:8080/sendCRT/`, data )
          //axios.post(`http://localhost:8080/sendCRT/`, data )
          axios.post(`https://cognitivee.herokuapp.com/sendCRT/`, data )
          .then(res => {

            if(res.data.situation === 1){
            alert("Deney Başarılı Şekilde Tamamlandı. Araştırma Süreci sonunda websitende bilgilendirme yayını yapılacaktır.")
                this.props.finish("finish");
              }
            
            //console.log("Result is:" + res.data.situation);
          
          })

          clearInterval(this.timer);
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
        //console.log(seconds);
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

      componentDidMount(){
        this.setState({ time: 0, token: this.props.token });
        if (this.timer === 0 && this.state.seconds >= 0) {
            this.timer = setInterval(this.countUp, 1000);
        }
        this.setState({token: this.props.token });
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : "";
    };

    controlInputs = () => {
        let { answer1, answer2, answer3, errors, loading } = this.state;
        if(answer1 === "" || answer2 === "" || answer3 === "")
        {
            alert("Tüm kutuları doldurunuz.");
        }else
        {
            this.props.submited(answer1);
        }
    }

    render(){

        const { answer1, answer2, answer3, errors, loading } = this.state;

        return(
            <div>
                    <h1>Zihinsel Tepki Testi </h1>
                    
                    <Form onSubmit={this.handleSubmit} size="small">
                        <Segment stacked>
                        <Form inline className="forminput">   
                        Bir değnek ve bir top toplamda 1.10 TL ediyor. Bir değnek bir toptan 1TL daha değerli olduğuna göre,
                        Topun fiyatı ne kadardır? (sayı giriniz)
                        <Form.Input
                            inline
                            name="answer1"
                            placeholder="     "
                            onChange={this.handleChange}
                            value={answer1}
                            type="text"
                        /> TL

                        </Form>   
                        <Form inline className="forminput">

                        Eğer 5 makinanın 5 araç yapması 5 dakika sürüyorsa, 100 makinanın 100 araç yapması ne kadar sürer?
                        <Form.Input
                            inline
                            name="answer2"
                            placeholder="     "
                            onChange={this.handleChange}
                            value={answer2}
                            type="text"
                        /> dakika

                        </Form>

                        <Form inline className="forminput">
                        Birinci günde gölde bir nilüfer yaprağı bulunuyor. Hergün yaprak parçalarının sayısı iki katına çıkıyor.
                        Eğer nilüfer yapraklarının tüm gölü kaplaması 48 gün sürüyorsa, yaprakların gölün yarısını kaplaması kaç gün sürer?
                        <Form.Input
                            inline
                            name="answer3"
                            placeholder="     "
                            onChange={this.handleChange}
                            value={answer3}
                            className="forminput"
                            type="username"
                        /> gün

                        </Form>

                        <Button
                            disabled={loading}
                            className={loading ? "loading" : ""}
                            color="violet"
                            fluid
                            size="large"
                            style={{marginTop: "4%", width: "10%", float:"right"}}
                            onClick={this.controlInputs}
                        >
                            Deneyi Bitir
                        </Button>
            
                        </Segment>
                    </Form>
                
            </div>
        );
    }

}

export default CRT;