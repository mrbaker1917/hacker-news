import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { FaBeer } from "react-icons/fa";
import News from "./components/News";

// Component
// State
// Lifecycle
// UI

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <News />
        <h1><FaBeer/></h1>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)