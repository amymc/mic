import React, { Component } from 'react';
import Header from './Header';
import ListItem from './ListItem';
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
        {this.state.articlesToLoad.map((article, i) => (
          <ListItem key={i} item={article} />
        ))}
        <button onClick={this.onClick}> Show more...</button>
      </div>
    );
  }
}

export default App;
