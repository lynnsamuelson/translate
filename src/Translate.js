import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './Translate.css';
const axios = require('axios');

  class Translate extends Component {
    constructor(props) {
      super(props)
  
      this.initialState = {
        text: '',
        translatedText: '',
      }
  
      this.state = this.initialState
    }

    handleChange = event => {
      const { name, value } = event.target
    
      this.setState({
        [name]: value,
      })
    }

    render() {
      return (
        <div className="Translate">
          <header className="App-header">
            <h3>Please enter text to translate.</h3>
            <textarea id="toTranslate" defaultValue={this.state.text}  onChange={this.handleChange} ></textarea>
            <div>
              <input type="button" className="button" value="Translate" onClick={this.handleSubmit} />  
            </div>
            <p>Translation</p>
            <p className="translatedText">{this.state.translatedText}</p>        
          </header>
        </div>
      )
    };

    handleSubmit = text => {
      this.translateText(this.state.text)
    }

    handleChange = event =>{
      this.setState({text: event.target.value});
    }

    translateText = textToTranslate => {
      const options = {
        method: 'post',
        url: 'http://localhost:3001/translate',
        data: {"text": [textToTranslate], "model_id":"en-es"}
      };
      
      axios(options)
      .then(response => {
          this.updateTranlatedText(response.data[0].translation);
      })
      .catch(error => {
        console.log("error", error);
      });
    }

    updateTranlatedText = text => {
      this.setState({translatedText: text})
    }
  }

export default Translate;