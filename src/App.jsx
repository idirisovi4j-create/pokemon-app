import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => {
        const requests = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        );

        Promise.all(requests)
          .then((data) => {
            setPokemons(data);
            setLoading(false);
          })
          .catch(() => {
            setError("Something went wrong");
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Something went wrong");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">Pokemon List</h1>

      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;