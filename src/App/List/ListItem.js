import React, { Component } from 'react';
import { css } from 'react-emotion';
import moment from 'moment';

const Base = css`
  display: flex;
  flex-direction: row;
`;

const Image = css`
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
      <tr className={Base}>
        <td>
          <img className={Image} src={item.image} alt="" />
        </td>
        <td>{item.title}</td>
        <td>
          {item.first_name}
          {item.last_name}
        </td>
        <td>{item.words}</td>
        <td>{parseTimestamp(item.publish_at)}ago</td>
      </tr>
    );
  }
}

export default ListItem;
