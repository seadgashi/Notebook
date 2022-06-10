import React, { useState } from 'react';
import './App.css';

const DEFAULT_NOTE_PARAMS = {
  title: '',
  category: undefined,
};

const NOTE_CATEGORIES = [
  'Personal Notes',
  'Profesional Notes',
  'University Notes',
  'Family Notes',
  'Fun Notes',
];

function App() {
  const [newNoteParams, setNewNoteParams] = useState(DEFAULT_NOTE_PARAMS);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();


  function addNewNote() {
    if (!newNoteParams.title) {
      alert('Title cannot be blank!')
      return
    }

    if (!newNoteParams.category) {
      alert('Category cannot be blank!')
      return
    }

    const note = {
      title: newNoteParams.title,
      category: newNoteParams.category,
    };

    setNotes(list => [...list, note]);
    setNewNoteParams(DEFAULT_NOTE_PARAMS);
  }

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || note.category === selectedCategory)
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(undefined);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className='title'>Notes App</h1>
        <div className="body">
          <div>
            <div>
              <h1 className='section-title'>New Note</h1>
              <input
                id='addNote'
                type="text"
                placeholder="Note Title"
                value={newNoteParams.title}
                onChange={e => setNewNoteParams({ ...newNoteParams, title: e.target.value })}
              />
              <select 
                id='selectNote'
                placeholder="Select Category"
                className="category-options"
                value={newNoteParams.category}
                onChange={e => setNewNoteParams({ ...newNoteParams, category: e.target.value })}
              >
                <option value={null}>Select Category</option>
                {NOTE_CATEGORIES.map(category => (
                  <option selected={newNoteParams.category === category} value={category}>{category}</option>
                ))}
              </select>
              <button className='button' onClick={addNewNote}>Create</button>
            </div>

            <div className='category'>
              <h1 className='section-title'>Filter by Category</h1>
              {NOTE_CATEGORIES.map(category => (
                <p
                  style={{ color: selectedCategory === category ? 'red' : 'black', cursor: 'pointer' }}
                  onClick={() => setSelectedCategory(category)}
                >{category}</p>
              ))}
              <button className='button clear-filters' onClick={clearFilters}>Clear Filters</button>
            </div>
          </div>

          <div className="search-notes-section">
            <h1 className='section-title'>Search Notes</h1>
            <div className='search-notes'>
              <input
                id='search-input'
                placeholder="Search by Title"
                value={searchTerm}
                onChange={a => setSearchTerm( a.target.value )}
              />
            </div>
            <div className="category">
              {filteredNotes.map(note => (
                <div className="note-data">
                  <p><span className="bold">Category:</span> {note.category}</p>
                  <p><span className="bold">Title:</span> {note.title}</p>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
