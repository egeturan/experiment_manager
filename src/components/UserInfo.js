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
  Header
} from "semantic-ui-react";
import { Container } from "react-bootstrap";

class UserInfo extends React.Component {
  
  state = {
    token: "",
    age: "",
    sex: "",
    education: "",
    musicType: "",
    belief: "",
    medical: "",
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
        musicType: this.state.musicType,
        belief: this.state.belief,
        medical: this.state.medical,
      };

      //console.log(user);

      
      //axios.post(`http://localhost:8080/userInfo/`, dataI )
      axios.post(`https://cognitivee.herokuapp.com/userInfo/`, dataI )
      //axios.post(`http://localhost:8080/userInfo/`, dataI )
      .then(res => {
        if(res.data.situation === 0)
        {
          console.log('Error');
        }
        console.log(res.data.details);
      
      })
      
      console.log(dataI);
      this.props.submited("fasda");
    }else{
        alert("Tüm alanları doldurunuz.");
    }

    
    this.setState({ errors: [], loading: false });
  };
  

  isFormValid = ({ age, sex, education, musicType, belief }) => age && sex && education && musicType && belief;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { age, sex, education, musicType, belief, medical, loading } = this.state;

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
                as="select"
                name="age"
                placeholder=""
                onChange={this.handleChange}
                value={age}
                className="form"
                type="age"
              >
                <option value="0">
                Doğum Tarihinizi seçiniz</option>
                        <option>1920</option>
                        <option>1921</option>
                        <option>1922</option>
                        <option value="1923">1923</option>
                        <option value="1924">1924</option>
                        <option value="1925">1925</option>
                        <option value="1926">1926</option>
                        <option value="1927">1927</option>
                        <option value="1928">1928</option>
                        <option value="1929">1929</option>
                        <option value="1930">1930</option>
                        <option value="1931">1931</option>
                        <option value="1932">1932</option>
                        <option value="1933">1933</option>
                        <option value="1934">1934</option>
                        <option value="1935">1935</option>
                        <option value="1936">1936</option>
                        <option value="1937">1937</option>
                        <option value="1938">1938</option>
                        <option value="1939">1939</option>
                        <option value="1940">1940</option>
                        <option value="1941">1941</option>
                        <option value="1942">1942</option>
                        <option value="1943">1943</option>
                        <option value="1944">1944</option>
                        <option value="1945">1945</option>
                        <option value="1946">1946</option>
                        <option value="1947">1947</option>
                        <option value="1948">1948</option>
                        <option value="1949">1949</option>
                        <option value="1950">1950</option>
                        <option value="1951">1951</option>
                        <option value="1952">1952</option>
                        <option value="1953">1953</option>
                        <option value="1954">1954</option>
                        <option value="1955">1955</option>
                        <option value="1956">1956</option>
                        <option value="1957">1957</option>
                        <option value="1958">1958</option>
                        <option value="1959">1959</option>
                        <option value="1960">1960</option>
                        <option value="1961">1961</option>
                        <option value="1962">1962</option>
                        <option value="1963">1963</option>
                        <option value="1964">1964</option>
                        <option value="1965">1965</option>
                        <option value="1966">1966</option>
                        <option value="1967">1967</option>
                        <option value="1968">1968</option>
                        <option value="1969">1969</option>
                        <option value="1970">1970</option>
                        <option value="1971">1971</option>
                        <option value="1972">1972</option>
                        <option value="1973">1973</option>
                        <option value="1974">1974</option>
                        <option value="1975">1975</option>
                        <option value="1976">1976</option>
                        <option value="1977">1977</option>
                        <option value="1978">1978</option>
                        <option value="1979">1979</option>
                        <option value="1980">1980</option>
                        <option value="1981">1981</option>
                        <option value="1982">1982</option>
                        <option value="1983">1983</option>
                        <option value="1984">1984</option>
                        <option value="1985">1985</option>
                        <option value="1986">1986</option>
                        <option value="1987">1987</option>
                        <option value="1988">1988</option>
                        <option value="1989">1989</option>
                        <option value="1990">1990</option>
                        <option value="1991">1991</option>
                        <option value="1992">1992</option>
                        <option value="1993">1993</option>
                        <option value="1994">1994</option>
                        <option value="1995">1995</option>
                        <option value="1996">1996</option>
                        <option value="1997">1997</option>
                        <option value="1998">1998</option>
                        <option value="1999">1999</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                </Form.Input>

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

              <Form.Input
                as="select"
                name = "belief"
                onChange={this.handleChange}
                value={belief}
                className="form"
                type="belief"
              >
                    <option >Dini İnancınız</option>
                    <option >Deism</option>
                    <option >Müslümanlık</option>
                    <option >Hristiyanlık</option>
                    <option >Budism</option>
                    <option >Agnostik</option>
                    <option >Yahudilik</option>
                    <option >Diğer</option>
                    <option >Belirtmek İstemiyorum</option>
              </Form.Input>

              <Form.Input
                as="select"
                name = "medical"
                onChange={this.handleChange}
                value={medical}
                className="form"
                type="medical"
              >
                    <option >Daha önce herhangi bir psikiyatrik ilaç kullanımınız oldu mu?</option>
                    <option >Evet</option>
                    <option >Hayır</option>
                    <option >Söylemek istemiyorum</option>
              </Form.Input>

              <Form.Input
                as="select"
                name = "medical"
                onChange={this.handleChange}
                value={medical}
                className="form"
                type="medical"
              >
                    <option>Kullandıysanız ilaç türü nedir?</option>
                    <option>Antidepresan</option>
                    <option>Antipsikotik</option>
                    <option>Uyku hapları ve küçük sakinleştiriciler</option>
                    <option>Lityum ve diğer duygudurum düzenleyicileri</option>
                    <option>Diğer</option>
              </Form.Input>

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="green"
                size="large"
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
