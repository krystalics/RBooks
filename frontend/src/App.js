import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigator from "./main/Navigator";
import Container from "./main/Container";
import Footer from "./main/Footer";

// 最终由 Navigator Container Footer 三个组件构成
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigator/>
        <Container/>
        <Footer/>
      </div>
    );
  }
}

export default App;
