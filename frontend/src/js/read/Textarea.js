import React, {Component} from 'react';

import '../../css/main.css'
import Button from "react-bootstrap/Button";
import axios from 'axios'

class Textarea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value})
  }

  handleSubmit() {
    let chapter = {
      chapterid: this.props.chapterid,
      content: this.state.content,
      datetime: new Date()
    };

    axios.post("http://localhost:8080/write/updatechapter", chapter)
    .then(res => {
      alert(res.data)
    })
    .catch(err => {
      alert(err.data)
    })
  }

  render() {
    let save = <Button onClick={this.handleSubmit} action
                       variant="outline-success">保存</Button>;
    return (
        <div>
          <textarea className="textarea" value={this.state.content}
                    onChange={this.handleChange}/>
          {save}
        </div>
    );
  }

}

export default Textarea;
