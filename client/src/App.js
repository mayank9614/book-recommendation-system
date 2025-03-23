import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksResponse, recommendationsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/books'),
          axios.get('http://localhost:5000/api/recommendations')
        ]);
        
        setBooks(booksResponse.data);
        setRecommendations(recommendationsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="app">
      <header>
        <h1>Book Recommendation System</h1>
      </header>
      
      <main>
        <section className="recommendations">
          <h2>Recommended Books</h2>
          <div className="book-list">
            {recommendations.map(book => (
              <div className="book-card" key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="all-books">
          <h2>All Books</h2>
          <div className="book-list">
            {books.map(book => (
              <div className="book-card" key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Genre: {book.genre}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App; 