import React from "react";
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import Button2 from 'react-bootstrap/Button';
import '../style/UserInfo.css';

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
    token: "",
    age: "",
    sex: "",
    education: "",
    musicType: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  componentDidMount() {
    //let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ token: this.props.token });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      const dataI = {
        token: this.state.token,
        age: this.state.age,
        sex: this.state.sex,
        education: this.state.education,
        musicType: this.state.musicType
      };

      //console.log(user);

      
      //axios.post(`http://localhost:8080/userInfo/`, dataI )
      axios.post(`https://cognitivee.herokuapp.com/userInfo/`, dataI )
      .then(res => {
      
      })
      
      console.log(dataI);
      this.props.submited("fasda");
    }else{
        alert("Tüm alanları doldurunuz.");
    }

    
    this.setState({ errors: [], loading: false });
  };
  

  isFormValid = ({ age, sex, education, musicType }) => age && sex && education && musicType;

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
                placeholder="Yaşınızı Giriniz"
                onChange={this.handleChange}
                value={age}
                className={this.handleInputError(errors, "age")}
                type="age"
              />

              <Form.Input
                as="select"
                name="sex"
                onChange={this.handleChange}
                value={sex}
                className="form"
                type="sex"
              >
                <option>Cinsiyet</option>
                <option>Kadın</option>
                <option>Erkek</option>
            </Form.Input>

            <Form.Input
                as="select"
                name="education"
                onChange={this.handleChange}
                value={education}
                className="form"
                type="education"
              >
                    <option>Eğitim Durumunuz</option>
                    <option>İlkOkul Mezunu</option>
                    <option>Lise Mezunu</option>
                    <option>Lisans Öğrencisi</option>
                    <option>Lisans Mezunu</option>
                    <option>Yüksek Öğretim</option>
              </Form.Input>

            <Form.Input
                as="select"
                name = "musicType"
                onChange={this.handleChange}
                value={musicType}
                className="form"
                type="musicType"
              >
                    <option >Hangi müzik tarzını daha çok sever ve dinlersiniz (bu tercihiniz, karşınıza çıkacak müziği etkilemeyecektir.)</option>
                    <option >Elektronik Müzik</option>
                    <option >Klasik Müzik</option>
              </Form.Input>

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="green"
                size="large"
                className="button"
                style={{marginTop: "1px"}}              >
                Tamamla
              </Button>
 
            </Segment>
          </Form>
        </Grid.Column>

      </Grid>
      </Container>
    );
  }
}

export default UserInfo;
