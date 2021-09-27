import styles from "../styles/Card.module.css";
import Link from "next/link";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { MouseEventHandler, useState } from "react";

const ADD_FAVORITE_MUTATION = gql`
  mutation addFavorite($id: ID!) {
    favoritePokemon(id: $id) {
      name
      id
      isFavorite
    }
  }
`;

const REMOVE_FAVORITE_MUTATION = gql`
  mutation removeFavorite($id: ID!) {
    unFavoritePokemon(id: $id) {
      name
      id
      isFavorite
    }
  }
`;

export const Card: React.FC<any> = ({ pokemon }) => {
  return (
    <li key={pokemon.name}>
      <div className={styles.card}>
        <Link href={pokemon.name}>
          <a className={styles.imageWrapper}>
            <img
              height="100%"
              width="100%"
              loading="lazy"
              alt={`${pokemon.name}`}
              src={pokemon.image}
            />
          </a>
        </Link>
        <div className={styles.cardFooter}>
          <div className={styles.info}>
            <div className={styles.data}>
              <span className={styles.name}>{pokemon.name}</span>
              {pokemon.types && (
                <span className={styles.types}>{pokemon.types.join(", ")}</span>
              )}
            </div>
            <Heart isFavorite={pokemon.isFavorite} id={pokemon.id} />
          </div>
        </div>
      </div>
    </li>
  );
};

export const Heart: React.FC<{ isFavorite?: boolean; id: string }> = ({
  isFavorite: defaultFavorite,
  id,
}) => {
  const [isFavorite, setIsFavorite] = useState(defaultFavorite);
  const [favoriteFunction] = useMutation(ADD_FAVORITE_MUTATION);
  const [unFavoriteFunction] = useMutation(REMOVE_FAVORITE_MUTATION);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      unFavoriteFunction({ variables: { id } });
      setIsFavorite(false);
    } else {
      favoriteFunction({ variables: { id } });
      setIsFavorite(true);
    }
  };

  return (
    <button
      style={{
        appearance: "none",
        border: "none",
        background: "none",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <svg
        className={styles.heart}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 477.534 477.534"
      >
        <path
          fill="var(--red)"
          d="M438.482 58.61a130.815 130.815 0 00-95.573-41.711 130.968 130.968 0 00-95.676 41.694l-8.431 8.909-8.431-8.909C181.284 5.762 98.662 2.728 45.832 51.815a130.901 130.901 0 00-6.778 6.778c-52.072 56.166-52.072 142.968 0 199.134l187.358 197.581c6.482 6.843 17.284 7.136 24.127.654.224-.212.442-.43.654-.654l187.29-197.581c52.068-56.16 52.068-142.957-.001-199.117zm-24.695 175.616h-.017L238.802 418.768 63.818 234.226c-39.78-42.916-39.78-109.233 0-152.149 36.125-39.154 97.152-41.609 136.306-5.484a96.482 96.482 0 015.484 5.484l20.804 21.948c6.856 6.812 17.925 6.812 24.781 0l20.804-21.931c36.125-39.154 97.152-41.609 136.306-5.484a96.482 96.482 0 015.484 5.484c40.126 42.984 40.42 109.422 0 152.132z"
        />
        {isFavorite && (
          <path
            fill="var(--red)"
            d="M438.482 58.61a130.815 130.815 0 00-95.573-41.711 130.968 130.968 0 00-95.676 41.694l-8.431 8.909-8.431-8.909C181.284 5.762 98.663 2.728 45.832 51.815a130.901 130.901 0 00-6.778 6.778c-52.072 56.166-52.072 142.968 0 199.134l187.358 197.581c6.482 6.843 17.284 7.136 24.127.654.224-.212.442-.43.654-.654l187.29-197.581c52.068-56.16 52.068-142.957-.001-199.117z"
          />
        )}
      </svg>
    </button>
  );
};
