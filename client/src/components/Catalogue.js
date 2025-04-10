import React from 'react';
import BookCard from './BookCard';

const Catalogue = () => {
    const bookCards = Array(15).fill(null).map((_, index) => (
        <BookCard key={index} />
      ));
    
      return (
        <div className="catalogue">
          {bookCards}
        </div>
      );
}

export default Catalogue