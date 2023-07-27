import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>What do you feel like listening today?</h1>
        <span>Select how are you feeling today?
        <select>
            <option value="Bright">Bright</option>
            <option value="Blue">Blue</option> 
            <option value="Energetic">Energetic</option>
            {/* <option value="Snowy">Snowy</option> */}
        </select>
        </span>
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
