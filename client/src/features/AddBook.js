import React from 'react';

import { useState, useRef } from 'react';
import { Check, ChevronDown, Image, X } from 'lucide-react';

const AddBook = () => {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    price: '',
    condition: '',
    image: null
  });
  const [isConditionOpen, setIsConditionOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const conditions = [
    'New',
    'Like New',
    'Very Good',
    'Good',
    'Acceptable',
    'Poor'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setBookInfo({
        ...bookInfo,
        image: file
      });
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    setBookInfo({
      ...bookInfo,
      image: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConditionSelect = (condition) => {
    setBookInfo({
      ...bookInfo,
      condition
    });
    setIsConditionOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Book listing submitted:', bookInfo);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setBookInfo({
        title: '',
        price: '',
        condition: '',
        image: null
      });
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 3000);
  };

  const isFormValid = bookInfo.title && bookInfo.price && bookInfo.condition;

  return (
    <div className="form-container">
      <h1 className="form-title">List Your Book for Sale</h1>
      
      {isSubmitted ? (
        <div className="success-message">
          <span>Your book has been listed successfully!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Book Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookInfo.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter the book title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              Price ($)*
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={bookInfo.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              className="form-input"
              placeholder="0.00"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Condition*
            </label>
            <div className="dropdown">
              <button
                type="button"
                className="dropdown-toggle"
                onClick={() => setIsConditionOpen(!isConditionOpen)}
              >
                {bookInfo.condition || 'Select condition'}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isConditionOpen && (
                <div className="dropdown-menu">
                  {conditions.map((condition) => (
                    <div
                      key={condition}
                      className="dropdown-item"
                      onClick={() => handleConditionSelect(condition)}
                    >
                      <span className="dropdown-item-text">{condition}</span>
                      {bookInfo.condition === condition && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Book Image
            </label>
            {!previewUrl ? (
              <div className="image-upload">
                <div className="upload-area">
                  <div className="upload-content">
                    <Image className="upload-icon" />
                    <div className="upload-text">
                      <label htmlFor="file-upload" className="upload-link">
                        <span>Upload an image</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only" 
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                      </label>
                      <p>&nbsp;or drag and drop</p>
                    </div>
                    <p className="upload-helper">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="image-preview">
                <div className="preview-container">
                  <img 
                    src={previewUrl} 
                    alt="Book preview" 
                    className="preview-image" 
                  />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="remove-image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`submit-button ${
                isFormValid ? 'button-enabled' : 'button-disabled'
              }`}
            >
              List Book for Sale
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddBook;