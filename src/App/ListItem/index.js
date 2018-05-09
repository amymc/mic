import React, { Component } from 'react';

class ListItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li>
        <img src={item.image} alt="" />
        <h2>{item.title}</h2>
      </li>
    );
  }
}

export default ListItem;
