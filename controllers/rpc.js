const rpc = require('./rpc.js')
const btn = document.getElementById('rpEnable')

const RPCAvilable = window.localStorage.getItem('rpc');
document.pathAvilable = window.localStorage.getItem('path');
if (RPCAvilable === null) {
  window.localStorage.setItem('rpc', false);
}


const buttonState = window.localStorage.getItem('rpc');
if (buttonState === "true") {
  let p = btn.className + " green";
  btn.className = p 
  btn.innerText = 'ENABLED'
  window.localStorage.setItem('rpc', true);
  rpc.connect()

} else if (buttonState === "false") {
  let l = btn.className + " red"
  btn.className = l
  btn.innerText = 'DISABLED'
  window.localStorage.setItem('rpc', false);
}

function changeEn() {
  const current = window.localStorage.getItem('rpc');

  if (current === "false") {
    let p = btn.className.replace('red', 'green');
    btn.className = p;
    btn.innerText = 'ENABLED'
    window.localStorage.setItem('rpc', true);

//          rpc.connect()

  } else if (current === "true") {
    let l = btn.className.replace('green', 'red');
    btn.className = l
    btn.innerText = 'DISABLED'
    window.localStorage.setItem('rpc', false);
//          rpc.destroy() Investagating
  }
}