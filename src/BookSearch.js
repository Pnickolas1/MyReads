import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class BookSearch extends Component {
    
    //setting state of the booksearch 
    state = {
        currentBooks: new Map(),
        books: [],
        query: ""
    };

    //react lifecycle methods
    componentDidMount() {
        const mapper = new Map();

        BooksAPI.getAll().then(books => {
            for (let val of books) {
                mapper.set(val.id, val.shelf);
            }
            this.setState({
                currentBooks: mapper
            });
        });
    }


    onQueryUpdate = e => {
        let query = e.trim();

        BooksAPI.search(query).then(books => {
            if (books){
                if (books.hasOwnProperty("error")){
                    this.setState({
                        books: [],
                        query: query
                    });
                } else {
                    this.setState({
                        books: books,
                        query: query
                    });
                }
                } else {
                    this.setState({
                        books: [],
                        query: query
                    });
                }
            });
        };
        

        onShelfChange = (book, shelf ) => {
            let currentBooks = this.state.currentBooks; 

            BooksAPI.update(book, shelf).then(result => {
                currentBooks.set(book.id, shelf);
                this.setState({
                    currentBooks: currentBooks
                });
            });
        };


        render () {
            let currentBooks = this.state.currentBooks;
            let books = this.state.books;

            return (
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">
                        close
                        </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="search title or author"
                            onChange={event => this.onQueryUpdate(event.target.value)}
                        />
                    </div>
                </div>
                <BookShelf
                    books={books}
                    onShelfChange={this.onShelfChange}
                    currentBooks={currentBooks}
                    customClassName="search-books-results"
                />
            </div>
            )
        }

    }

export default BookSearch;