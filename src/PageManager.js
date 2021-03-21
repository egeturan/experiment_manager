import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Timer from './Timer';
import './PageManager.css';
import DilemmaPage from './DilemmaPage';
import StroopTask from './StroopTask';
import PlayClassicSound from './PlayClassicSound';
import PlayElectronicSound from './PlayElectronicSound';
import Panas from './Panas';
import CRT from './CRT';
import {withRouter} from 'react-router';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import PlayElectronicSound2 from './PlayElectronicSound2';
import PlayClassicSound2 from './PlayClassicSound2';
import ButtonImage from'./assets/buttons.jpg';
import Sample1 from'./assets/sampl1.jpg';
import Sample2 from'./assets/sample1.jpg';

class PageManager extends React.Component {
  
  state = {
    auth: false,
    pageNumber: 1,
    timer: {h: 0, m: 0, s: 0},
    userName: "default",
    token: "111111",
    musictype: 0,
    dilemmaCounter: 0,
    dilemma: ["Zeynep 5 yıldır Kadri ile beraber. Her ilişki gibi onlarınki de zaman zaman zorlaşıyor. Sonuç olarak Zeynep bu ilişkide olmaktan mutlu ve bu ilişkiyi sürdürmek istiyor. Kadri de Zeynep’i seviyor, Zeynep’le evlenmek istiyor.",
    "Zeynep bir gün kendi bilgisayarından maillerine bakmak ister. Kadri’nin hesabının açık olduğunu görür. Özellikle bir mail Zeynep’in dikkatini çeker. Zeynep maili açtığında, erkek arkadaşı ile ilgili daha önce bilmediği yeni bir şey öğrenir. Kadri’in bir önceki partneri bir kadın değil, erkektir. Zeynep bu keşif sonrasında şaşkınlık ve kafa karışıklığı içinde Kadir’i terk eder.",
    "",
    "Kimin maili açıktır?",  

    "Bulut 9 aydır işsizdir ve son işindeyken biriktirdiği bütün parasını bittirdi. Pek de geniş olmayan bir apartman dairesinde yaşıyor. Hayvanları çok seviyor, bir köpek ve iki balık besliyor.",
      "Bütün erzakları tükenen Bulut, artık yemek için para bulamaz hale gelir. Sonraki üç gün de aç kalınca, evcil balıklarını yemeye karar verir. Beslediği iki balığı tıpkı marketten alınmış balık gibi temizleyip pişirir. Birini kendisine, diğerini köpeğine servis eder.",
      "",
      "Bulut ikinci balığı kime servis etti?",

      "Alaska’da bir gölde, rehberli kayık gezisindesin. Yakında başka bir kayıktan üç çocuk göle düşmüş, donarak ölmek üzereler. Yanlarına gidip iki çocuğu kayığınıza aldıktan sonra, üçüncüyü almanın kayığı batırıp hepinizi öldüreceğini fark ettin. Ne sen, ne de rehber kayıktan atlayabilir; çünkü sen kürek çekiyorsun, rehber de çocuklardan birine kalp masajı yapıyor.",
      "İki çocukla beraber kıyıya doğru gidersen, kayık batmayacak. Geride kalan çocuk ölecek, diğer ikisini kurtaracaksın.",
      "Üçüncü çocuğu geride bırakıp ölmesine izin vererek kıyıya dönüp diğer iki çocuğu kurtaracak mısın?",
      "Kayık gezisi nerede geçmektedir? ",

      "Büşra bir yüzücü, uzun zamandır milli takıma girmesini sağlayacak bir yarışmaya hazırlanıyor. Bu hayatındaki en önemli yarışma, ve 10 dakika içinde başlayacak. Profesyonel yüzücüler için tasarlanmış, giymesi neredeyse 20 dakika alan özel bir mayo giyiyor. Bu yüzden de yarışmadan önce son kez tuvalete gitmesi demek yarışı kaçırabileceği anlamına geliyor.",
      "Büşra yarışma stresini üzerinden atmak için rahatlamak zorunda hisseder ve bunun yolu da tuvaletini yapmaktır. Havuzun kenarına oturur, devridaim giderinin tam üzerine tuvaletini yapar ve havuzu kirletmeden işin içinden çıkabileceğini düşünür.",
      "",
      "Büşra’nın yaptığı spor nedir?",
      
      "Barış bir haftalık İstanbul seyahati için AirBnB uygulamasından bir daire kiralar. AirBnB uygulaması ile insanlar kendi evlerini içindeki eşyalarla birlikte başkalarına kiraya verir. Ev sahipleri ayrıca, kiracının eşyaları için de uygun alan yaratır.",
      "Barış kiraladığı eve giriş yaptıktan sonra, dairenin sahibinin nasıl biri olduğunu merak eder. Etrafı biraz gezince, gizemli bir sandık bulur. Üzerindeki örtüyü kaldırınca, sandığın kilitli olduğunu görür. Sandığı açmaması gerektiğini anlar, bu sırada mutfakta bu kilide uyabilecek bir anahtar gördüğünü de hatırlar. Kilidi o anahtarla açmayı dener ve kilit açılır. Sandığın içinden sadece eski kitaplar çıkar.",
      "",
      "Barış’ın kullandığı uygulamanın adı ne? ",

      "Bir kreşin öğrencilerini hayvanat bahçesine geziye götüren otobüsün sürücüsüsün. Gidişte lastiklerde çıkan bir sorun otobüsü yoldan çıkarıp hızlı akıntılı bir nehre düşürüyor. Batmakta olan otobüste sen ve çocuklardan üçü kaldınız. İki çocuğu tek kolunla tutup yüzerek otobüsten çıkmaya çalışıyorsun. Diğer çocuk bacağına sarılıyor. Akıntıya karşı üç çocukla yüzecek kadar güçlü olmadığını hissediyorsun.",
      "Bacağından tutan çocuğu silkelersen çıkabileceksiniz, ancak geride kalan çocuk boğulacak. Bir çocuk ölecek, ancak iki çocuk ve sen kurtulacaksınız.",
      "Diğer iki çocukla beraber yüzerek kurtulmak için üçüncü çocuğu boğularak ölecek şekilde geride bırakacak mısın?",
      "Çocuklar kaçıncı sınıfta okuyorlar? ",

      "Oktay ve Ege beraber yaşayan iki kardeş. Oktay’ın kız arkadaşına bir hediye almak için paraya ihtiyacı var. Oktay’ın kız arkadaşının doğum günü, aylık harçlığını aldığı günden bir gün önce.",
      "Hal böyleyken Oktay, parayı kardeşi Ege’den alabileceğini düşünür. Ancak Ege evde değildir. Kardeşi de olsa kimseden para istemeyi sevmeyen Oktay, ertesi gün parası gelince yerine koyacağını düşünerek kardeşinin odasından 1000 lira alır. Bu parayla kız arkadaşına hediye alır, ve kardeşinin haberi olmadan ertesi gün kendi harçlığından aynı miktarı yerine koyar.",
      "",
      "Oktay kardeşinden ne kadar para almıştır? ",

      "Esra ve Murat üniversite öğrencisi iki kuzen. Bir yaz tatili sırasında Fransa’da tatildeler. Bir geceyi sahil kenarında bir kulübede geçiriyorlar. Bu şartlar altında sevişmek ikisine de ilginç ve eğlenceli bir fikir gibi görünüyor. İkisi içinde en azından yeni bir deneyim olacak. Esra zaten doğum kontrol hapı kullanıyor. Murat yine de prezervatifle korunuyor. İkisi de sevişmekten zevk alıyor, ama tekrarlamamak konusunda anlaşıyorlar. Bu geceyi aralarında bir sır olarak saklıyorlar. Birbirlerine daha yakın hissederek hayatlarına devam ediyorlar.",
      "",
      "",
      "Kuzenler nereye seyahat etmiştir? ",

      "Bir kadın evi temizlerken eski [Türk] bayrağını bulur. Bayrağı artık istemediğinden kesip, onu temizlik bezi olarak tuvaleti temizlemek için kullanır. (Kadın ülkesini sever.)",
      "",
      "",
      "Kadın evin neresini temizler? ",

      "Ölüm döşeğinde bir kadın, oğlundan ona mezarını her hafta ziyaret edeceğine dair söz vermesini ister. Oğlu annesini çok sever, bu konuda annesine istediği sözü verir. Ancak annesi öldükten sonra, oğlu çok meşgul olduğundan bu sözü tutamaz.",
      "",
      "",
      "Çocuk annesine ne söz verir? ",

      "Afrika kırsalında bir köyde gönüllü bir Barış Gücü sağlıkçısısın. Komşu köylerden birinden bir adam, son derece bulaşıcı, tedavisi olmayan ve çoğu zaman ölümcül olan Ebola virüsüne yakalanmış. Şaşırtıcı şekilde hala hayatta. Bu, virüse karşı bağışıklık kazanmış demek olabilir. Fakat bu adam senin sağlık merkezine gelip hastalıktan tamamen kurtulabileceğini düşünüyor. Yaklaştığını görüyorsun, ve köye girerse virüsü 119 masum ve bağışık olmayan insana bulaştıracağını, yani onları öldüreceğini biliyorsun.",
      "Köy konseyine haber verirsen adamı vurup sana ve köyün diğer sakinlerine virüs bulaştırmasını engelleyecekler. Adam ölecek, ancak 119 sakin ve sen kurtulacaksınız.",
      "Köy konserine haber verip adamı vurdurtarak virüsü sana ve 119 sakine bulaştırmasını engelleyecek misin?",
      "Hasta hangi virüse yakalanmıştır? ",

      "Bir ailenin köpeğine evlerinin önünde araba çarpar, köpek ölür. Köpek etinin çok lezzetli olduğunu duyan aile fertleri, o akşam köpeklerini pişirip yer.",
      "",
      "",
      "Aile akşam yemeğinde ne yiyor? ",

      "Bir adam her hafta marketten çiğ tavuk alır. Sonra tavukla cinsel ilişkiye girer. Tavuğu pişirip yer.",
      "",
      "",
      "Adam marketten ne alır? ",

      "20 yaşlarında bir genç yetişkin. Karnı tamamen doyana kadar yemek yer, ama yine de daha çok yemek ister. Tuvalete gidip kendisini kusturur, sonra odasına dönüp biraz daha yer. Bunu yaptığını kimse görmez. Kendisi de kötü hissetmez.",
      "",
      "",
      "Genç yetişkin kaç yaşlarında? ",

      "Sen ve 10 diğer dalgıç İkinci Dünya Savaşı’ndan kalma, gemi mayınlarını etkisiz hale getiren bir BM takımındasınız. Takımdan biri yaralandı ve sudaki kan birkaç köpek balığını yanınıza çekti. Elinde bir zıpkın var, ancak bir mil (şiş) var. Kanaması olan dalgıç koruma kafesine doğru yüzmekte. Sen ve diğer dalgıçlardan önce varacak. Köpek balıkları çok yaklaştı, yakında sana ve diğer dalgıçlara yetişecekler.",
      "Yaralı dalgıcı vurursan dalgıç ölecek, ve köpek balıkları durup onu yiyecekler, böylece sen ve diğer dalgıçlar kurtulacak.",
      "Köpek balıklarının yaralı dalgıcı yemesine izin verip diğer dalgıçlarla beraber koruma kafesine girer misin?",
      "Bu hikayedeki hayvanın adı nedir? "
    ]
  }


  updateTime = (args) => {
    let seconds = this.secondsToTime(args);
    if(args/10 > this.state.pageNumber)
    {
      this.nextPage();
    }    

    if(args < 10){
      this.setState({pageNumber: 1, timer: seconds})
    }
    else{
      this.setState({timer: seconds})
    }
    
  }

  signedIn = (args) => {
    this.setState({auth: true, token: args});
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

  

  componentDidMount() {
    console.log("Uploading");
    console.log(this.props.history.location.state);
    if(this.props.history.location.state != undefined)
    {
        this.setState(this.props.history.location.state)
    }
    
    
  }


  nextPage = () => {
    if(this.state.pageNumber < 50)
    {
      this.setState({pageNumber: this.state.pageNumber + 1})
    }else{
      console.log("This is last page");
    }
  }

  login = () => {
    this.props.history.push({
      pathname: '/login'
    })
  }

  previousPage = () => {
    if(this.state.pageNumber > 1)
    {
      this.setState({pageNumber: this.state.pageNumber - 1})
    }else{
      console.log("This is first page");
    }
  }

  submited = (args) => {
    this.setState({pageNumber: this.state.pageNumber + 1})
  }

  render() {
    let screen = null;
    let inside = null;

    let movement = <div className="buttons">
    <Button variant="dark" className="button2" onClick={this.nextPage}>Deneye Başla</Button>
    </div>;

    {console.log(this.state.musictype)}

    if(this.state.pageNumber === 1)
    {
       screen = <div><h2>Duygu, Biliş ve Ahlaki Karar Üzerine Bilişsel Yaklaşım Deneyine Hoşgeldiniz.  </h2>
       <p className="Intro">
Bu deney toplamda dört bölümden oluşmaktadır. <br/>
<br/>
1. Genel Duygulanım Derecelendirmesi (10 dakika) <br/>
  <li> Müzik arası (7 dakika) <br/> </li>
2. Sürdürülebilir Dikkat deneyi (10 dakika) <br/>
  <li> Müzik arası (7 dakika) <br/> </li>
3. İkilem Yargı Sorguları (30 dk) <br/>
4. Zihinsel Tepki Süresi Testi (6 dakika) <br/>
<br/>
Deney Toplamda: 70 dakika sürmektedir. <br/>
<br/>
Her bölümden sonra gelecek bölümün talimatları tekrardan ekranda belirecektir. Lütfen her bölümden sonra talimatları tekrar okuyunuz ve talimatlara göre bir sonraki bölümü yapmaya başlayınız. <br/>
<br/>
Her bölümün zaman limiti önceden yukarıdaki bilgilere uygun bir şekilde ayarlanmıştır. Müzik aralarından sonra başlayacak bölümün bilgilendirme sayfasına otamatik olarak yönlendirileceksiniz. Talimatları okuma sırasında her hangi bir zaman kısıtlaması olmaksızın, istediğiniz zaman bir sonraki bölüme geçebilirsiniz. <br/>
<br/>
Lütfen kulaklıklarınızı deney başlamadan önce ayarlayınız. Müziklerin daha dikkatli dinlenebilmesi için, lütfen müziği kulaklıklarınızla dinleyiniz. <br/>
<br/>
(ÖNEMLİ: DENEY SIRASINDA TELEFONUNUZU KAPATINIZ.)
<br/>
<br/>
Teşekkürler.
</p>

      {/*<Timer val="ege" timeUpdate={this.updateTime}></Timer>{<h1>Time: h: {this.state.timer.h} m: {this.state.timer.m} s: {this.state.timer.s}*/}
          </div>;
    }
    else if(this.state.pageNumber === 2)
    {
      screen = <div><Panas submited={this.submited}></Panas>
      </div>;
      //movement = null;
    }
    else if(this.state.pageNumber === 3 && this.state.musictype === 1)
    {
      screen = <div><PlayElectronicSound submited={this.submited}></PlayElectronicSound></div>;
    }else if(this.state.pageNumber === 3 && this.state.musictype === 2)
    {
      screen = <div><PlayClassicSound submited={this.submited}></PlayClassicSound></div>;
    }
    else if(this.state.pageNumber === 4)
    {
      screen = <div>
        <div className="IntroStroop">
            <h1>2. Bölüm: Dikkat Deneyi – Renk ve Kelime Karşıtlığı (10 dakika) </h1>
            <ListGroup>
            <ListGroup.Item>Bu bölümde karşınıza 6 adet renk kelimesi çıkacaktır. </ListGroup.Item>
            <ListGroup.Item>Karşınıza çıkacak renkler: Kırmızı, Turuncu, Sarı, Yeşil, Mavi, Mor</ListGroup.Item>
            <ListGroup.Item>Bu sayıların yazılı olduğu kelimelerin rengi bazen “yazan renkten” <b>FARKLI</b> ya da <b>AYNI</b> olacaktır.</ListGroup.Item>
            <ListGroup.Item>Sizden istediğimiz gelen kelimenin ifade ettiği rengi şeçmeniz değil, yazının asıl rengini ( <b>YAZININ ANLAMI DEĞİL, RENGİ</b>) aşağıda belirecek olan iki seçenekten uygun olanı seçmeniz. </ListGroup.Item>
            <ListGroup.Item>Bu deney “DİKKAT” deneyi olduğundan dolayı, kelimeler arasındaki geçiş hızlıdır. Verilerinizin daha doğru sonuç vermesi için lütfen elinizden geldiğince gelen uyaranlara hızlı cevap veriniz.  </ListGroup.Item>
            <ListGroup.Item>Cevap vermek için “SAĞ VE SOL YÖN TUŞLARI” nı kullanınız.  <img  src={ButtonImage} alt="fireSpot"/> </ListGroup.Item>
            </ListGroup>
            <Row>
            <Col>
              <p>ÖRNEK: </p>
            </Col>
            <Col>
            <h2>Doğru cevap: Sarı	</h2>
            <img  src={Sample1} alt="fireSpot"/>
            </Col>

            <Col>
            <h2>Doğru cevap: Turuncu</h2>
            <img  src={Sample2} alt="fireSpot"/>
            </Col>
            
            </Row>
            <Button variant="success" className="button12" onClick={this.nextPage}>Testi Başlat</Button>
            </div>;
      </div>;
      movement = null;
    }
    else if(this.state.pageNumber === 5)
    {
      screen = <div className="StroopTask"><h1 bold>Biliş Dikkat Testi</h1><StroopTask className="stroop" submited={this.submited}></StroopTask></div>;
      movement = null;
    }
    else if(this.state.pageNumber === 6 && this.state.musictype === 1)
    {
      screen = <div><PlayElectronicSound2 submited={this.submited}></PlayElectronicSound2></div>;
    }else if(this.state.pageNumber === 6 && this.state.musictype === 2)
    {
      screen = <div><PlayClassicSound2 submited={this.submited}></PlayClassicSound2></div>;
    }
    else if(this.state.pageNumber == 7)
    {
      screen = <div className="welcomeDilemma">
        <h1>Bölüm 3: İkilem Yargı Soruları </h1>
        <ListGroup>
            <ListGroup.Item>Bu bölümde karşınıza toplamda 15 adet kısa hikaye çıkacaktır; </ListGroup.Item>
            <ListGroup.Item>11 adet kısa hikaye: Her hikayeyi okuduktan sonra, karşılaştığınız durumlarla ilgili hislerinizi yargılamanız istencektir. Bu yargılarınızı yedi “7” basamaklı bir puanlama sistemi ile göstereceksiniz. </ListGroup.Item>
            <ListGroup.Item>1- Kesinlikle kabul edilemez / 7- Kesinlikle kabul edilir.</ListGroup.Item>
            <ListGroup.Item>1 ile 7 arasındaki sayıları kabul edilebilirlik ve edilemeyebilirlik arasındaki düşünce ve hissetme yoğunluğunuza göre seçiniz. </ListGroup.Item>
            <ListGroup.Item>4 adet kısa hikaye: Bu hikayelerin iki seçeneği olacaktır, lütfen bir seçeneği işaretleyiniz. </ListGroup.Item>
            <ListGroup.Item>Sorular karşınıza karışık bir şekilde çıkacaktır. </ListGroup.Item>
            <ListGroup.Item>Not: Her soru için toplam 2 dakikanız vardır, eğer iki dakikadan önce işaretleme yaparsanız “enter” tuşuyla bir sonraki soruya geçiniz. </ListGroup.Item>
            <ListGroup.Item>Hazır olduğunuzda başla tuşuna basınız. </ListGroup.Item>
            </ListGroup>
      </div>;
    }
    else if(this.state.pageNumber >= 8 && this.state.pageNumber <= 22)
    {
      screen = <DilemmaPage number={this.state.pageNumber - 7} submited={this.submited} dilemma={this.state.dilemma[(this.state.pageNumber - 8) * 4]} dilemma2={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 1]} dilemma3={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 2]} dilemma4={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 3]}></DilemmaPage>;
      movement = null;
    }else if(this.state.pageNumber === 23)
    {
      screen = <div className="welcomeDilemma"><h4>Bölüm 4: Zihinsel Tepki Süresi Testi (6 dakika) </h4><br/>
      Bu bölümde karşınıza 3 kısa ve kolay soru çıkacak. Lütfen soruları dikkatli ve elinizden geldiği sürece hızlı yapınız. Eğer bu bölümü 6 dakikadan hızlı bitirirseniz, “enter” tuşuyla deneyi sonlandırabilirsiniz
      </div>;;
    }else if(this.state.pageNumber === 24)
    {
      screen = <CRT submited={this.submited}></CRT>;
      movement = null;
    }else if(this.state.pageNumber === 25)
    {
      screen = <div className="endmessage"><h1>Deneyimiz bitmiştir. Katılımınız için teşekkür ederiz.</h1> <p>Aklınıza takılan herhangi bir soru için tereddüt etmeden deneyi yürüten Irmak Oltay’ a mail atabilirsiniz. 
      </p> <p>Mail: oltayyirmak@gmail.com</p></div>;
      movement = null;
    }

    if(this.state.auth === true)
    {
          inside = 
        <div className="PageManager">
        {screen}
        
        {movement}
        </div>;
        
    }else if(this.state.auth === false)
    {
      inside =
      <div className="welcome"> 
      <Row width="100%">
      <Col xs={9}>
      <h1>Bilkent Deneysel Psikoloji Lisans Bitirme Projesi Araştırma Deneyine Hoş Geldiniz.</h1>
      <p className="p1">
      Bu deney katılımcıların gizlilik haklarını tamamen korumaktadır. Kullanıcı adınız ve cevapladığınız soruların sonuçları hiçbir şekilde üçüncü kişilerin ellerine geçmeyecektir. Ayrıca deneyi yürüten ve analizini yapan kişiler dahi kullanıcı adınızı bilemeyeceklerdir. Bu yüzden verdiğiniz cevapların size ait olduğunu kimse bilemeyecektir. Lütfen sorulara cevap verirken, gizliliğinizden emin olup, gerçek düşüncelerinizi yansıtan seçenekleri seçiniz.
      </p>  
      <p className="p2">Bu deneye sağlayacağınız gönüllü katılımınızdan dolayı, şimdiden teşekkür ederiz. 
      <br/>
Bilimle Kalın. 
</p>
      <p className="n1">
      Bu deney;
Irmak Oltay ve takım arkadaşlarının katkılarıyla hazırlanmıştır. 
      </p>
      </Col>


      <Col xs={3}>
      <Button variant="success" className="button1" onClick={this.login}>Giriş Yap</Button>
      <p className="p3">
      Lütfen şifrenizi istenilen alanlara girerek doldurunuz.Kullanıcı adı alanını, kendi seçtiğiniz bir ad ile doldurunuz. Bu şekilde girdiğiniz şifre, kendinizin belirlediği kullanıcı adıyla değişecektir ve verileriniz havuza gizli bir şekilde düşecektir. 
      </p>
<p className="p5">Giriş butonuna bastığınızda, deneyin "KULLANICI GİRİŞİ" ekranına yönlendirileceksiniz.
Teşekkürler. 
</p>
      

      </Col>
      </Row>

      </div>
    }

    return (
        <div className="mainDiv">
          {console.log(this.props.bt.enter)}
        {inside}
        </div>
    )
  }
}

export default withRouter(PageManager);