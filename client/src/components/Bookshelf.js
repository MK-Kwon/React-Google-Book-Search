import React, {useState, useEffect} from 'react';
import API from '../utils/API';
import SavedCard from './SavedCard';

function Bookshelf(){

    const [books, setBooks] = useState([]);
    
    useEffect(function(){
        getBooks();
    }, []);

    async function getBooks(){
        const response = await API.getBooks().catch((err) => console.log(err));
        console.log(response.data);
        setBooks(response.data);
    }

    async function handleBtnClicked(event){
        const response = await API.removeBook(event.target.id).catch((err) => console.log(err));
        console.log(response);
        alert(`BookID: ${event.target.id} removed`);
        getBooks();
    }

    return (
    <div className="container">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Your Bookshelf</h5>
                <ul className="list-group">
                    {books.length === 0 ? <p>You dont have any saved books yet!</p> : books.map(book => <SavedCard book={book} key={book.id} handleBtnClicked={handleBtnClicked} /> )}
                </ul>
            </div>
        </div>
    </div>
    );
}

export default Bookshelf;