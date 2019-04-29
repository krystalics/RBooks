import axios from 'axios';

let baseURL=`http://192.168.0.106:8080`;


//接下来三个方法是在 commentApp里的
export function _getComments(data) {
  return axios.post(`${baseURL}/read/getcomments`,data);
}

export function _addComment(data) {
  return axios.post(`${baseURL}/read/addcomment`,data);
}

export function _deleteComment(data) {
  return axios.post(`${baseURL}/read/deletecomment`,data);
}


// 接下来两个方法是在 home中的

export function _getHot() {
  return axios.get(`${baseURL}/home/gethot`);
}

export function _getNew() {
  return axios.get(`${baseURL}/home/getnew`);
}

//接下来2个方法是在 login组件中

export function _login(data) {
  return axios.post(`${baseURL}/user/login`,data);
}

export function _register(data) {
  return axios.post(`${baseURL}/user/register`,data);
}


//下面一个在 Message组件中

export function _getCommentsByUserName() {
  return axios.get(`${baseURL}/message?commentuser=${localStorage.getItem('name')}`);
}

//下面一个在 MyPage组件中

export function _getMypage() {
  return axios.get(`${baseURL}/mypage?userid=${localStorage.getItem('userid')}`);
}


//下面几个在 read包中
// MainContent组件中
export function _getChapter(data) {
  return axios.post(`${baseURL}/read/getchapter`,data);
}

export function _deleteChapter(data) {
  return axios.post(`${baseURL}/read/deletechapter`,data);
}

// Read组件
export function _getDirectory(data) {
  return axios.get(`${baseURL}/read/getdirectory?bookid=${data}`);
}

// ReadSiderBar组件中

export function _isFollowBook(data) {
  return axios.post(`${baseURL}/read/isfollowbook`,data);
}

export function _isFollowAuthor(data) {
  return axios.get(`${baseURL}/read/isfollowauthor?userid=${data.userid}&authorname=${data.authorname}`);
}

export function _addFollowBook(data) {
  return axios.post(`${baseURL}/read/addfollowbook`,data);
}

export function _deleteFollowBook(data) {
  return axios.post(`${baseURL}/read/deletefollowbook`,data);
}

export function _addFollowAuthor(data) {
  return axios.get(`${baseURL}/read/addfollowauthor?userid=${data.userid}&authorname=${data.authorname}`);
}

export function _deleteFollowAuthor(data) {
  return axios.get(`${baseURL}/read/deletefollowauthor?userid=${data.userid}&authorname=${data.authorname}`);
}


// 在 Settings组件中

export function _updateSettings(data) {
  return axios.post(`${baseURL}/settings/updatesettings`,data);
}

export function _getSettings(data) {
  return axios.get(`${baseURL}/settings/getsettings?userid=${data}`);
}


// 在Chapter组件中
export function _updateChapter(param,data) {
  return axios.post(`${baseURL}/write/updatechapter?oldName=${param}`, data);
}

//Write组件
export function _getWrite(param) {
  return axios.get(`${baseURL}/write/getwrite?author=${param}`);
}

export function _addBook(data) {
  return axios.post(`${baseURL}/write/addbook`,data);
}

export function _deleteBook(param) {
  return axios.get(`${baseURL}/write/deletebook?bookid=${param}`);
}





