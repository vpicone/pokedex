import { Heart, Card } from "./Card";
import cardStyles from "../styles/Card.module.css";
import pokemonListStyles from "../styles/PokemonList.module.css";
import cx from "classnames";

export const PokemonDetail = ({ pokemon }: any) => {
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
  return (
    <div className={pokemonListStyles.wrapper}>
      <section className={cardStyles.detail}>
        <div className={cardStyles.card}>
          <div className={cardStyles.imageWrapper}>
            <img height="100%" width="100%" alt={`${name}`} src={image} />
          </div>
          <div className={cardStyles.cardFooter}>
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
      {evolutions.length ? (
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
