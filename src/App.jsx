import './App.css'
import SearchForm from './components/SearchForm'

function App() {
  return (
    <div className="App">
      {/* Header with Logo and Search Form */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <h1>ESTATE<span>FINDER</span></h1>
          </div>
          <SearchForm />
        </div>
      </header>

      {/* Main Content Area - Results will go here in Week 3 */}
      <main className="main-content">
        <div className="results-container">
          <p className="placeholder-text">Your property results will appear here...</p>
        </div>
      </main>
    </div>
  )
}

export default App