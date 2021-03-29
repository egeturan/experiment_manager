import React from "react";
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './Login.css';
import {withRouter} from 'react-router';
import Button2 from 'react-bootstrap/Button';

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Container } from "react-bootstrap";

class Login extends React.Component {
  
  state = {
    username: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  goToHome = () => {

    this.props.history.push({
      pathname: '/'
    })
    
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      const user = {
        username: this.state.username,
        password: this.state.password
      };

      console.log(user);

      axios.post(`http://localhost:8080/login/`, user )
      .then(res => {

        if(res.data.situation == 1)
        {
          
          console.log("LoggedIn");
          //console.log("Token:"  + res.data.key);
          //this.props.history.push('/register');

          this.props.history.push({
            pathname: '/',
            state: {
              auth: true,
              pageNumber: 1,
              timer: {h: 0, m: 0, s: 0},
              userName: res.data.userName,
              token: res.data.key,
              musictype: res.data.musictype
            }
          })

        }
        else
        {
          alert("Yanlış Şifre | Wrong Password")
        }             
      })
      
    }

    this.setState({ errors: [], loading: false });
  };

  isFormValid = ({ username, password }) => username && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { username, password, errors, loading } = this.state;

    return (
      <Container className="Container">
      <Grid className="Grid">
        <Grid.Column  className="GridColumn">
          <Header as="h1" icon color="violet" textAlign="center">
            Deneye başlamak üzeresiniz. <br/> Kendinize bir kullanıcı adı belirleyiniz.
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="mail"
                iconPosition="left"
                placeholder="Kullanıcı Adı Belirleyiniz"
                onChange={this.handleChange}
                value={username}
                className={this.handleInputError(errors, "username")}
                type="username"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
                style={{marginTop: "1px"}}              >
                Giriş Yap
              </Button>
 
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
          Lütfen şifrenizi istenilen alanlara girerek doldurunuz. Kullanıcı adı alanını, kendi seçtiğiniz bir ad ile doldurunuz. Bu şekilde girdiğiniz şifre, kendinizin belirlediği kullanıcı adıyla değişecektir ve verileriniz havuza gizli bir şekilde düşecektir.
          </Message>
          <Button2 className="button" variant="success" onClick={this.goToHome}>
            Ana Sayfaya Dön
          </Button2>

        </Grid.Column>

      </Grid>
      </Container>
    );
  }
}

export default withRouter(Login);
