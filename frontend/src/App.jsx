import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then(res => res.json())
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CodeArena Frontend</h1>
      <p>Backend API status : <b>{status}</b></p>
    </div>
  );
}

export default App;
