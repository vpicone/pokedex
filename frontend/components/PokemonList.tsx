import { useState, useRef, useCallback, useEffect } from "react";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { ErrorMessage } from "./ErrorMessage";
import styles from "../styles/PokemonList.module.css";
import { Card } from "./Card";
import { Filter } from "./Filter";

export const ALL_POKEMON_QUERY = gql`
  query allPokemon($limit: Int!, $offset: Int!) {
    allPokemonMeta {
      count
      types
    }
    allPokemon(query: { limit: $limit, offset: $offset }) {
      name
      types
      isFavorite
      image
      id
    }
  }
`;

export default function PokemonList() {
  const intersectionRef = useRef(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [showFavorites, shouldShowFavorites] = useState(false);
  const {
    loading,
    error,
    data = {},
    networkStatus,
    fetchMore,
  } = useQuery(ALL_POKEMON_QUERY, {
    variables: { offset: 0, limit: 20 },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePokemon = networkStatus === NetworkStatus.fetchMore;

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loadingMorePokemon) {
        fetchMore({
          variables: {
            offset: data.allPokemon.length,
          },
        });
      }
    },
    [fetchMore, data]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "20px",
      root: null,
      threshold: 0,
    });
    if (intersectionRef.current) observer.observe(intersectionRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  if (error) {
    console.error(error);
    return <ErrorMessage message="Error loading pokemon." />;
  }

  if (loading && !loadingMorePokemon) return null;

  const { allPokemon, allPokemonMeta } = data;

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
        types={allPokemonMeta.types}
      />
      <ul className={styles.cardList}>
        {matchingPokemon.map((pokemon: any) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </ul>
      <div ref={intersectionRef} />
    </section>
  );
}