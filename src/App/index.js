import React, { Component } from 'react';
import moment from 'moment';
import Header from './Header';
import List from './List';
import articles from '../data/articles.json';
import { css } from 'react-emotion';

const Base = css`
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  state = {
    allArticles: articles,
    articlesToLoad: articles.slice(0, 10),
    wordsSortOrder: localStorage.getItem('wordsSortOrder'),
    dateSortOrder: localStorage.getItem('dateSortOrder'),
  };

  onClick = () => {
    const { allArticles, articlesToLoad } = this.state;
    this.loadMore();

    if (articlesToLoad.length === allArticles.length) {
      this.loadMore();
    } else {
      this.setState({
        articlesToLoad: allArticles.slice(0, articlesToLoad.length + 10),
      });
    }
  };

  loadMore = () => {};

  sortByWords = () => {
    let sortOrder;
    // anti-pattern??
    const sortedArticles = this.state.articlesToLoad.sort((a, b) => {
      if (this.state.wordsSortOrder === 'ascending') {
        sortOrder = 'descending';
        return b.words - a.words;
      }

      sortOrder = 'ascending';
      return a.words - b.words;
    });
    this.setState({
      articlesToLoad: sortedArticles,
      wordsSortOrder: sortOrder,
    });
    localStorage.setItem('wordsSortOrder', sortOrder);
  };

  sortByDate = () => {
    let sortOrder;
    const sortedArticles = this.state.articlesToLoad.sort((a, b) => {
      if (this.state.dateSortOrder === 'ascending') {
        sortOrder = 'descending';
        return (
          moment(b.publish_at).format('X') - moment(a.publish_at).format('X')
        );
      }

      sortOrder = 'ascending';
      return (
        moment(a.publish_at).format('X') - moment(b.publish_at).format('X')
      );
    });
    this.setState({ articlesToLoad: sortedArticles, dateSortOrder: sortOrder });
    localStorage.setItem('dateSortOrder', sortOrder);
  };

  render() {
    return (
      <div className={Base}>
        <table>
          <thead>
            <Header
              sortByWords={this.sortByWords}
              sortByDate={this.sortByDate}
            />
          </thead>
          <List articles={this.state.articlesToLoad} />
        </table>
        <button onClick={this.onClick}> Show more...</button>
      </div>
    );
  }
}

export default App;
