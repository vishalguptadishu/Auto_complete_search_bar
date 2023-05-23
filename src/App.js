import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch('http://cdn-api.co-vin.in/api/v2/admin/location/states');
      const data = await response.json();
      setStates(data.states);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query.length > 0) {
      const matchedStates = states.filter(state => state.state_name.toLowerCase().includes(query));
      setSearchResults(matchedStates);
    } else {
      setSearchResults([]);
    }
  };


  return (
    <div className='App'>
      <input
        type="text"
        value={searchInput}
        placeholder="Enter State "
        onChange={handleInputChange}
      />
      
        <ul>
          {searchResults.map(state => (
            <li key={state.state_id}>{state.state_name}</li>
          ))}
        </ul>
   
    </div>
  );
};

export default App;
