import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import './App.css';


class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={BookList} />
          <Route path="/search" component={BookSearch} />
        </div> 
      </Router>
    );
  }
}

export default BooksApp;