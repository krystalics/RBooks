import React, {Component} from 'react';
import './App.css';
import Navigator from "./js/main/Navigator";
import Container from "./js/main/Container";


// 最终由 Navigator Container Footer 三个组件构成
class App extends Component {
  render() {
    return (
        <div className="App">
          <Navigator/>
          <Container/>
        </div>
    );
  }
}

export default App;
