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

const Table = css`
  border-collapse: collapse;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allArticles: articles,
      articlesToLoad: articles.slice(0, 10),
      wordsSortOrder: localStorage.getItem('wordsSortOrder'),
      dateSortOrder: localStorage.getItem('dateSortOrder'),
    };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { allArticles, articlesToLoad } = this.state;

    if (articlesToLoad.length === allArticles.length) {
      const additionalArticles = await this.loadMore();
      this.setState({ allArticles: [...allArticles, ...additionalArticles] });
    } else {
      this.setState({
        articlesToLoad: allArticles.slice(0, articlesToLoad.length + 10),
      });
    }
  }

  loadMore = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/data/more-articles.json', true);

    return new Promise(function(resolve, reject) {
      request.onload = function() {
        debugger;
        if (this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.response));
        }
      };

      request.onerror = function(err) {
        console.error(err);
        // There was a connection error of some sort
      };

      request.send();
    });
  };

  sortByWords = () => {
    let sortOrder;
    //cloning to avoid mutating state, as sort mutates the array
    const sortedArticles = JSON.parse(
      JSON.stringify(this.state.articlesToLoad)
    ).sort((a, b) => {
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
    //cloning to avoid mutating state, as sort mutates the array
    const sortedArticles = JSON.parse(
      JSON.stringify(this.state.articlesToLoad)
    ).sort((a, b) => {
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
        <table className={Table}>
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
