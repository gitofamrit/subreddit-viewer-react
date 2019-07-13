import React from "react";
import "./App.css";
import APICall from "./APICall";

class App extends React.Component {
  // Create UI in card structure
  render() {
    return (
      <div className="App">
        <APICall />
      </div>
    );
  }
}

export default App;
