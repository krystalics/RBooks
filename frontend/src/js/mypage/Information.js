import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import '../../css/mypage.css'

class Information extends Component {

  render() {
    const data = {...this.props.data};
    // console.log(data);
    return (
        <div className="information">
          <span className="information-title"><h1>{data.username}</h1></span>
          <Container>
            <label>邮箱：</label> <span>{data.email}</span><br/>
            <label>自我介绍：</label> <span>{data.selfintroduction}</span><br/>
            <label>github：</label> <span>{data.githubpage}</span><br/>
            <label>homepage：</label> <span>{data.homepage}</span><br/>
          </Container>
        </div>
    );
  }
}

export default Information;
