import React, { Component } from 'react';
import { css } from 'react-emotion';
import articles from '../data/articles.json';
import loadArticles from '../loadArticles';
import { sortByDate, sortByWords } from '../utils';
import Table from './Table';
import Button from './shared/Button';

const base = css`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
  background-color: #fafafa;
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
        <Table
          sortBy={this.updateSortOrder}
          wordSortOrder={wordSortOrder}
          dateSortOrder={dateSortOrder}
          articles={articlesToDisplay}
        />
        {shouldShowBtn && <Button onClick={this.onClick} text="Show more..." />}
      </div>
    );
  }
}

export default App;
