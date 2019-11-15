
import React, { Component } from "react";
import Wallet from '../Wallet';
import firebase from '../../firebase';
import styled from 'styled-components';
import Delete from '../images/delete.png';

/**
 * TODO
 * pass in onChange for all credit card pieces
 * SSL
 * fix style
 * 
 */
 
const StyledDelete = styled.img`
color: #f2385a;
padding-bottom: 0.5rem;
clear: all;

:hover {
  cursor: pointer;
}
`;

export default class Payments extends Component {
    constructor() {
        super();
        this.state = {
            cardNumber: '',
            expiryDate: '',
            items: [],
            cvc: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.name);
        console.log(e.target.value);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('cards');
        const item = {
          cardNumber: this.state.cardNumber,
          expiryDate: this.state.expiryDate,
          cvc: this.state.cvc
        };
        itemsRef.push(item);
        this.setState({
            cardNumber: '',
            expiryDate: '',
            cvc: ''
        });
      }      

      componentDidMount() {
        const itemsRef = firebase.database().ref('cards');
        itemsRef.on('value', snapshot => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              cardNumber: items[item].cardNumber,
              cardExpiry: items[item].expiryDate,
              cardCCV: items[item].cvc
            });
          }
          this.setState({
            items: newState
          });
        });
      }      

      removeItem(itemId) {
        const itemRef = firebase.database().ref(`/cards/${itemId}`);
        itemRef.remove();
      }

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <Wallet changeFunction={
                    this.handleChange
                } />
                <button>Add Payment Method</button>
            </form>
            <br/>

            {this.state.items.map(item => {
                return (
                <div>
                    <Wallet 
                        initialCardNumber={item.cardNumber} 
                        initialCardExpiry={item.cardExpiry} 
                        initialCVC={item.cardCCV} />
                        <StyledDelete
                          src={Delete}
                          onClick={() => this.removeItem(item.id)}
                          alt="delete item"
                        />
                </div>
                );
            })}
        </div>
    );
  }
}