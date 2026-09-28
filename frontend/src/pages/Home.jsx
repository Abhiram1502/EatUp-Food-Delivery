import Navbar from "../components/Navbar";
import Hero from '../components/Hero';
import Filters from "../components/Filters";
import Footer from '../components/Footer';
import { useState } from "react";
import Restaurants from "../components/Restaurants";
function Home(){
  const [category,setCategory]=useState(null);
  return(
    <>
      <Navbar />
      <Hero />
      <Filters setCategory={setCategory}/>
      <Restaurants category={category}/>
      <Footer />
    </>
  )
};
export default Home; 