import React from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DilemmaPage from './components/DilemmaPage';
import StroopTask from './components/StroopTask';
import UserInfo from './components/UserInfo';
import PlayClassicSound from './Music/PlayClassicSound';
import PlayElectronicSound from './Music/PlayElectronicSound';
import Panas from './components/Panas';
import CRT from './components/CRT';
import {withRouter} from 'react-router';
import PlayElectronicSound2 from './Music/PlayElectronicSound2';
import PlayClassicSound2 from './Music/PlayClassicSound2';
import ButtonImage from'./assets/buttons.png';
import Sample1 from'./assets/sampl1.jpg';
import Sample2 from'./assets/sample1.jpg';
import Bilkent from'./assets/bilkent.png';
import axios from 'axios';

//CSS
import './style/PageManager.css';
import DilemmaExceptional from './components/DilemmaExceptional';

class PageManager extends React.Component {
  
  state = {
    auth: false,
    pageNumber: 0,
    timer: {h: 0, m: 0, s: 0},
    userName: "default",
    token: "111111",
    musictype: 1,
    dilemmaCounter: 0,
    dilemma: ["Zeynep 5 yıldır Kadri ile beraberdir. Her ilişki gibi onlarınki de zaman zaman zorlaşmaktadır. Zeynep bu ilişkide olmaktan genel olarak mutludur ve bu ilişkiyi sürdürmek istemektedir. Kadri de Zeynep’i sevmektedir ve onunla evlenmek istemektedir.",
    "Zeynep bir gün kendi bilgisayarından maillerine bakarken, Kadri’nin hesabının açık olduğunu görür. Özellikle bir mail Zeynep’in dikkatini çeker. Zeynep bu maili açtığında, erkek arkadaşı ile ilgili daha önce bilmediği bir bilgi öğrenir. Kadri’nin bir önceki partneri bir kadın değil, erkektir. Zeynep bu bilgi sonrasında şaşkınlık ve kafa karışıklığı içinde Kadri’yi terk eder. Zeynep'in Kadri'yi terketmesini nasıl değerlendirirsiniz ?",
    "",
    "Kimin maili açıktır?",  

    "Bulut 9 aydır işsizdir ve biriktirdiği bütün parasını bitirmiştir. Pek de geniş olmayan bir apartman dairesinde yaşamaktadır. Ayrıca hayvanları da çok seven Bulut, bir köpek ve iki balık beslemektedir.",
      "Bütün erzakları tükenen Bulut, artık yemek için para bulamaz hale gelir. Sonraki üç gün de aç kalınca, evcil balıklarını yemeye karar verir. Beslediği iki balığı tıpkı marketten alınmış bir balık gibi temizleyip pişirir. Birini kendisine, diğerini köpeğine servis eder.",
      "",
      "Bulut ikinci balığı kime servis etti?",

      "Alaska’da bir gölde, rehberli kayık gezisindesin. Yakında başka bir kayıktan üç çocuk göle düşmüş durumda ve donarak ölmek üzereler. Yanlarına gidip iki çocuğu kayığınıza aldıktan sonra, üçüncü çocuğu almanın kayığı batırıp hepinizi öldüreceğini fark ettin. Ne sen, ne de rehber kayıktan atlayabilir; çünkü sen kürek çekiyorsun, rehber de çocuklardan birine kalp masajı yapıyor.",
      "İki çocukla beraber kıyıya doğru gidersen, kayık batmayacak. Ancak geride kalan çocuk ölecek, diğer ikisini kurtaracaksın.",
      "Üçüncü çocuğu geride bırakıp kıyıya dönüp diğer iki çocuğu kurtaracak mısın?",
      "Kayık gezisi nerede geçmektedir? ",

      "Düşman askerleri köyünüzü ele geçirdi. Tüm yetişkinleri hayatta bırakıp tüm çocukları öldürme emri aldılar. Kalabalık bir çocuk grubuyla birlikte büyük bir evin bodrumuna sığındınız. Dışardan, değerli eşya arayışında eve yaklaşan askerlerin sesini duyuyorsunuz. Çocuklardan biri, öksüz bir bebek, yüksek sesle ağlamaya başlıyor. Sesi kesmek için ağzını kapatıyorsun. Eğer elini elini bebeğin ağzından çekersen bebeğin ağlaması askerlerin dikkatini çekecek ve tüm çocukları öldürecekler fakat seni hayatta bırakacaklar. Diğer çocukları kurtarmak için öksüz çocuğu boğman gerekecek. ",
      "",
      "",
      "",
      
      "Barış bir haftalık İstanbul seyahati için AirBnB uygulamasından bir daire kiralar. AirBnB uygulaması ile insanlar kendi evlerini içindeki eşyalarla birlikte başkalarına kiraya verebilirler. Ev sahipleri ayrıca, kiracının eşyaları için de uygun alan yaratırlar.",
      "Barış kiraladığı eve giriş yaptıktan sonra, dairenin sahibinin nasıl biri olduğunu merak eder. Etrafı biraz gezince, gizemli bir sandık bulur. Üzerindeki örtüyü kaldırınca, sandığın kilitli olduğunu görür. Sandığı açmaması gerektiğini anlar, bu sırada mutfakta bu kilide uyabilecek bir anahtar gördüğünü anımsar. Kilidi o anahtarla açmayı dener ve kilit açılır. Sandığın içinden sadece eski kitaplar çıkar.",
      "",
      "Barış’ın kullandığı uygulamanın adı ne? ",

      "Bir kreşin öğrencilerini hayvanat bahçesine geziye götüren otobüsün sürücüsüsün. Gidişte lastiklerde çıkan bir sorun otobüsü yoldan çıkarıp hızlı akıntılı bir nehre düşürüyor. Batmakta olan otobüste sen ve çocuklardan üçü kaldınız. İki çocuğu tek kolunla tutup yüzerek otobüsten çıkmaya çalışıyorsun ve geride kalan çocuk bacağına sarılıyor. Akıntıya karşı üç çocukla yüzecek kadar güçlü olmadığını hissediyorsun.",
      "Bacağından tutan çocuğu silkelersen iki çocukla birlikte otobüsten çıkabileceksiniz, ancak geride kalan çocuk boğulacak. Bir çocuk ölecek, ancak iki çocuk ve sen kurtulacaksınız.",
      "Diğer iki çocukla beraber yüzerek kurtulmak için üçüncü çocuğu geride bırakacak mısın?",
      "Çocuklar kaçıncı sınıfta okuyorlar? ",

      "Oktay ve Ege beraber yaşayan iki kardeştirler. Oktay’ın kız arkadaşına bir hediye almak için paraya ihtiyacı vardır. Oktay’ın kız arkadaşının doğum günü, aylık harçlığını aldığı günden bir gün öncedir.",
      "Hal böyleyken Oktay, parayı kardeşi Ege’den alabileceğini düşünür. Ancak Ege evde değildir. Kardeşi de olsa kimseden para istemeyi sevmeyen Oktay, ertesi gün parası gelince yerine koyacağını düşünerek kardeşinin odasından 1000 lira alır. Bu parayla kız arkadaşına hediye alır, ve kardeşinin haberi olmadan ertesi gün kendi harçlığından aynı miktarı yerine koyar.",
      "",
      "Oktay kardeşinden ne kadar para almıştır? ",

      "Esra ve Murat üniversite öğrencisi birinci dereceden iki kuzendirler. Bir yaz tatili sırasında Fransa’da tatildedirler. Bir geceyi sahil kenarında bir kulübede geçirirler. Bu şartlar altında sevişmek ikisine de ilginç ve eğlenceli bir fikir gibi görünmektedir. İkisi içinde en azından yeni bir deneyim olacaktır. Esra zaten doğum kontrol hapı kullanmaktadır ve Murat yine de prezervatifle korunmaktadır. İkisi de sevişmekten zevk alırlar, ama tekrarlamamak konusunda anlaşırlar. Bu geceyi aralarında bir sır olarak saklar ve birbirlerine daha yakın hissederek hayatlarına devam ederler.",
      "",
      "",
      "Kuzenler nereye seyahat etmiştir? ",

      "Bir kadın evini temizlerken eski [Türk] bayrağını bulur. Bayrağı artık istemediğinden kesip, onu temizlik bezi olarak tuvaleti temizlemek için kullanır. (Kadın ülkesini sever.)",
      "",
      "",
      "Kadın evin neresini temizler? ",

      "Ölüm döşeğinde bir kadın, oğlundan ona mezarını her hafta ziyaret edeceğine dair söz vermesini ister. Oğlu annesini çok sever ve bu konuda annesine istediği sözü verir. Ancak annesi öldükten sonra, oğlu çok meşgul olduğundan bu sözü tutamaz.",
      "",
      "",
      "Çocuk annesine ne söz verir? ",

      "Afrika kırsalında bir köyde gönüllü bir Barış Gücü sağlıkçısısın. Komşu köylerden birinden bir adam, son derece bulaşıcı, tedavisi olmayan ve çoğu zaman ölümcül olan Ebola virüsüne yakalanmış. Şaşırtıcı şekilde hala hayatta. Bu, virüse karşı bağışıklık kazanmış demek olabilir. Fakat bu adam senin sağlık merkezine gelip hastalıktan tamamen kurtulabileceğini düşünüyor. Adamın köye yaklaştığını görüyorsun ve köye girerse bu virüsü, 119 masum ve bağışıklığı olmayan insana bulaştıracağını ve onların ölümüne sebep olacağını biliyorsun",
      "Köy konseyine haber verirsen adamı vurup sana ve köyün diğer sakinlerine virüs bulaştırmasını engelleyecekler. Adam ölecek, ancak 119 sakin ve sen kurtulacaksınız.",
      "Köy konserine haber verip adamı vurdurarak virüsü sana ve 119 sakine bulaştırmasını engelleyecek misin?",
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
      "Bu hikayedeki hayvanın türü nedir? ",

      "6 çocuklu ve annenin çalışmasına olanak olmayan, dolayısıyla babanın kazandığı parayla geçinen bir aile var. Bir gün, aile babası sokakta eve doğru yürürken, A isimli bir adam, onu takip etmeye başlar ve aile babasının her gece onu öldürmeye çalıştığını iddia eder. Sonrasında, A kişisi, aile babasının onu öldürmek için takip eden bir katil olduğunu düşünerek aile babasını öldürür. Aile babasını öldüren bu adama şizofren teşhisi konur ve akıl hastanesine gönderilir. Aile, annenin çalışamaz oluşundan dolayı ciddi bir çıkmaza girer, yemek veya diğer temel ihtiyaçlarını karşılayamaz duruma gelir.",
      "A kişisi, aslında adamın onu takip etmek gibi bir niyeti olmadığını kavradığında acı çeker ve pişman olur, tüm parasını ölen adamın ailesine bağışlar. Öncesinde, anne bu kanlı parayı kabul etmez fakat sonrasında adamı akıl hastanesinde ziyarete gider. Daha sonra parayı kabul eder ve sık sık A kişisini ziyarete gider. Bir süre sonra, A kişisinin ciddi akıl sağlığı sorunları olmasına rağmen gerçekten iyi bir insan olduğuna inanır ve ona aşık olur.",
      "",
      "Babalarını öldüren adamın hasalığı nedir?",

      "Büşra başarılı bir yüzücü ve uzun zamandır milli takıma girmesini sağlayacak bir yarışmaya hazırlanıyor. Bu onun hayatındaki en önemli yarışma, ve 10 dakika içinde başlayacak. Profesyonel yüzücüler için tasarlanmış, giyilmesi 20 dakika süren özel bir mayoyu çoktan giymiş ve yarışma sırasında bekliyor. Bu yüzden de yarışmadan önce son kez tuvalete gitmesi demek yarışı kaçırabileceği anlamına geliyor.",
      "Büşra yarışma stresini üzerinden atmak için rahatlamak zorunda hisseder ve bunun yolu da tuvaletini yapmaktan geçmektedir. Büşra bu yarışı kaçırmamak için havuzun kenarına oturur ve devridaim giderinin tam üzerine tuvaletini yapar. Böylelikle havuzu kirletmeden işin içinden çıkabileceğini düşünür.",
      "",
      "Büşra’nın yaptığı spor nedir?"
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
    if(this.props.history.location.state !== undefined)
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

  visitedHome = (args) => 
  {
    axios.get(`https://cognitivee.herokuapp.com/site_visited/`)
      .then(res => {
        if(res.data.situation === 1)
        {
            console.log(res.data.visited);
        }
        else
        {
            alert('error');
        }
      })
  }

  render() {
    let screen = null;
    let dilemma = null;
    let inside = null;

    let movement = <div className="buttons">
    <Button variant="success" className="button2" onClick={this.nextPage}><p className="p2">Deneye Başla</p></Button>
    </div>;
    if(this.state.pageNumber === 0){
      screen = <div><h2>Giriş: Duygu, Biliş ve Ahlaki Karar Üzerine Bilişsel Yaklaşım Deneyine Hoşgeldiniz.  </h2>
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
       </p>
       <p className="Intro">
       Her bölümden sonra gelecek bölümün talimatları tekrardan ekranda belirecektir. Lütfen her bölümden sonra talimatları tekrar okuyunuz ve talimatlara göre bir sonraki bölümü yapmaya başlayınız. <br/>
       <br/>
       Her bölümün zaman limiti önceden yukarıdaki bilgilere uygun bir şekilde ayarlanmıştır. Müzik aralarından sonra başlayacak bölümün bilgilendirme sayfasına otamatik olarak yönlendirileceksiniz. Talimatları okuma sırasında her hangi bir zaman kısıtlaması olmaksızın, istediğiniz zaman bir sonraki bölüme geçebilirsiniz. <br/>
       <br/>
       Lütfen kulaklıklarınızı deney başlamadan önce ayarlayınız. Müziklerin daha dikkatli dinlenebilmesi için, lütfen müziği kulaklıklarınızla dinleyiniz. <br/>
       <br/>
       (ÖNEMLİ: DENEY SIRASINDA TELEFONUNUZU KAPATINIZ.)
       <br/>
       (ÖNEMLİ: TAM EKRANDAN KLAVYENİZİN "ESC" TUŞUNA BASARAK ÇIKABİLİRSİNİZ.)
       <br/>
       Teşekkürler.
       </p>
     {/*<Timer val="ege" timeUpdate={this.updateTime}></Timer>{<h1>Time: h: {this.state.timer.h} m: {this.state.timer.m} s: {this.state.timer.s}*/}
         </div>;
    }
    if(this.state.pageNumber === 1)
    {
        screen = <UserInfo submited={this.submited} token={this.state.token}></UserInfo>;
        //movement = null;
    }
    else if(this.state.pageNumber === 2)
    {
      screen = <div><Panas submited={this.submited} token={this.state.token}></Panas>
      </div>;
      //movement = null;
    }
    else if(this.state.pageNumber === 3 && this.state.musictype === 1)
    {
      screen = <div><PlayElectronicSound submited={this.submited}></PlayElectronicSound></div>;
      //movement = null;
    }else if(this.state.pageNumber === 3 && this.state.musictype === 2)
    {
      screen = <div><PlayClassicSound submited={this.submited}></PlayClassicSound></div>;
     // movement = null;
    }
    else if(this.state.pageNumber === 4)
    {
      screen = <div>
        <div className="IntroStroop">
            <h1>2. Bölüm: Dikkat Deneyi – Renk ve Kelime Karşıtlığı (10 dakika) </h1>
            <ListGroup>
            <ListGroup.Item>Bu bölümde karşınıza 6 adet renk kelimesi çıkacaktır. </ListGroup.Item>
            <ListGroup.Item>Karşınıza çıkacak renkler: <b>Kırmızı, Turuncu, Sarı, Yeşil, Mavi, Mor</b></ListGroup.Item>
            <ListGroup.Item>Bu sayıların yazılı olduğu kelimelerin rengi bazen <b>“YAZAN RENKTEN”</b> <b>FARKLI</b> ya da <b>AYNI</b> olacaktır.</ListGroup.Item>
            <ListGroup.Item>Sizden istediğimiz gelen kelimenin ifade ettiği rengi şeçmeniz değil, yazının asıl rengine göre ( <b>YAZININ ANLAMI DEĞİL, RENGİ</b>) aşağıda belirecek olan iki seçenekten uygun olanı seçmeniz. </ListGroup.Item>
            <ListGroup.Item>Bu deney “DİKKAT” deneyi olduğundan dolayı gelen uyaranlara <b>(yani yenilenen renkler)</b> elinizden geldiğince hızlı cevap veriniz. Verilerin daha doğru sonuç vermesi için parmağınızı hızlı bir şekilde basıp çekmeniz gerekmektedir. <b>(Basılı tutmayınız)</b>  </ListGroup.Item>
            <ListGroup.Item>Bu bir dikkat deneyi olduğu için size zor gelmesi demek herkese zor gelmesi demektir. Hatalarınızdan dolayı moralinizi bozmadan deneye devam ediniz. </ListGroup.Item>
            <ListGroup.Item>Cevap vermek için <b>“SAĞ VE SOL YÖN OK TUŞLARI”</b> nı kullanınız.  <img  src={ButtonImage} alt="fireSpot"/> </ListGroup.Item>
            <ListGroup.Item>Testi Başlat butonuna bastıktan sonra karşınıza çıkacak olan yeni sayfayı "Tam Ekranı Aç" butonuna(Sağ Üstte) deney başlamadan önce tıklayınız. Deneye başlamadan önce 15 saniye geri sayım olacaktır. </ListGroup.Item>
            <h1 className="n4">ÖRNEK</h1>
            <Row className="row">
              <Col>
              <h2>Doğru cevap: Sarı	</h2>
              <img  src={Sample1} alt="yellow"/>
              </Col>

              <Col>
              <h2>Doğru cevap: Turuncu</h2>
              <img  src={Sample2} alt="orange"/>
              </Col>
            </Row>
            </ListGroup>
            <Button variant="success" className="button12" onClick={this.nextPage}>Testi Başlat</Button>
            </div>;
      </div>;
      //movement = null;
    }
    else if(this.state.pageNumber === 5)
    {
      screen = <div className="StroopTask"><h1>Biliş Dikkat Testi</h1><StroopTask className="stroop" submited={this.submited}  token={this.state.token}></StroopTask></div>;
      //movement = null;
    }
    else if(this.state.pageNumber === 6 && this.state.musictype === 1)
    {
      screen = <div><PlayElectronicSound2 submited={this.submited}></PlayElectronicSound2></div>;
      //movement = null;
    }else if(this.state.pageNumber === 6 && this.state.musictype === 2)
    {
      screen = <div><PlayClassicSound2 submited={this.submited}></PlayClassicSound2></div>;
      //movement = null;
    }
    else if(this.state.pageNumber === 7)
    {
      screen = <div className="welcomeDilemma">
        <h1>Bölüm 3: İkilem Yargı Soruları </h1>
        <ListGroup>
            <ListGroup.Item>Bu bölümde karşınıza toplamda 15 adet kısa hikaye çıkacaktır; </ListGroup.Item>
            <ListGroup.Item>11 adet kısa hikaye: Her hikayeyi okuduktan sonra, karşılaştığınız durumlarla ilgili hislerinizi yargılamanız istencektir. Bu yargılarınızı yedi “7” basamaklı bir puanlama sistemi ile göstereceksiniz. </ListGroup.Item>
            <ListGroup.Item> <b>1- Kesinlikle kabul edilemez / 7- Kesinlikle kabul edilir.</b></ListGroup.Item>
            <ListGroup.Item>1 ile 7 arasındaki sayıları kabul edilebilirlik ve edilemeyebilirlik arasındaki düşünce ve hissetme yoğunluğunuza göre seçiniz. </ListGroup.Item>
            <ListGroup.Item>4 adet kısa hikaye: Bu hikayelerin iki seçeneği olacaktır, lütfen bir seçeneği işaretleyiniz. </ListGroup.Item>
            <ListGroup.Item>Sorular karşınıza karışık bir şekilde çıkacaktır. </ListGroup.Item>
            <ListGroup.Item><b>Not: </b> Her soru için toplam 2 dakikanız vardır, eğer iki dakikadan önce işaretleme yaparsanız "Devam Et" butonuya bir sonraki soruya geçiniz. Soruyu boş bırakmanız durumunda bu butona basmanız işe yaramayacaktır. </ListGroup.Item>
            <ListGroup.Item>Hazır olduğunuzda "Devam" butonuna basınız. </ListGroup.Item>
            </ListGroup>
      </div>;
      //movement = <Button variant="success" className="button12" onClick={this.nextPage}><p className="p2">Devam</p></Button>
    }
    else if(this.state.pageNumber >= 8 && this.state.pageNumber <= 24)
    {
      if(this.state.pageNumber === 23)
      {
        screen = <div><DilemmaExceptional number={this.state.pageNumber - 7} submited={this.submited} dilemma={this.state.dilemma[(this.state.pageNumber - 8) * 4]} dilemma2={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 1]} dilemma3={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 2]} dilemma4={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 3]} token={this.state.token}></DilemmaExceptional></div>;
        dilemma = null;
      }
      else
      {
        if(this.state.pageNumber % 2 === 0){
          screen = <div><DilemmaPage number={this.state.pageNumber - 7} submited={this.submited} dilemma={this.state.dilemma[(this.state.pageNumber - 8) * 4]} dilemma2={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 1]} dilemma3={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 2]} dilemma4={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 3]} token={this.state.token}></DilemmaPage></div>;
          dilemma = null;
        }else{
          screen = null;
          dilemma = <div><DilemmaPage number={this.state.pageNumber - 7} submited={this.submited} dilemma={this.state.dilemma[(this.state.pageNumber - 8) * 4]} dilemma2={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 1]} dilemma3={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 2]} dilemma4={this.state.dilemma[(this.state.pageNumber - 8) * 4 + 3]} token={this.state.token}></DilemmaPage></div>;
        }
      }

     //movement = null;
    }else if(this.state.pageNumber === 25)
    {
      dilemma = null;
      screen = <div className="welcomeDilemma"><h1>Bölüm 4: Zihinsel Tepki Süresi Testi (6 dakika) </h1><br/>
      Bu bölümde karşınıza 3 kısa ve kolay soru çıkacak. Lütfen soruları dikkatli ve elinizden geldiği sürece hızlı yapınız. Eğer bu bölümü 6 dakikadan hızlı bitirirseniz, "Deneyi Bitir" butonuna basarak deneyi sonlandırabilirsiniz
      </div>;
    }else if(this.state.pageNumber === 26)
    {
      screen = <CRT submited={this.submited} token={this.state.token}></CRT>;
      //movement = null;
    }else if(this.state.pageNumber === 27)
    {
      screen = <div className="endmessage"><h1>Deneyimiz bitmiştir. Katılımınız için teşekkür ederiz.</h1> <p>Aklınıza takılan herhangi bir soru için tereddüt etmeden deneyi yürüten Irmak Oltay’ a mail atabilirsiniz. 
      </p> <p>Mail: oltayyirmak@gmail.com</p></div>;
      //movement = null;
    }

    if(this.state.auth === true)
    {
        inside = 
        <div className="PageManager">
        {screen}
        {dilemma}
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
      Bu deney; Irmak Oltay tarafından hazırlanmış, Ege Turan tarafından yazılımı geliştirilmiş ve Professor Ausaf Ahmed Farooqui danışmanlığında hazırlanmıştır. 
      </p>
      <p className="n1">
      </p>
      </Col>
      <Col xs={3}>
      <img  src={Bilkent} width="40%" alt="bilkent"/>
      <br/>
      <Button variant="success" className="buttonLogin" onClick={this.login}>Giriş Yap</Button>
      <p className="p3">
      Lütfen şifrenizi istenilen alanlara girerek doldurunuz.Kullanıcı adı alanını, kendi seçtiğiniz bir ad ile doldurunuz. Bu şekilde girdiğiniz şifre, kendinizin belirlediği kullanıcı adıyla değişecektir ve verileriniz havuza gizli bir şekilde düşecektir. 
      </p>
      <p className="p5">Giriş butonuna bastığınızda, deneyin "KULLANICI GİRİŞİ" ekranına yönlendirileceksiniz.
      Teşekkürler. 
      </p>
      {this.visitedHome()}
      </Col>
      </Row>
      </div>;
    }

    return (
        <div className="mainDiv">
        {inside}
        </div>
    )
  }
}

export default withRouter(PageManager);