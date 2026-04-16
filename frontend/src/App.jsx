import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(false);

  // The 4 default candidates for our system design project
  const candidates = [
    { id: '1', name: 'Alice (Engineer)' },
    { id: '2', name: 'Bob (Designer)' },
    { id: '3', name: 'Charlie (Manager)' },
    { id: '4', name: 'Diana (Director)' }
  ];

  // 1. Fetch live results from the Spring Boot API
  const fetchResults = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/votes');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setVotes(data);
    } catch (err) {
      // Logic: Logging the error so the "unused variable" warning disappears
      console.error("Backend connection failed. Check if Spring Boot is running:", err);
    }
  };

  // 2. Set up a 1-second interval to pull new data (Polling)
  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Function to send a POST request to cast a vote
  const castVote = async (candidateId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/votes/${candidateId}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to cast vote');
      
      // Refresh results immediately for better UX
      await fetchResults();
    } catch (err) {
      console.error("Error casting vote:", err);
      alert("Could not register vote. Ensure the backend server is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Massive-Scale Voting System</h1>
        <p className="subtitle">Real-time Dashboard | Redis + PostgreSQL + Spring Boot</p>
      </header>
      
      <div className="candidate-grid">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="candidate-card">
            <h2>{candidate.name}</h2>
            <div className="vote-count">
              {votes[candidate.id] || 0}
              <span className="label">Votes</span>
            </div>
            <button 
              onClick={() => castVote(candidate.id)}
              disabled={loading}
              className="vote-btn"
            >
              {loading ? 'Processing...' : 'Vote Now'}
            </button>
          </div>
        ))}
      </div>

      <footer className="status-bar">
        <div className="status-indicator"></div>
        <span>Connected to API: http://localhost:8080</span>
      </footer>
    </div>
  );
}

export default App;