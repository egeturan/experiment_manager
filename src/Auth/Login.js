import React from "react";
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './Login.css';
import {withRouter} from 'react-router';
import Button2 from 'react-bootstrap/Button';
import ModalCreatorEnhanced from './ModalCreatorEnhanced';

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

import ReCAPTCHAForm from './ReCAPTCHAForm';

class Login extends React.Component {
  
  state = {
    username: "",
    password: "",
    pageNumber: 1,
    errors: [],
    loading: false,
    consentAccepted: 1,
    checkBox: false
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

  goToApplication = () => {
    this.props.history.push({
      pathname: '/application'
    })
  }

  componentDidMount() {

  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      if(this.state.checkBox){
            this.setState({ errors: [], loading: true });
            const user = {
              username: this.state.username,
              password: this.state.password
            };

            ////console.log(user);

            //axios.post(`http://localhost:8080/login/`, user )
            axios.post(`https://riverend.herokuapp.com/login/`, user )
            //axios.post(`http://localhost:8080/login/`, user )
            .then(res => {

              if(res.data.situation == 1)
              {
                
                //console.log("LoggedIn");
                ////console.log("Token:"  + res.data.key);
                //this.props.history.push('/register');

                this.props.history.push({
                  pathname: '/',
                  state: {
                    auth: true,
                    pageNumber: 0,
                    timer: {h: 0, m: 0, s: 0},
                    userName: res.data.userName,
                    token: res.data.key,
                    musictype: res.data.musictype
                  }
                })

              }
              else
              {
                alert("Yanl???? ??ifre");
              }             
            })
          }else{
            alert("Onam Formunu Onaylay??n??z");
          }
      
    }

    this.setState({ errors: [], loading: false });
  };

  isFormValid = ({ username, password }) => username && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  sendInformation = (args) => {
    this.setState({checkBox: args});
  }

  sendreCAPTCHA = (args) => {
    if(args != null){
      this.setState({pageNumber: 2});
    }
  }

  render() {
    const { username, password, errors, loading } = this.state;
    let loginPage = null;

    const title1 ="Ayd??nlat??lm???? Onam Formu"
    const title2 ="Ara??t??rma Protokol?????ne Kat??lan Kat??l??mc?? ????in D??zenlenen Onam Formu";
    let rHeader = "Ara??t??rmac??lar";
    let researcherName1 = "Ausaf Farooqui, Ph.D.";
    let researcherName2 = "Irmak Oltay, Psikoloji B??l??m?? Lisans ????rencisi";
    let researcherName3 = "Ege Turan, Software Development Engineer";
    let researcher1 = "Bilkent ??niversitesi, Psikoloji Departman??    Telefon: (312) 290-1153    e-mail: ausaf.farooqui@bilkent.edu.tr";
    let researcher2 = "Bilkent ??niversitesi, Lisans ??ktisadi, ??dari ve Sosyal    Bilimler Fak??ltesi  e-mail:oltayyirmak@gmail.com"
    let researcher3 = "Bilkent ??niversitesi, M??hendislik Fak??ltesi,    Bilgisayar M??hendisli??i B??l??m?? Mezunu    e-mail:egeturanf@gmail.com"
    let modal = null;
    let part1Heading="";
    let part2Heading="Bilgilendirme B??l??m??:";
    let part3Heading="Risk ve Fayda:";
    let part4Heading = "Gizlilik/G??venilirlik:";
    let part5Heading="??leti??im ve Sorular:";
    let part6Heading="Onam B??l??m??:";
    let part1 = "Bilkent psikoloji b??l??m?? lisans tez ??al????mas?? bitirme projesi kapsam??nda bu deneye davet edildiniz. Bu deneye    kat??lmaya uygun g??r??ld??n??z ????nk?? ya????n??z 18 - 65 aras??nda, g??zleriniz herhangi bir g??rsel uygulamaya uygun ve    g??n??ll?? olarak bu deneye kat??lmak istedi??inizi beyan ettiniz.A??a????daki bilgileri l??tfen dikkatlice okuyunuz, e??er    herhangi bir sorunuz olursa sorunuz ve a????k yan??tlar isteyiniz.";
    let part2 = "Bu ??al????man??n amac?? kat??l??mc??lar??n duygular??n??, bili??lerini ve karar verme    mekanizmalar??n?? incelemektir. \"Karar verme\" mekanizmalar??n??n ??l????lece??i baz?? ahlaki ikilem senaryolar?? milli    semboller ve cinsel etik ile ilgili konulara de??inmektedir ve rahats??z edici bulunabilir. B??yle bir durumda deneyi    istedi??iniz gibi terkedebilirsiniz. Deney tamamlanmad?????? takdirde verileriniz hi??bir ??ekilde kay??t    edilmeyecektir.";
    let part3 = "Bu deneye kat??lman??n bilinen riskli bir durumu s??z konusu de??ildir. Ayr??ca, kat??l??mc??ya    herhangi bir direk fayda sa??lamayacakt??r. Bu deneye kat??lmak deneysel psikoloji ara??t??rmalar?? kapsam??nda    Bilkent ??niversitesi???nde yap??lan bu deneye ve ara??t??rmalar??na katk?? sa??layacakt??r.";
    let part4 = " Deneyde ????kacak verileriniz tamamen gizlilik ve koruma alt??ndad??r. Kat??l??m    sa??laman??z i??in kullan??c?? ad?? girmeniz gerekmektedir ve bu b??l??m?? iste??iniz bir isimle doldurabilirsiniz.    Bu ??ekilde kendi ??zel ad??n??z?? vermedi??iniz i??in kendi gizlili??inizi sa??lam???? olacaks??n??z. Deneyin sonu??lar??    girmi?? oldu??unuz kullan??c?? ad??yla veri havuzuna d????ecektir ve tek tarafl?? olarak ??zel ??ifrelenmi?? bir ??ekilde    korunacakt??r.    Yeni Bulu??lar: Deneyde yeni ve ??nemli bir bilgi bulundu??u taktirde ve bunun sizin kat??l??ma devam etmenizde    sebep olacak herhangi bir etki durumunda ve yenilikler hakk??nda bilgilendirileceksiniz. Bu deneyin gelecekte    bilimsel yay??nlara yard??mda bulunma ihtimalinde de gizlili??iniz koruma alt??nda olmaya devam edecetir.";
    let part5 = "Bu deneyle ilgili herhangi bir sorunuz ya da endi??eniz varsa, bu deneyin ara??t??rmac??lar??na yukar??da payla????lan    bilgiler yoluyla ula??abilirsiniz. ";
    let part6 = "Yukar??daki yaz??lan bilgileri okudum ve anlad??m. Kafamdaki sorular??m?? ara??t??rmac??ya    sordum ve cevaplar??n?? ald??m. Bu ??al????maya g??n??ll?? olarak kat??lmaya karar verdim ve bu karar??m tamamen    bana aittir. Bu ko??ullar alt??nda, deney sonucunda olu??an ??ahs??ma ait bilgilerin bilimsel ama??larla    kullan??lmas??n??, gizlilik kurallar??n??n uyulmas??na ve yay??nlanmas??na kendi ??zg??r irademle Kabul etti??imi    beyan ederim.";

    modal = (<div><ModalCreatorEnhanced checked={false} 
                                        show={true}
                                        sendInformation={this.sendInformation}
                                        rHeader={rHeader}
                                        researcherName1={researcherName1}
                                        researcherName2={researcherName2}
                                        researcherName3={researcherName3}
                                        researcher1={researcher1}
                                        researcher2={researcher2}
                                        researcher3={researcher3}
                                        title1={title1}
                                        title2={title2}
                                        part1={part1}
                                        part2={part2}
                                        part3={part3}
                                        part4={part4}
                                        part5={part5} 
                                        part6={part6}
                                        part1Heading={part1Heading}
                                        part2Heading={part2Heading}
                                        part3Heading={part3Heading}
                                        part4Heading={part4Heading}
                                        part5Heading={part5Heading}
                                        part6Heading={part6Heading}
                                        buttonText="Onayla"
                                        buttonText2="Kapat">
                  </ModalCreatorEnhanced></div>);

    if(this.state.pageNumber === 1){
      loginPage = <div><p className="reCAPTCHAText">Deneyin Kullan??c?? Giri??i Sayfas??na Ho??geldiniz L??tfen G??venlik Sorusunu Onaylay??n??z</p>
      <Container className="Container">
      <Grid className="Grid">
        <Grid.Column  className="GridColumn"><ReCAPTCHAForm className="reCAPTCHA" sendInformation={this.sendreCAPTCHA}></ReCAPTCHAForm></Grid.Column></Grid></Container></div>;
    }else{
      loginPage = (<Container className="Container">
      <Grid className="Grid">
        <Grid.Column  className="GridColumn">
          {modal}
          <Header as="h1" icon color="violet" textAlign="center">
            Deneye ba??lamak ??zeresiniz <br/> L??tfen kendinize bir kullan??c?? ad?? belirleyiniz.
          </Header>
          <p className="browserAttention">L??tfen Deneyi Safari taray??c??s?? ??zerinden yapmay??n??z. Baz?? ??zellikler hen??z desteklenmemektedir.</p>
          <p className="browserAttention2">Deney S??ras??nda sayfay?? yenilemeniz durumunda tekrar giri?? yap??p ba??tan ba??laman??z gerekecektir. </p>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="mail"
                iconPosition="left"
                placeholder="Kullan??c?? Ad?? Belirleyiniz"
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
                placeholder="??ifre"
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
                size="large"            >
                Giri?? Yap
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
          E??er Hesab??n??z yoksa Deney Kat??l??mc?? Sistemiyle kay??t talebi olu??turun.
          </Message>
          <Button2 className="buttonExperimentApplication" variant="success" onClick={this.goToApplication}>
          <p className="buttonExperimentApplicationText">Deneye Kat??l??m Talebi Olu??tur</p>
          </Button2>
    
          <Message>
          L??tfen ??ifrenizi istenilen alanlara girerek doldurunuz. Kullan??c?? ad?? alan??n??, kendi se??ti??iniz bir ad ile doldurunuz. Bu ??ekilde girdi??iniz ??ifre, kendinizin belirledi??i kullan??c?? ad??yla de??i??ecektir ve verileriniz havuza gizli bir ??ekilde d????ecektir.
          </Message>
          <Button2 className="buttonExperimentMainPage" variant="info" onClick={this.goToHome}>
            <p className="buttonExperimentMainPageText">Ana Sayfaya D??n</p>
          </Button2>
    
        </Grid.Column>
    
      </Grid>
      </Container>);
    }

    return (
      <div>
        {loginPage}
    </div>
    );
  }
}

export default withRouter(Login);
