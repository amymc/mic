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

  loadMore = () => {
    console.log('load!');
    const { allArticles, articlesToLoad } = this.state;
    if (articlesToLoad.length === allArticles.length) {
      //load from more-articles
    } else {
      this.setState({
        articlesToLoad: allArticles.slice(0, articlesToLoad.length + 10),
      });
    }
  };

  render() {
    console.log('articles', articles);

    return (
      <div className="App">
        <Header />
        {this.state.articlesToLoad.map((article, i) => (
          <ListItem key={i} item={article} />
        ))}
        <button onClick={this.loadMore}> Show more...</button>
      </div>
    );
  }
}

export default App;
