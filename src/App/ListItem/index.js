import React, { Component } from 'react';
import { css } from 'react-emotion';
import moment from 'moment';

const listItem = css`
  display: flex;
  flex-direction: row;
`;

const image = css`
  width: 100px;
  height: 63px;
`;

const parseTimestamp = timestamp => {
  const timePublished = moment(timestamp, 'YYYY-MM-DD HH:mm');
  // mocking a time close to the publication dates
  // so sorting by submitted time will be more meaningful
  const mockCurrentTime = moment('2013-11-09 13:20:00', 'YYYY-MM-DD HH:mm');
  const diff = Math.abs(timePublished.diff(mockCurrentTime, 'minutes'));

  const parsedResult =
    diff > 60 ? `${Math.round(diff / 60)} hours` : `${diff} minutes`;
  return parsedResult;
};

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
        <span>{parseTimestamp(item.publish_at)} ago</span>
      </li>
    );
  }
}

export default ListItem;
