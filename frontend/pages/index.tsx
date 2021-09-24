import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import PokemonList from "../components/PokemonList";

const Home: NextPage = () => {
  return <PokemonList />;
};

export default Home;
