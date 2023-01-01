import React, { useCallback, useEffect, useState } from "react";

function App() {
  /**
   * State for whether the list of pets has been loaded from the server.
   */
  const [loaded, setLoaded] = useState(false);

  /**
   * State that stores an API response error when the request fails.
   */
  const [error, setError] = useState(null);

  /**
   * State containing the list of pets returned from the server.
   */
  const [pets, setPets] = useState([]);

  /**
   * Ensures that the response is successful and logs source host info to console.
   */
  const validateResponse = (response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    console.log(
      `${new Date().toISOString()} Loaded pets from host ${response.headers.get(
        "X-Source-Host"
      )}`
    );

    return response;
  };

  /**
   * Makes a request to the API service to retrieve a list of pets from the database.
   */
  const loadPets = useCallback(() => {
    fetch("http://localhost:8000", {
      method: "GET",
    })
      .then(validateResponse)
      .then((res) => res.json())
      .then(setPets)
      .then(() => setLoaded(true))
      .catch((err) => {
        console.error(err.message);
        setError(err.message);
      });
  }, []);

  /**
   * Perform the initial load of pets from the server when the component mounts.
   */
  useEffect(loadPets, [loadPets]);

  /**
   * Load pets from the service on a 5 second timer.
   */
  useEffect(() => {
    const timer = setInterval(loadPets, 5000);
    return () => clearInterval(timer);
  }, [loadPets]);

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
