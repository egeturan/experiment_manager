import React, {Component} from 'react';
import './CRT.css';
import Row from 'react-bootstrap/Row';
import {
    Form,
    Segment,
    Button
  } from "semantic-ui-react";

class CRT extends Component{

    state = {
        answer1: "",
        answer2: "",
        answer3: "",
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
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : "";
    };

    controlInputs = () => {
        let { answer1, answer2, answer3, errors, loading } = this.state;
        if(answer1 === "" || answer2 === "" || answer3 === "")
        {
            alert("Tüm kutuları doldurunuz.");
        }else
        {
            this.props.submited(answer1);
            alert("Deney Başarılı bir şekilde tamamlandı");
        }
        console.log(answer1);
        console.log(answer2);
        console.log(answer3);
    }

    render(){

        const { answer1, answer2, answer3, errors, loading } = this.state;

        return(
            <div>
                    <h1>Zihinsel Tepki Testi </h1>
                    
                    <Form onSubmit={this.handleSubmit} size="small">
                        <Segment stacked>
                        <Form inline className="forminput">   
                        Bir değnek ve bir top toplamda 1.10 TL ediyor. Bir değnek bir toptan 1TL daha değerli olduğuna göre,
                        Topun fiyatı ne kadardır? (sayı giriniz)
                        <Form.Input
                            inline
                            name="answer1"
                            placeholder="     "
                            onChange={this.handleChange}
                            value={answer1}
                            type="text"
                        /> TL

                        </Form>   
                        <Form inline className="forminput">

                        Eğer 5 makinanın 5 araç yapması 5 dakika sürüyorsa, 100 makinanın 100 araç yapması ne kadar sürer?
                        <Form.Input
                            inline
                            name="answer2"
                            placeholder="     "
                            onChange={this.handleChange}
                            value={answer2}
                            type="text"
                        /> dakika

                        </Form>

                        <Form inline className="forminput">
                        Gölde bir nilüfer yaprağı parçaları var. Hergün yaprak parçalarının sayısı iki katına çıkıyor.
                        Eğer nilüfer yapraklarının tüm gölü kaplaması 48 gün sürüyorsa, yaprakların gölün yarısını kaplaması kaç gün sürer?
                        <Form.Input
                            inline
                            name="answer3"
                            placeholder="     "
                            onChange={this.handleChange}
                            value={answer3}
                            className="forminput"
                            type="username"
                        /> gün

                        </Form>

                        <Button
                            disabled={loading}
                            className={loading ? "loading" : ""}
                            color="violet"
                            fluid
                            size="large"
                            style={{marginTop: "4%", width: "10%", float:"right"}}
                            onClick={this.controlInputs}
                        >
                            Submit
                        </Button>
            
                        </Segment>
                    </Form>
                
            </div>
        );
    }

}

export default CRT;