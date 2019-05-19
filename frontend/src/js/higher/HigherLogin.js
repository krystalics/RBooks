import React, {Component} from 'react'

export default (WrappedComponent) => {
  class  NewComponent extends Component {
    // 这里定义登录权限组件， 如果缓存的logined = true 则渲染该组件，否则渲染成Login组件
    // 检查 cookie 是否还在，好像 localStorage 不能设置过期时间


    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }

    checkCookie() {
      let userid = this.getCookie("userid");
      return !(userid === null || userid === -1);
      //默认是-1  而无该key 则为''
    }

    render() {
      if (this.checkCookie()) {
        return <WrappedComponent/>
      } else {
        // this.props.history.push('/home');  //使用React-router 重定向，但是这个组件需要使用 react-router 的服务
        return <div className="nologin">你还没有登录，请先登录！</div>
      }

    }
  }

  return NewComponent
}
