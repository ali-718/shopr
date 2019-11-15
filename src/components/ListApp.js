import React, { Component } from 'react';
import firebase from '../firebase';
import StyledList from './styles/StyledList';
import ListItem from './ListItem';
import styled from 'styled-components';
import Delete from './images/delete.png';

const StyledDelete = styled.img`
  color: #f2385a;
  padding-bottom: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;

class ListApp extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      strikethrough: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //documentation here: https://firebase.google.com/docs/database/admin/retrieve-data
    const itemsRef = firebase.database().ref('items').orderByChild('user').equalTo(this.props.user.email);
    itemsRef.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user,
          tags: items[item].tags
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.props.user.email,
      tags: this.state.tags
    };
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: this.props.user.email,
      tags: ''
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div> 
        <StyledList>
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="tags"
                placeholder="Tags"
                onChange={this.handleChange}
                value={this.state.tags}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="List Item"
                onChange={this.handleChange}
                value={this.state.currentItem}
                required={true}
              />
              <p />
              <button>Add Item</button>
            </form>
          </section>
          <p></p>
          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <div>
                      <li key={item.id}>
                        <div className="items-div">
                          <ListItem message={item.title} />
                          <p className="display-item-p">added by: {item.user}</p>
                          <p className="display-item-p">tags: {item.tags}</p>
                        </div>
                        <StyledDelete
                          src={Delete}
                          onClick={() => this.removeItem(item.id)}
                          alt="delete item"
                        />
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </section>
        </StyledList>
      </div>
    );
  }
}

export default ListApp;
