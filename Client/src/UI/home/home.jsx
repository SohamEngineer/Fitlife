import React from "react";
import Hero from "./hero";
import Exercise from "./exercise";
import Start from "./start";
import Faq from "./faq";
import { fitnessFaqData } from "../../data/accordino";

const Home = () => {
  return (
    <>
      <Hero />
      <Exercise />
      <Start />
      <Faq items={fitnessFaqData} />
    </>
  );
};

export default Home;
