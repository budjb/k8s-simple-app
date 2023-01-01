import React, { useEffect, useState } from "react";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [pets, setPets] = useState([]);

  const loadPets = () => {
    fetch("http://localhost:8000", {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res;
        }
      })
      .then((res) => {
        console.log(
          `${new Date().toISOString()} Loaded pets from host ${res.headers.get(
            "X-Source-Host"
          )}`
        );
        return res;
      })
      .then((res) => res.json())
      .then(setPets)
      .then(() => setLoaded(true))
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  };

  useEffect(loadPets, []);

  useEffect(() => {
    const timer = setInterval(loadPets, 5000);
    return () => clearInterval(timer);
  }, []);

  if (error) {
    return <p>Error loading pets: {error}</p>;
  } else if (!loaded) {
    return <p>Loading...</p>;
  } else if (pets.length === 0) {
    return <p>No pets exist.</p>;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, i) => (
            <tr key={i}>
              <td>{pet.name}</td>
              <td>{pet.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default App;
