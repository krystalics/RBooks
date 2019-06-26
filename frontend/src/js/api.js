import service from './Service';

// let baseURL=`http://www.rbooks.top:8080`; //远程部署
let baseURL=`http://localhost:8080`; //debug
//
// let baseURL='http://100.64.166.151:8080'; //让手机访问

//接下来三个方法是在 commentApp里的
export function _getComments(data) {
  return service.post(`${baseURL}/read/getcomments`,data);
}

export function _addComment(data) {
  return service.post(`${baseURL}/read/addcomment`,data);
}

export function _deleteComment(data) {
  return service.post(`${baseURL}/read/deletecomment`,data);
}


// 接下来两个方法是在 home中的

export function _getHot(page) {
  return service.get(`${baseURL}/home/gethot?page=${page}`);
}

export function _getNew(page) {
  return service.get(`${baseURL}/home/getnew?page=${page}`);
}

export function _getSearch(word) {
  return service.get(`${baseURL}/home/getsearch?word=${word}`);
}

export function _getTag(word) {
  return service.get(`${baseURL}/home/gettag?tag=${word}`);
}

//接下来2个方法是在 login组件中

export function _login(data) {
  return service.post(`${baseURL}/user/login`,data);
}

export function _register(data) {
  return service.post(`${baseURL}/user/register`,data);
}


//下面一个在 Message组件中

export function _getCommentsByUserName() {
  return service.get(`${baseURL}/message?commentuser=${localStorage.getItem('name')}`);
}

//下面一个在 MyPage组件中

export function _getMypage() {
  return service.get(`${baseURL}/mypage?userid=${localStorage.getItem('userid')}`);
}


//下面几个在 read包中
// MainContent组件中
export function _getChapter(data) {
  return service.post(`${baseURL}/read/getchapter`,data);
}

export function _deleteChapter(data) {
  return service.post(`${baseURL}/read/deletechapter`,data);
}

// Read组件
export function _getDirectory(data) {
  return service.get(`${baseURL}/read/getdirectory?bookid=${data}`);
}

// ReadSiderBar组件中

export function _isFollowBook(data) {
  return service.post(`${baseURL}/read/isfollowbook`,data);
}

export function _isFollowAuthor(data) {
  return service.get(`${baseURL}/read/isfollowauthor?userid=${data.userid}&authorname=${data.authorname}`);
}

export function _addFollowBook(data) {
  return service.post(`${baseURL}/read/addfollowbook`,data);
}

export function _deleteFollowBook(data) {
  return service.post(`${baseURL}/read/deletefollowbook`,data);
}

export function _addFollowAuthor(data) {
  return service.get(`${baseURL}/read/addfollowauthor?userid=${data.userid}&authorname=${data.authorname}`);
}

export function _deleteFollowAuthor(data) {
  return service.get(`${baseURL}/read/deletefollowauthor?userid=${data.userid}&authorname=${data.authorname}`);
}


// 在 Settings组件中

export function _updateSettings(data) {
  return service.post(`${baseURL}/settings/updatesettings`,data);
}

export function _getSettings(data) {
  return service.get(`${baseURL}/settings/getsettings?userid=${data}`);
}


// 在Chapter组件中
export function _updateChapter(param,data) {
  return service.post(`${baseURL}/write/updatechapter?oldName=${param}`, data);
}

//Write组件
export function _getWrite(param) {
  return service.get(`${baseURL}/write/getwrite?author=${param}`);
}

export function _addBook(data) {
  return service.post(`${baseURL}/write/addbook`,data);
}

export function _deleteBook(param) {
  return service.get(`${baseURL}/write/deletebook?bookid=${param}`);
}





