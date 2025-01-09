import React  from "react";
import useDocumentTitle from "../useDocumentTitle";

function Home() {
  return (
    <div>
      {useDocumentTitle('Home')};
      <h1>Home</h1>
    </div>
  );
}

export default Home;