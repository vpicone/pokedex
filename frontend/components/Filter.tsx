import { useRef, useState, useEffect } from "react";
import {
  Search,
  Dropdown,
  ContentSwitcher,
  Switch,
} from "carbon-components-react";
import styles from "../styles/Filter.module.css";
export const Filter: React.FC<any> = ({
  types,
  setSearch,
  setType,
  setShouldShowFavorites,
}) => {
  const containerRef = useRef<any>();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) =>
        e.target.classList.toggle(styles.shadows, e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(containerRef.current as HTMLDivElement);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.favorites}>
        <ContentSwitcher
          onChange={(change) =>
            setShouldShowFavorites(change.text === "Favorites")
          }
        >
          <Switch name="All" text="All" />
          <Switch name="Favorites" text="Favorites" />
        </ContentSwitcher>
      </div>
      <div className={styles.inputs}>
        <Search
          placeholder="Aa"
          size="lg"
          labelText="Search"
          onChange={(e) => setSearch(e.target.value || "")}
        />
        <Dropdown
          className={styles.dropdown}
          onChange={({ selectedItem }) => setType(selectedItem)}
          titleText="Type filter"
          hideLabel
          id="type-filter"
          label="Type"
          items={["All", ...types]}
        />
      </div>
    </div>
  );
};
