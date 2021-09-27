import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { ErrorMessage } from "../components/ErrorMessage";
import { PokemonDetail } from "../components/PokemonDetail";
import { HomeButton } from "../components/HomeButton";

export const POKEMON_DETAIL_QUERY = gql`
  query pokemonDetail($name: String!) {
    pokemonByName(name: $name) {
      name
      id
      isFavorite
      image
      types
      maxCP
      maxHP
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        name
        image
        isFavorite
      }
    }
  }
`;

const DetailPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const { loading, error, data } = useQuery(POKEMON_DETAIL_QUERY, {
    variables: { name },
  });

  if (error) {
    return <ErrorMessage message="Error loading pokemon." />;
  }

  if (loading) return null;

  const { pokemonByName: pokemon } = data;

  return (
    <main>
      <HomeButton />
      <PokemonDetail pokemon={pokemon} />
    </main>
  );
};

export default DetailPage;
