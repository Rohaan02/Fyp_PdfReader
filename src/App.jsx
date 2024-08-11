import React from "react";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import FooterBox from "./components/footerComponent/Footer";


function App(){
  return(
    <div id="App">
      <Header />
      <HomePage />
      <FooterBox />
    </div>
  );
}

export default App;