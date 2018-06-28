function getfolder(e) {
  let files = e.target.files;
  let path = decodeURIComponent(encodeURIComponent(files[0].path)).replace(/\\/g, '/')
  window.localStorage.setItem('path', path)  // set download path
  document.pathAvilable = window.localStorage.getItem('path');
  document.getElementById('pathText').innerHTML = pathAvilable === null ? "" : document.pathAvilable;
}

const pathAvilable = window.localStorage.getItem('path');
document.getElementById('pathText').innerHTML = pathAvilable === null ? "" : pathAvilable;