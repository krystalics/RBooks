import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {_getHot, _getNew} from '../api'
import BookListInHome from "./BookListInHome";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      color1: 'link',
      color2: 'none',
      data: '暂无数据',
      oldData: '暂无数据',
      count: 0,  //记录一次搜索中的搜索次数,
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
      fifth: 5,
      active: [true, false, false, false, false]
    };

    this.handleMove = this.handleMove.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    this.handleHot();

  }

  handleSearchChange(e) {

    this.setState({search: e.target.value});
    if (e.target.value === "") { //当输入框中为空时，恢复原先的数据,搜索次数恢复为0
      this.setState({data: this.state.oldData, count: 0});

    }
  }

  handleSearch() {
    let {oldData} = this.state;
    let data = oldData.filter(item => {
      return item.name.indexOf(this.state.search) !== -1 || item.id
          === parseInt(this.state.search) || item.author.indexOf(
              this.state.search) !== -1; //如果等于-1说明不在里面
    });

    this.setState({data: data, count: this.state.count + 1});
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  /*
  * 下面这两个是一开始的东西。
  * */

  async handleHot() {
    this.setState({color1: 'link', color2: 'none'});

    const res = await _getHot(0);
    this.setState({data: res.data, oldData: res.data});
  }

  async handleNew() {
    this.setState({color1: 'none', color2: 'link'});

    const res = await _getNew(0);
    this.setState({data: res.data, oldData: res.data});
  }

  handleMove(e) {  //dis=1说明向前走一步  =-1说明向后走一步
    let dis = 0;
    switch (e.target.name) {
      case "next":
        dis = -1;
        break;
      case "prev":
        dis = 1;
        if (this.state.first === 1) {
          return;
        }
        break;
      case "first":
        dis = this.state.first - 1;
        break;
      case "last":
        dis = this.state.first - 10;  //这里因为还不知道 last有多少页，所以假设最后一页为10
    }
    this.setState({
      first: this.state.first - dis,
      second: this.state.second - dis,
      third: this.state.third - dis,
      fourth: this.state.fourth - dis,
      fifth: this.state.fifth - dis,
    });
  }

  async handlePageClick(e) {
    let {active} = this.state;
    for (let i = 0; i < 5; i++) {
      active[i] = false;
    }
    active[e.target.value - this.state.first] = true;
    this.setState({active: active});

    let res;
    if(this.state.color1==='link')  //如果处于hot的情况下，访问hot
      res = await _getHot(e.target.value - this.state.first);
    else{
      res = await _getNew(e.target.value - this.state.first);
    }
    if(res.data.length>0)
      this.setState({data: res.data, oldData: res.data});
    else{
      this.setState({data:"暂无更多数据"})
    }
  }

  render() {
    let item = <div className="nodata">第 {this.state.count} 次找不到数据</div>;
    if (this.state.data.length > 0) {
      item = <div><BookListInHome data={this.state.data}/></div>
    }
    return (
        <div>
          <div>
            <InputGroup>
              <FormControl placeholder="输入书名|编号|作者"
                           value={this.state.search}
                           onKeyUp={this.handleKeyUp.bind(this)}
                           onChange={this.handleSearchChange.bind(this)}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                        onClick={this.handleSearch.bind(this)}>搜索</Button>
              </InputGroup.Append>
            </InputGroup>
            <ButtonGroup>
              <Button variant={this.state.color1}
                      onClick={this.handleHot.bind(this)}>最热门</Button>

              <Button
                  variant={this.state.color2}
                  onClick={this.handleNew.bind(this)}>最新</Button>
            </ButtonGroup>
          </div>
          <hr/>

          {item}

          <ButtonGroup className="pagenation">
            <Button name="first" onClick={this.handleMove}
                    variant="secondary">&lt;&lt;</Button>
            <Button name="prev" onClick={this.handleMove}
                    variant="outline-primary">&lt;</Button>
            <Button active={this.state.active[0]} variant="outline-primary"
                    onClick={this.handlePageClick}
                    value={this.state.first}>{this.state.first}</Button>
            <Button active={this.state.active[1]} variant="outline-primary"
                    onClick={this.handlePageClick}
                    value={this.state.second}>{this.state.second}</Button>
            <Button active={this.state.active[2]} variant="outline-primary"
                    onClick={this.handlePageClick}
                    value={this.state.third}>{this.state.third}</Button>
            <Button active={this.state.active[3]} variant="outline-primary"
                    onClick={this.handlePageClick}
                    value={this.state.fourth}>{this.state.fourth}</Button>
            <Button active={this.state.active[4]} variant="outline-primary"
                    onClick={this.handlePageClick}
                    value={this.state.fifth}>{this.state.fifth}</Button>
            <Button name="next" onClick={this.handleMove}
                    variant="outline-primary">&gt;</Button>
            <Button name="last" onClick={this.handleMove}
                    variant="secondary">&gt;&gt;</Button>
          </ButtonGroup>

        </div>

    );
  }
}

export default Home;
