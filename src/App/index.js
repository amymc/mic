import React, { Component } from 'react';
import Header from './Header';
import List from './List';
import './App.css';
import articles from '../data/articles.json';

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
      <div className="App">
        <Header />
        <List articles={this.state.articlesToLoad} />
        <button onClick={this.onClick}> Show more...</button>
      </div>
    );
  }
}

export default App;
