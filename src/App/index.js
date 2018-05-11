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
      articlesToDisplay: articles.slice(0, 10),
      hasLoadedExternals: false,
      wordsSortOrder: localStorage.getItem('wordsSortOrder'),
      dateSortOrder: localStorage.getItem('dateSortOrder'),
      shouldShowBtn: true,
    };
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { allArticles, articlesToDisplay, hasLoadedExternals } = this.state;
    const numToLoad = 10;

    if (articlesToDisplay.length === allArticles.length) {
      const externalArticles = await this.loadMore();
      debugger;
      this.setState({
        allArticles: [...allArticles, ...externalArticles],
        articlesToDisplay: [...allArticles, ...externalArticles].slice(
          0,
          articlesToDisplay.length + numToLoad
        ),
        hasLoadedExternals: true,
      });
    } else if (
      articlesToDisplay.length === allArticles.length - numToLoad &&
      hasLoadedExternals
    ) {
      this.setState({
        articlesToDisplay: allArticles.slice(
          0,
          articlesToDisplay.length + numToLoad
        ),
        shouldShowBtn: false,
      });
    } else {
      this.setState({
        articlesToDisplay: allArticles.slice(
          0,
          articlesToDisplay.length + numToLoad
        ),
      });
    }
  }

  loadMore = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/data/more-articles.json', true);

    return new Promise(function(resolve, reject) {
      request.onload = function() {
        // debugger;
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
      JSON.stringify(this.state.articlesToDisplay)
    ).sort((a, b) => {
      if (this.state.wordsSortOrder === 'ascending') {
        sortOrder = 'descending';
        return b.words - a.words;
      }

      sortOrder = 'ascending';
      return a.words - b.words;
    });
    this.setState({
      articlesToDisplay: sortedArticles,
      wordsSortOrder: sortOrder,
    });
    localStorage.setItem('wordsSortOrder', sortOrder);
  };

  sortByDate = () => {
    let sortOrder;
    //cloning to avoid mutating state, as sort mutates the array
    const sortedArticles = JSON.parse(
      JSON.stringify(this.state.articlesToDisplay)
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
    this.setState({
      articlesToDisplay: sortedArticles,
      dateSortOrder: sortOrder,
    });
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
          <List articles={this.state.articlesToDisplay} />
        </table>
        {this.state.shouldShowBtn && (
          <button onClick={this.onClick}> Show more...</button>
        )}
      </div>
    );
  }
}

export default App;
