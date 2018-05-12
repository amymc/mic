import React, { Component } from 'react';
import moment from 'moment';
import Header from './Header';
import List from './List';
import articles from '../data/articles.json';
import styled, { css, keyframes } from 'react-emotion';

const buttonPop = keyframes`
  0%{
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const base = css`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
  background-color: #fafafa;
`;

const table = css`
  width: 100%;
  table-layout: fixed;
  margin-bottom: 0.5rem;

  border-collapse: collapse;
`;

const Button = styled('button')`
  background-color: #0be6af;
  padding: 1.125rem 1rem;
  border-radius: 4rem;
  font-size: 0.9rem;
  cursor: pointer;
  border: 0;
  width: 40%;
  align-self: center;
  &:hover {
    animation: ${buttonPop} 0.4s ease;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allArticles: articles,
      articlesToDisplay: articles.slice(0, 10),
      hasLoadedExternals: false,
      wordsSortOrder: JSON.parse(localStorage.getItem('wordsSortOrder')),
      dateSortOrder: JSON.parse(localStorage.getItem('dateSortOrder')),
      shouldShowBtn: true,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { dateSortOrder, wordsSortOrder } = this.state;
    if (wordsSortOrder) {
      this.sortByWords();
    } else if (dateSortOrder) {
      this.sortByDate();
    }
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
      dateSortOrder: null,
      wordsSortOrder: sortOrder,
    });
    localStorage.setItem('wordsSortOrder', JSON.stringify(sortOrder));
    // all values are saved in local storage as string
    localStorage.setItem('dateSortOrder', JSON.stringify(null));
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
      wordsSortOrder: null,
    });
    localStorage.setItem('dateSortOrder', JSON.stringify(sortOrder));
    localStorage.setItem('wordsSortOrder', JSON.stringify(null));
  };

  render() {
    const {
      articlesToDisplay,
      shouldShowBtn,
      dateSortOrder,
      wordsSortOrder,
    } = this.state;
    return (
      <div className={base}>
        <table className={table}>
          <thead>
            <Header
              sortByWords={this.sortByWords}
              sortByDate={this.sortByDate}
              wordsSortOrder={wordsSortOrder}
              dateSortOrder={dateSortOrder}
            />
          </thead>
          <List articles={articlesToDisplay} />
        </table>
        {shouldShowBtn && <Button onClick={this.onClick}>Show more...</Button>}
      </div>
    );
  }
}

export default App;
