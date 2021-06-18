import React from "react";
import axios from 'axios';
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import {withRouter} from 'react-router'
import ReCAPTCHAForm from "./ReCAPTCHAForm";
import Modal from 'react-bootstrap/Modal';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button2 from 'react-bootstrap/Button';
import './AppExp.css';
import Brain from'../assets/brain.jpg';

class AppExp extends React.Component {
  state = {
    password: "",
    errors: [],
    loading: false,
    received: false,
    pg: 2,
    value: '',
    copied: false
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Tüm alanları doldurun" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  goMain(args){
    this.props.history.push({
      pathname: '/'
    })
  }

  goLogin(args){
    this.props.history.push({
      pathname: '/login'
    })
  }

  onCatchaChange(value) {
    //console.log("Captcha value:", value);
    this.setState({pg : 2});
  }

  handleSubmit = event => {
    event.preventDefault();
      this.setState({ errors: [], loading: true });
      const user = {
        username: "new_user"
      };

      ////console.log(user);

      //axios.post(`https://congnitivee.herokuapp.com/applyForAttending/`, user )
      //axios.post(`http://localhost:8080/applyForAttending/`, user )
      axios.post(`https://cognitivee.herokuapp.com/applyForAttending/`, user )
      .then(res => {
        //console.log(res.data);
       if(res.data.situation === 1){
           this.setState({ received: true, password: res.data.key, errors: [], loading: false });     
      }else{
        alert("Not removed");   
        this.setState({ errors: [], loading: false });         
      }
        
      })

  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  sendInformation = (args) => {
    if(args != null){
      this.setState({pg: 2});
    }
  }

  render() {
    const {
      loading
    } = this.state;

    let view = null;
    //console.log(this.state.pg)
    if(this.state.received){
        view = <div>
              <Modal.Dialog>
                <Modal.Header closeButton>
                  <Modal.Title>Şifrenizi Sizin İçin Ürettik</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p className="passwordText">{this.state.password}</p>
                  <p className="passwordTextCopy">Lütfen Şifrenizi Kopyalayınız</p>
                  
                </Modal.Body>

                <div className="modalCopy">
                <CopyToClipboard text={this.state.password}
                  onCopy={() => this.setState({copied: true})}>
                  <Button2 variant="outline-success"><p className="buttonTextCopy">Şifreyi Kopyala</p></Button2>
                </CopyToClipboard>

                {this.state.copied ? <span style={{color: 'red', marginLeft:"2%"}}>Kopyalandı</span> : null}
              </div>

              <p className="info"> Bu Şifre ile Giriş Sayfasına ulaşıp deneye başlayabilirsiniz.</p>

                <Modal.Footer className="modalFooter">
                  <Button2 variant="outline-warning" onClick={this.goMain.bind(this, 1)}><p className="buttonTextCopy">Ana Sayfaya Dön</p></Button2>
                  <Button2 variant="outline-info" onClick={this.goLogin.bind(this, 1)}><p className="buttonTextCopy">Giriş Sayfasına Git</p></Button2>
                </Modal.Footer>
              </Modal.Dialog></div>;

    }else if(!this.state.received && this.state.pg === 1){
        view =  <Grid textAlign="center" verticalAlign="middle" top="10%" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
            <ReCAPTCHAForm className="reCAPTCHA" sendInformation={this.sendInformation}></ReCAPTCHAForm>
      </Grid.Column>
      </Grid>;
    }else if(!this.state.received && this.state.pg === 2){
        view = <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="green" textAlign="center">
          <img className="icon" src={Brain} alt="image"/>
            Katılım İsteği Formu
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="green"
                fluid
                size="large"
              >
                Katılım İsteği Yolla
              </Button>
            </Segment>
          </Form>
          <Message>
              Bu şifre ile size gelicek müzik rasgele şekilde belirlenecektir
          </Message>
          <Button color="green" className="buttonA" onClick={this.goMain.bind(this, 1)}><p className="mainPageText">Ana Sayfa</p></Button>
        </Grid.Column>
      </Grid>;
    }

    return (
      <div>
          {view}
      </div>
    );
  }
}


export default withRouter(AppExp);
