import React, { Component } from 'react';
import styled, { css, keyframes } from 'react-emotion';
import Header from './Header';
import List from './List';
import articles from '../data/articles.json';
import loadArticles from '../loadArticles';
import { sortByDate, sortByWords } from '../utils';

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
      wordSortOrder: JSON.parse(localStorage.getItem('wordSortOrder')),
      dateSortOrder: JSON.parse(localStorage.getItem('dateSortOrder')),
      shouldShowBtn: true,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { dateSortOrder, wordSortOrder } = this.state;
    if (wordSortOrder) {
      this.setState({
        articlesToDisplay: sortByWords(
          this.state.articlesToDisplay,
          wordSortOrder
        ),
      });
    } else if (dateSortOrder) {
      this.setState({
        articlesToDisplay: sortByDate(
          this.state.articlesToDisplay,
          dateSortOrder
        ),
      });
    }
  }

  async onClick() {
    const { allArticles, articlesToDisplay, hasLoadedExternals } = this.state;
    const numToLoad = 10;
    const isPenultimateLoad =
      articlesToDisplay.length === allArticles.length - numToLoad &&
      hasLoadedExternals;

    if (articlesToDisplay.length === allArticles.length) {
      const externalArticles = await loadArticles();
      this.setState({
        allArticles: [...allArticles, ...externalArticles],
        articlesToDisplay: [...allArticles, ...externalArticles].slice(
          0,
          articlesToDisplay.length + numToLoad
        ),
        hasLoadedExternals: true,
      });
      return;
    }

    this.setState({
      articlesToDisplay: allArticles.slice(
        0,
        articlesToDisplay.length + numToLoad
      ),
      shouldShowBtn: isPenultimateLoad ? false : true,
    });
  }

  updateSortOrder = sortBy => {
    let dateSortOrder, wordSortOrder;
    if (sortBy === 'words') {
      wordSortOrder =
        this.state.wordSortOrder === 'ascending' ? 'descending' : 'ascending';
      dateSortOrder = null;
    } else {
      dateSortOrder =
        this.state.dateSortOrder === 'ascending' ? 'descending' : 'ascending';
      wordSortOrder = null;
    }
    const articlesToDisplay = wordSortOrder
      ? sortByWords(this.state.articlesToDisplay, wordSortOrder)
      : sortByDate(this.state.articlesToDisplay, dateSortOrder);
    // all values are saved in local storage as string
    localStorage.setItem('wordSortOrder', JSON.stringify(wordSortOrder));
    localStorage.setItem('dateSortOrder', JSON.stringify(dateSortOrder));

    this.setState({
      articlesToDisplay,
      dateSortOrder,
      wordSortOrder,
    });
  };

  render() {
    const {
      articlesToDisplay,
      shouldShowBtn,
      dateSortOrder,
      wordSortOrder,
    } = this.state;
    return (
      <div className={base}>
        <table className={table}>
          <thead>
            <Header
              sortBy={this.updateSortOrder}
              wordSortOrder={wordSortOrder}
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
