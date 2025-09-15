
export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: Sprites;
}

export interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}