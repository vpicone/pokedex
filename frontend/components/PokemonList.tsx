import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ErrorMessage } from "./ErrorMessage";
import styles from "../styles/PokemonList.module.css";
import { Card } from "./Card";
import { Filter } from "./Filter";

export const ALL_POKEMON_QUERY = gql`
  query allPokemon($limit: Int!, $offset: Int!) {
    pokemonTypes
    pokemons(query: { limit: $limit, offset: $offset }) {
      edges {
        name
        types
        isFavorite
        image
        id
      }
    }
  }
`;

export default function PokemonList() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showFavorites, shouldShowFavorites] = useState(false);
  const { loading, error, data } = useQuery(ALL_POKEMON_QUERY, {
    variables: { offset: 0, limit: 151 },
  });

  if (error) {
    console.error(error);
    return <ErrorMessage message="Error loading posts." />;
  }

  if (loading) return <div>Loading</div>;

  const { pokemons, pokemonTypes } = data;
  const allPokemon = pokemons.edges;

  const filteredPokemon = allPokemon.filter((pokemon: any) => {
    if (showFavorites && !pokemon.isFavorite) {
      return false;
    }
    if (type && type !== "All") {
      return pokemon.types.includes(type);
    }
    return true;
  });

  const matchingPokemon = filteredPokemon.filter((pokemon: any) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section className={styles.wrapper}>
      <Filter
        setSearch={setSearch}
        setType={setType}
        setShouldShowFavorites={shouldShowFavorites}
        types={pokemonTypes}
      />
      <ul className={styles.cardList}>
        {matchingPokemon.map((pokemon: any) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
    </section>
  );
}
