
import React from 'react';
import './PokemonCard.css';
import type { Pokemon } from './interfaces'; 

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { name, abilities, sprites } = pokemon;

  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">{name}</h2>
      <img 
        src={sprites.front_default} 
        alt={name} 
        className="pokemon-image"
      />
      <div className="pokemon-abilities">
        <h3>Habilidades:</h3>
        <ul>
          {abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;