import React, {Component} from 'react'
import {checkCookie} from "../CookieService";

export default (WrappedComponent) => {
  class  NewComponent extends Component {
    // 这里定义登录权限组件， 如果缓存的logined = true 则渲染该组件，否则渲染成Login组件
    // 检查 cookie 是否还在，好像 localStorage 不能设置过期时间

    render() {
      if (checkCookie()) {
        return <WrappedComponent/>
      } else {
        // this.props.history.push('/home');  //使用React-router 重定向，但是这个组件需要使用 react-router 的服务
        return <div className="nologin">你还没有登录，请先登录！</div>
      }

    }
  }

  return NewComponent
}
