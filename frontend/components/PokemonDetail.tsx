import { Heart, Card } from "./Card";
import cardStyles from "../styles/Card.module.css";
import pokemonListStyles from "../styles/PokemonList.module.css";
import { useRouter } from "next/router";
import { Audio } from "./Audio";
import cx from "classnames";
import confetti from "canvas-confetti";
import { ErrorMessage } from "./ErrorMessage";

export const PokemonDetail = ({ pokemon }: any) => {
  const router = useRouter();

  if (!pokemon) {
    return (
      <ErrorMessage message={`pokemon, ${router.query.name}, not found.`} />
    );
  }

  const {
    name,
    image,
    types,
    evolutions,
    maxHP,
    maxCP,
    weight,
    height,
    isFavorite,
    id,
  } = pokemon;

  const hasEvolutions = !!evolutions.length;
  return (
    <div className={pokemonListStyles.wrapper}>
      <section className={cardStyles.detail}>
        <div className={cardStyles.card}>
          <div className={cardStyles.imageWrapper}>
            <img height="100%" width="100%" alt={`${name}`} src={image} />
          </div>
          <div className={cardStyles.cardFooter}>
            {hasEvolutions ? (
              <button
                className={cx(cardStyles.svg, cardStyles.evolve)}
                onClick={() => {
                  confetti();
                  router.push(evolutions[0].name);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                  <path d="M21 24H11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Zm0 4H11v-2h10ZM28.707 14.293l-12-12a1 1 0 0 0-1.414 0l-12 12A1 1 0 0 0 4 16h5v4a2.002 2.002 0 0 0 2 2h10a2.003 2.003 0 0 0 2-2v-4h5a1 1 0 0 0 .707-1.707ZM21 14v6H11v-6H6.414L16 4.414 25.586 14Z" />
                </svg>
              </button>
            ) : null}
            <Audio id={id} />
            <div className={cardStyles.info}>
              <div className={cardStyles.data}>
                <span className={cardStyles.name}>{name}</span>
                <span className={cardStyles.types}>{types.join(", ")}</span>
              </div>
              <Heart isFavorite={isFavorite} id={id} />
            </div>
            <div className={cardStyles.bars}>
              <div className={cx(cardStyles.bar, cardStyles.cp)}>
                <meter></meter>
                <span>CP: {maxCP}</span>
              </div>
              <div className={cx(cardStyles.bar, cardStyles.hp)}>
                <meter></meter>
                <span>HP: {maxHP}</span>
              </div>
            </div>
            <div className={cardStyles.stats}>
              <div className={cardStyles.statBlock}>
                <span className={cardStyles.statCategory}>Weight</span>
                {`${weight.minimum} – ${weight.maximum}`}
              </div>
              <div className={cardStyles.statBlock}>
                <span className={cardStyles.statCategory}>Height</span>
                {`${height.minimum} – ${height.maximum}`}
              </div>
            </div>
          </div>
        </div>
      </section>
      {hasEvolutions ? (
        <>
          <span className={cardStyles.evolutions}>Evolutions</span>
          <ul className={pokemonListStyles.cardList}>
            {evolutions.map((pokemon: any) => (
              <Card key={pokemon.name} pokemon={pokemon} />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};
