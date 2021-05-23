import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from 'react-bootstrap/Button';

class ReactCopy extends React.Component {
  state = {
    value: '',
    copied: false,
  };

  componentDidMount(){
      console.log(this.props)
      this.setState({value: this.props.key})
  }

  render() {
    return (
      <div>
        <input value={this.state.value}
          onChange={({target: {value}}) => this.setState({value, copied: false})} />

        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({copied: true})}>
          <Button variant="outline-success"><p className="buttonTextCopy">Şifreyi Kopyala</p></Button>
        </CopyToClipboard>

        {this.state.copied ? <span style={{color: 'red'}}>Kopyalandı</span> : null}
      </div>
    );
  }
}

export default ReactCopy;