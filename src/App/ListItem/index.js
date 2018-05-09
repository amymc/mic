import React, { Component } from 'react';
import { css } from 'react-emotion';

const listItem = css`
  display: flex;
  flex-direction: row;
`;

const image = css`
  width: 100px;
  height: 63px;
`;

class ListItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <li className={listItem}>
        <img className={image} src={item.image} alt="" />
        <h2>{item.title}</h2>
        <span>
          {item.first_name} {item.last_name}
        </span>
        <span>{item.words}</span>
        <span>{item.publish_at}</span>
      </li>
    );
  }
}

export default ListItem;
