import React, { Component } from 'react';
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
    sortOrder: null,
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

  sort = () => {
    let sortOrder;
    const sortedArticles = this.state.articlesToLoad.sort((a, b) => {
      if (this.state.sortOrder === 'ascending') {
        sortOrder = 'descending';
        return b.words - a.words;
      }

      sortOrder = 'ascending';
      return a.words - b.words;
    });
    this.setState({ articlesToLoad: sortedArticles, sortOrder });
  };

  render() {
    return (
      <div className={Base}>
        <table>
          <thead>
            <Header sort={this.sort} />
          </thead>
          <List articles={this.state.articlesToLoad} />
        </table>
        <button onClick={this.onClick}> Show more...</button>
      </div>
    );
  }
}

export default App;
