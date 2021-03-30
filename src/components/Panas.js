import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import axios from 'axios';
//CSS
import "../style/Panas.css";

class Panas extends Component{

    state = {
        selectedOption: 0,
        feelings: ["İlgili",
            "Sıkıntılı",
            "Heyecanlı",
            "Mutsuz",
            "Güçlü",
            "Suçlu",
            "Ürkmüş",
            "Düşmanca",
            "Hevesli",
            "Gururlu",
            "Asabi",
            "Uyanık",
            "Utanmış",
            "İlhamlı",
            "Sinirli",
            "Kararlı",
            "Dikkatli",
            "Tedirgin",
            "Aktif",
            "Korkmuş"
            ],
        situation: [
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true],
            [true,true,true,true,true]
        ],
        pageNumber: 1,
        token: ""
    }

    handleClick = (args) => {
        //console.log(args.row);
        //console.log(args.column);
        //clicked to row args[0] and answer args[2];
        let current_situation = this.state.situation;
        let line = [];
        
        for(let i = 0; i < 5; i++)
        {
            if(i == args.column)
            {
                line.push(false);
            }
            else
            {
                line.push(true);
            }
        }
        current_situation[args.row] = line; 
        //console.log(current_situation);
        this.setState({situation: current_situation});
    }

    componentDidMount(){
        this.setState({token: this.props.token });
    }

    control_filled = () => {
        let total = 0;
        for(let i = 0; i < this.state.feelings.length; i++)
        {
            for(let j = 0; j < 5; j++)
            {
                let element = this.state.situation[i][j];
                //console.log("element is: " + element);
                if(element == false)
                {
                    total++;
                }
            }
        }
        if(total === 20)
        {
            const data = {
                token: this.state.token,
                situation: this.state.situation
              };
    
              console.log(this.state.situation);
        
              axios.post(`https://congnitivee.herokuapp.com/sendPanas/`, data )
              .then(res => {
        
                console.log(res.data.situation);

              })
            let answer1 = "";
            this.props.submited(answer1);
        }else{
            
        }
        //console.log(total);

    }

    start = () => {
        this.setState({pageNumber: 2})
    }
      

    render(){

        const table = []

        let intro = null;
        

        for(let i = 0; i < this.state.feelings.length; i++)
        {
            var index={ row: i, column: 0 };
            var index2={ row: i, column: 1 };
            var index3={ row: i, column: 2 };
            var index4={ row: i, column: 3 };
            var index5={ row: i, column: 4 };
            table.push(<tr width="60%">
                    <td width="15%" textAlign="center">{this.state.feelings[i]}</td>
                    <td width="10%"><InputGroup.Prepend textAlign="center" ><InputGroup.Radio aria-label="Radio button for following text input" onChange={this.handleClick.bind(this, (index))} checked={!this.state.situation[i][0]}/> (1) </InputGroup.Prepend></td>
                    <td width="10%"><InputGroup.Prepend textAlign="center" className="col"><InputGroup.Radio className="radio" aria-label="Radio button for following text input" onChange={this.handleClick.bind(this, (index2))} checked={!this.state.situation[i][1]}/> (2) </InputGroup.Prepend></td>
                    <td width="10%"><InputGroup.Prepend textAlign="center" className="col"><InputGroup.Radio className="radio" aria-label="Radio button for following text input" onChange={this.handleClick.bind(this, (index3))} checked={!this.state.situation[i][2]}/> (3) </InputGroup.Prepend></td>
                    <td width="10%"><InputGroup.Prepend className="col"><InputGroup.Radio className="radio" aria-label="Radio button for following text input" onChange={this.handleClick.bind(this, (index4))} checked={!this.state.situation[i][3]}/> (4) </InputGroup.Prepend></td>
                    <td width="10%"><InputGroup.Prepend className="col"><InputGroup.Radio className="radio" aria-label="Radio button for following text input" onChange={this.handleClick.bind(this, (index5))} checked={!this.state.situation[i][4]}/> (5) </InputGroup.Prepend></td>
                </tr>)
        }

        let exp = <div className="Table">
        <h1>Genel Duygulanım Derecelendirmesi</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Geçen hafta hangi şekilde hissettiğinizi belirtin.</th>
                        <th>Gerçekten çok az yada hiç hissetmedim.</th>
                        <th>Çok az hissettim.</th>
                        <th>Ortalama hissettim.</th>
                        <th>Biraz fazla hissettim.</th>
                        <th>Baya yoğun ve fazla hissettim. </th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </Table>
            <tr width="40%">
                <td width="20%">
                <h4>Tüm Seçenekler Seçilmelidir</h4>
                </td>
                <td width="20%">
                <Button variant="success" width="100px" onClick={this.control_filled}>Tamamla</Button>
                </td>
            </tr>
        </div>;

        if(this.state.pageNumber === 1){
            intro = <div className="Intro">
            <h1>1. Bölüm: Genel Duygulanım Derecelendirmesi  </h1>
            <p>Lütfen bir sonraki sayfadaki tabloda yazan her duyguyu bu haftaki hissetme yoğunluğunuza ve oranınıza göre doldurunuz. </p>
            <ListGroup>
            <ListGroup.Item>1: Gerçekten çok az yada hiç hissetmedim.</ListGroup.Item>
            <ListGroup.Item>2: Çok az hissettim.</ListGroup.Item>
            <ListGroup.Item>3: Ortalama hissettim.</ListGroup.Item>
            <ListGroup.Item>4: Biraz fazla hissettim.</ListGroup.Item>
            <ListGroup.Item>5: Baya yoğun ve fazla hissettim. </ListGroup.Item>
            </ListGroup>
            <p className="i1">Not: Toplam 10 dakikanız vardır, önceden bitirirseniz aşağıdaki tamamla tuşuyla geçebilirsiniz. Tüm sorulara cevap vermeden bu tuşa basmanız işe yaramayacaktır. Lütfen tabloyu dikkatli bir şekilde ve gerçeği yansıtır şekilde doldurunuz. </p>
            <Button variant="success" className="start" onClick={this.start}>Başla</Button>
            </div>;
        }else if(this.state.pageNumber === 2)
        {
            intro = exp;
        }
        return(
            <div>
                {intro}
            </div>
            
        );
    }

}

export default Panas;

