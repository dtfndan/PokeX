import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import type { Pokemon, PokemonListResponse } from './interfaces';
import './App.css'; 

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const pokemonsPerPage = 9; 
  const totalPokemons = 151;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * pokemonsPerPage;
                const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`);
        const listData: PokemonListResponse = await listResponse.json();
        
        setTotalPages(Math.ceil(totalPokemons / pokemonsPerPage));

        const pokemonPromises = listData.results.map(pokemon => 
          fetch(pokemon.url).then(res => res.json())
        );
        
        const pokemonData: Pokemon[] = await Promise.all(pokemonPromises);
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, [currentPage]); 

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (loading) {
    return <div>Cargando Pokémones...</div>;
  }

  return (
    <div className="app-container">
      <h1>PokeX</h1>
      <div className="pokemon-grid">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        {renderPaginationButtons()}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;