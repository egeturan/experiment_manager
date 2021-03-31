import React from "react";
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
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

class UserInfo extends React.Component {
  
  state = {
    age: "",
    sex: "",
    education: "",
    musicType: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      const dataI = {
        age: this.state.age,
        sex: this.state.sex,
        education: this.state.education,
        musicType: this.state.musicType
      };

      //console.log(user);

      axios.post(`https://congnitivee.herokuapp.com/userInfo/`, dataI )
      .then(res => {
      
      })
      
    }

    this.setState({ errors: [], loading: false });
    this.props.submited("fasda");
  };

  isFormValid = ({ age, sex }) => age && sex;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { age, sex, education, musicType, errors, loading } = this.state;

    return (
      <Container className="Container">
      <Grid className="Grid">
        <Grid.Column  className="GridColumn">
          <Header as="h1" icon color="violet" textAlign="center">
            Lütfen Aşağıdaki Bilgileri Doldurunuz
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="age"
                icon="mail"
                iconPosition="left"
                placeholder="Kullanıcı Adı Belirleyiniz"
                onChange={this.handleChange}
                value={age}
                className={this.handleInputError(errors, "age")}
                type="age"
              />

              <Form.Input
                fluid
                name="sex"
                icon="lock"
                iconPosition="left"
                placeholder="Cinsiyet"
                onChange={this.handleChange}
                value={sex}
                className={this.handleInputError(errors, "sex")}
                type="sex"
              />

            <Form.Input
                fluid
                name="education"
                icon="lock"
                iconPosition="left"
                placeholder="Eğitim Durumu"
                onChange={this.handleChange}
                value={education}
                className={this.handleInputError(errors, "sex")}
                type="sex"
              />

            <Form.Input
                fluid
                name="musicType"
                icon="lock"
                iconPosition="left"
                placeholder="Müzik Türü"
                onChange={this.handleChange}
                value={musicType}
                className={this.handleInputError(errors, "sex")}
                type="sex"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="green"
                fluid
                size="large"
                style={{marginTop: "1px"}}              >
                Tamamla
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
          
          </Message>

        </Grid.Column>

      </Grid>
      </Container>
    );
  }
}

export default UserInfo;
