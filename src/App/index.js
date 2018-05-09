import React, { Component } from 'react';
import Header from './Header';
import ListItem from './ListItem';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {props.list.map(item => <ListItem item={item} />)}
      </div>
    );
  }
}

export default App;
