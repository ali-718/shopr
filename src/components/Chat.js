import { DirectLine } from 'botframework-directlinejs';
import React from 'react';
//import ReactWebChat from 'botframework-webchat';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
 
export default class extends React.Component {
  constructor(props) {
    super(props);

    //const subscriptionKey = 'd7a157d6445848788b229cee8f130e5f';
    //this.webSpeechPonyfillFactory = new CognitiveServicesBingSpeechPonyfillFactory({ subscriptionKey });

    this.state = {
      directLine: null,
      webSpeechPonyfill: null
    };    
  }

  componentDidMount() {
    //this.fetchToken();
    this.setDirectLine();
    this.fetchSpeechPonyfill();
  }

  async fetchSpeechPonyfill() {
    this.setState({ webSpeechPonyfill: await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({ 
      subscriptionKey: 'd7a157d6445848788b229cee8f130e5f', region: 'westus', textNormalization: 'lexical' }) });
  }

  async setDirectLine() {
    //to load a specific conversation, add the following to the direct line
    // , conversationId: 'BxnJHcNz70AHxLkhJxm2n0-o', webSocket:false
    this.state.directLine = new DirectLine({ token: 'L-QtvwFPEbM.iIbv6FNOOJeydKbF_CGJSlQwKehRtIsQdmn8mlFMtLs' });
    const botConnection = this.state.directLine;

    botConnection.connectionStatus$.subscribe(function (connectionStatus){
      switch(connectionStatus){
          case 2:
              console.log("Conversation Id:" + botConnection.conversationId + " and watermark: " + botConnection.watermarkId);
      }
  });
  }

  async fetchToken() {
    const res = await fetch('https://shprotobot.azurewebsites.net/directline/token', { method: 'POST' });
    const { token } = await res.json();
    this.setState(() => ({
      directLine: createDirectLine({ token })
    }));
  }

  render() {
    return (
      this.state.directLine && this.state.webSpeechPonyfill?
      <div>
        <ReactWebChat 
          directLine={ this.state.directLine } 
          webSpeechPonyfillFactory={ this.state.webSpeechPonyfill } 
          username={this.props.user.email}
          />
      </div>
      :
      <div>Connecting to bot&hellip;</div>
    );
  }
}