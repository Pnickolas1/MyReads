import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';
// eslint-disable-next-line 
import BookShelf from './BookShelf';

class BookList extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            });
        });
    }

    onStatusChange = (book, shelf ) => {
        let books = this.state.books;
        book.shelf = shelf;

        //find the index of the book in the array (list in python)
        let findBookIndex = books.findIndex(b => b.id === book.id);

        books[findBookIndex] = book;

        BooksAPI.update(book, shelf).then(result => {this.setState({
            books: books
        });
    })
    .catch(e => this.setState({ books: books }));

 };


render() {

    let wantToReadBooks = this.state.books.filter(
        book => book.shelf === 'wantToRead'
    );

    let currentlyReading = this.state.books.filter(
        book => book.shelf === 'currentlyReading'        
    );

    let readBooks = this.state.books.filter(
        book => book.shelf ==='read'
    );

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <BookShelf
                        books={currentlyReading}
                        onStatusChange={this.onStatusChange}
                        customClassName="bookshelf-books"
                    />
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <BookShelf
                        books={wantToReadBooks}
                        onStatusChange={this.onStatusChange}
                        customClassName="bookshelf-books"
                    />
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <BookShelf
                        books={readBooks}
                        onStatusChange={this.onStatusChange}
                        customClassName="bookshelf-books"
                    />
                </div> 
              </div>
             </div>
            <div className="open-search">
                <Link to="/search">Add Book</Link>
            </div>
        </div>
      );
   }   
}

export default BookList;
