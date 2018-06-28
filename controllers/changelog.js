$(document).ready(function(){
  electron.ipcRenderer.on('changelog', (event, message) => {
    message = message.replace(/\<li\>/g, `<li class="modal-text"> - `);
    document.getElementById('modal1').innerHTML = document.getElementById('modal1').innerHTML + message
    document.getElementById('modal-header').innerHTML = `Changelog v${pack.version}:`
    if (theme() === 'night') {
      $('.modal-text').css('color', 'white');
    } else if (theme() === 'light') {
      $('.modal-text').css('color', 'black');
    }

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    const didChangelogAppear = window.localStorage.getItem('changelog');
    if (didChangelogAppear === null || didChangelogAppear !== document.appVersion) $('#modal-trigger').click();
    window.localStorage.setItem('changelog', document.appVersion);
  })
});  
