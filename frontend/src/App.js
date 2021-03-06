import React, {Component} from 'react';
import './App.css';
import Navigator from "./js/main/Navigator";
import Content from "./js/main/Content";

// 最终由 Navigator Content Footer 三个组件构成
class App extends Component {
  render() {
    return (
        <div className="app">
          <Navigator/>
          <Content/>

        </div>
    );
  }
}

export default App;
