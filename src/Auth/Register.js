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

class Register extends React.Component {
  state = {
    username: "",
    musictype: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Tüm alanları doldurun" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Şifre geçerli değil" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, musictype, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !musictype.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
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

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      const user = {
        username: this.state.username,
        musictype: this.state.musictype,
        email: this.state.email,
        password: this.state.password
      };

      console.log(user);

      axios.post(`https://congnitivee.herokuapp.com/register_user/`, user )
      .then(res => {
        console.log(res);
       if(res.data.situation === 1){
           console.log("Registered");
           this.setState({ errors: [], loading: false });     

        
      }else{
        alert("Not registered");   
        this.setState({ errors: [], loading: false });         
      }
        
      })
    }

  };

  saveUser = createdUser => {
    return false;
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      musictype,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <div>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="coffee" color="orange" />
            Yeni kullanıcı kaydet
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Name"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

            <Form.Input
                fluid
                name="musictype"
                icon="user"
                iconPosition="left"
                placeholder="musictype"
                onChange={this.handleChange}
                value={musictype}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Re-Password"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Kaydet
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
            Ana Sayfa
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}


export default withRouter(Register);
