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

class RemoveUser extends React.Component {
  state = {
    password: "",
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

  isFormEmpty = ({ password }) => {
    return (
      !password.length 
    );
  };

  componentDidMount() {
    //let timeLeftVar = this.secondsToTime(this.state.seconds);
    console.log("Ege");
  }

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  goMain(args){
    this.props.history.push({
      pathname: '/',
      state: {
        pageNumber: 1
    }})
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      const user = {
        password: this.state.password
      };

      //console.log(user);

      //axios.post(`https://congnitivee.herokuapp.com/remove_user/`, user )
      axios.post(`http://localhost:8080/remove_user/`, user )
      .then(res => {
        //console.log(res);
       if(res.data.situation === 1){
           this.setState({ errors: [], loading: false });     
           alert("Removed");

        
      }else{
        alert("Not removed");   
        this.setState({ errors: [], loading: false });         
      }
        
      })
    }

  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const {
      password,
      errors,
      loading
    } = this.state;

    return (
      <div>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="coffee" color="orange" />
            Şifre Sil
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
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

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Sil
              </Button>
            </Segment>
          </Form>
          <Message>
          <Button color="green" className="button12" onClick={this.goMain.bind(this, 1)}>Ana Sayfa</Button>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    );
  }
}


export default withRouter(RemoveUser);
