import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  const {showAlert} = props;
  return (
    <>
      <div className="container border-5 mt-3">
          <Notes showAlert={showAlert}/>
      </div>
    </>
  );
};

export default Home;
