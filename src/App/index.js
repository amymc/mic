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

  render() {
    return (
      <div className={Base}>
        <table>
          <thead>
            <Header />
          </thead>
          <List articles={this.state.articlesToLoad} />
        </table>
        <button onClick={this.onClick}> Show more...</button>
      </div>
    );
  }
}

export default App;
