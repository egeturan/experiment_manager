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

            //console.log(user);

            //axios.post(`http://localhost:8080/login/`, user )
            axios.post(`https://cognitivee.herokuapp.com/login/`, user )
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
                alert("Yanlış Şifre");
              }             
            })
          }else{
            alert("Onam Formunu Onaylayınız");
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

    const title1 ="Aydınlatılmış Onam Formu"
    const title2 ="Araştırma Protokol’üne Katılan Katılımcı İçin Düzenlenen Onam Formu";
    let rHeader = "Araştırmacılar";
    let researcherName1 = "Ausaf Farooqui, Ph.D.";
    let researcherName2 = "Irmak Oltay, Psikoloji Bölümü Lisans Öğrencisi";
    let researcherName3 = "Ege Turan, Software Development Engineer";
    let researcher1 = "Bilkent Üniversitesi, Psikoloji Departmanı    Telefon: (312) 290-1153    e-mail: ausaf.farooqui@bilkent.edu.tr";
    let researcher2 = "Bilkent Üniversitesi, Lisans İktisadi, İdari ve Sosyal    Bilimler Fakültesi  e-mail:oltayyirmak@gmail.com"
    let researcher3 = "Bilkent Üniversitesi, Mühendislik Fakültesi,    Bilgisayar Mühendisliği Bölümü Mezunu    e-mail:egeturanf@gmail.com"
    let modal = null;
    let part1Heading="";
    let part2Heading="Bilgilendirme Bölümü:";
    let part3Heading="Risk ve Fayda:";
    let part4Heading = "Gizlilik/Güvenilirlik:";
    let part5Heading="İletişim ve Sorular:";
    let part6Heading="Onam Bölümü:";
    let part1 = "Bilkent psikoloji bölümü lisans tez çalışması bitirme projesi kapsamında bu deneye davet edildiniz. Bu deneye    katılmaya uygun görüldünüz çünkü yaşınız 18 - 65 arasında, gözleriniz herhangi bir görsel uygulamaya uygun ve    gönüllü olarak bu deneye katılmak istediğinizi beyan ettiniz.Aşağıdaki bilgileri lütfen dikkatlice okuyunuz, eğer    herhangi bir sorunuz olursa sorunuz ve açık yanıtlar isteyiniz.";
    let part2 = "Bu çalışmanın amacı katılımcıların duygularını, bilişlerini ve karar verme    mekanizmalarını incelemektir. \"Karar verme\" mekanizmalarının ölçüleceği bazı ahlaki ikilem senaryoları milli    semboller ve cinsel etik ile ilgili konulara değinmektedir ve rahatsız edici bulunabilir. Böyle bir durumda deneyi    istediğiniz gibi terkedebilirsiniz. Deney tamamlanmadığı takdirde verileriniz hiçbir şekilde kayıt    edilmeyecektir.";
    let part3 = "Bu deneye katılmanın bilinen riskli bir durumu söz konusu değildir. Ayrıca, katılımcıya    herhangi bir direk fayda sağlamayacaktır. Bu deneye katılmak deneysel psikoloji araştırmaları kapsamında    Bilkent Üniversitesi’nde yapılan bu deneye ve araştırmalarına katkı sağlayacaktır.";
    let part4 = " Deneyde çıkacak verileriniz tamamen gizlilik ve koruma altındadır. Katılım    sağlamanız için kullanıcı adı girmeniz gerekmektedir ve bu bölümü isteğiniz bir isimle doldurabilirsiniz.    Bu şekilde kendi özel adınızı vermediğiniz için kendi gizliliğinizi sağlamış olacaksınız. Deneyin sonuçları    girmiş olduğunuz kullanıcı adıyla veri havuzuna düşecektir ve tek taraflı olarak özel şifrelenmiş bir şekilde    korunacaktır.    Yeni Buluşlar: Deneyde yeni ve önemli bir bilgi bulunduğu taktirde ve bunun sizin katılıma devam etmenizde    sebep olacak herhangi bir etki durumunda ve yenilikler hakkında bilgilendirileceksiniz. Bu deneyin gelecekte    bilimsel yayınlara yardımda bulunma ihtimalinde de gizliliğiniz koruma altında olmaya devam edecetir.";
    let part5 = "Bu deneyle ilgili herhangi bir sorunuz ya da endişeniz varsa, bu deneyin araştırmacılarına yukarıda paylaşılan    bilgiler yoluyla ulaşabilirsiniz. ";
    let part6 = "Yukarıdaki yazılan bilgileri okudum ve anladım. Kafamdaki sorularımı araştırmacıya    sordum ve cevaplarını aldım. Bu çalışmaya gönüllü olarak katılmaya karar verdim ve bu kararım tamamen    bana aittir. Bu koşullar altında, deney sonucunda oluşan şahsıma ait bilgilerin bilimsel amaçlarla    kullanılmasını, gizlilik kurallarının uyulmasına ve yayınlanmasına kendi özgür irademle Kabul ettiğimi    beyan ederim.";

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
      loginPage = <div><p className="reCAPTCHAText">Deneyin Kullanıcı Girişi Sayfasına Hoşgeldiniz Lütfen Güvenlik Sorusunu Onaylayınız</p>
      <Container className="Container">
      <Grid className="Grid">
        <Grid.Column  className="GridColumn"><ReCAPTCHAForm className="reCAPTCHA" sendInformation={this.sendreCAPTCHA}></ReCAPTCHAForm></Grid.Column></Grid></Container></div>;
    }else{
      loginPage = (<Container className="Container">
      <Grid className="Grid">
        <Grid.Column  className="GridColumn">
          {modal}
          <Header as="h1" icon color="violet" textAlign="center">
            Deneye başlamak üzeresiniz <br/> Lütfen kendinize bir kullanıcı adı belirleyiniz
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
                size="large"            >
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
          Eğer Hesabınız yoksa Deney Katılımcı Sistemiyle kayıt talebi oluşturun.
          </Message>
          <Button2 className="buttonExperimentApplication" variant="success" onClick={this.goToApplication}>
          <p className="buttonExperimentApplicationText">Deneye Katılım Talebi Oluştur</p>
          </Button2>
    
          <Message>
          Lütfen şifrenizi istenilen alanlara girerek doldurunuz. Kullanıcı adı alanını, kendi seçtiğiniz bir ad ile doldurunuz. Bu şekilde girdiğiniz şifre, kendinizin belirlediği kullanıcı adıyla değişecektir ve verileriniz havuza gizli bir şekilde düşecektir.
          </Message>
          <Button2 className="buttonExperimentMainPage" variant="info" onClick={this.goToHome}>
            <p className="buttonExperimentMainPageText">Ana Sayfaya Dön</p>
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
