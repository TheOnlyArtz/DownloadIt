const theme = () => {return window.localStorage.getItem('theme')}

if (theme() === null) {
  window.localStorage.setItem('theme', 'night')
}

const themeBtn = document.getElementById('themeBtn');
const pathBtn = document.getElementById('pathBtn');
const rpcText = document.getElementById('rpcText');
const pathText = document.getElementById('pathText');
const themeText = document.getElementById('themeText');
const songList = document.getElementsByClassName('theme');
const songForm = document.getElementById('SongForm');
const changelog = document.getElementById('modal1');
const mainTypeStatusAttribute = document.getElementById('mainTypeStatusAttribute')
const mainTypeStatusIcon = document.getElementById('mainTypeStatus')
const secondTypeStatusIcon = document.getElementById('secondTypeStatus')
const secondTypeStatusAttribute = document.getElementById('secondTypeStatusAttribute')

function updateComponents(mode) {
  if (mode === 'night') {
    themeBtn.innerHTML = 'Night <i class="fas fa-moon"></i>';
    themeBtn.className = 'waves-effect waves-light btn-small grey darken-3'
    pathBtn.className = 'btn-small grey darken-3'
    changelog.className = 'modal grey darken-4'
    mainTypeStatusAttribute.className = 'btn-floating btn-large grey darken-3'
    secondTypeStatusAttribute.className = 'btn-floating grey darken-3'
    document.body.style.cssText = 'background-color: #212121';
    pathText.style.color = "#eeeeee";
    rpcText.style.color = "#eeeeee";
    themeBtn.style.color = "#eeeeee";
    pathBtn.style.color = "#eeeeee";
    themeText.style.color = "#eeeeee";
    songForm.style.color = "#eeeeee";
    mainTypeStatusIcon.style.color = "#eeeeee"
    secondTypeStatusIcon.style.color = "#eeeeee"

    $('.modal-text').css('color', '#eeeeee');
    $('li').css('color', '#eeeeee');
    for (y in songList) {
      if (songList.hasOwnProperty(y)) {
        songList[y].style.color = "#eeeeee"
      }
    }

  } else if (mode === 'light') {
    themeBtn.innerHTML = 'Light  <i class="fas fa-sun"></i>';
    themeBtn.className = "waves-effect waves-light btn-small grey lighten-4"
    pathBtn.className = 'btn-small grey lighten-4'
    changelog.className = 'modal grey lighten-4'
    mainTypeStatusAttribute.className = 'btn-floating btn-large grey lighten-4'
    secondTypeStatusAttribute.className = 'btn-floating grey lighten-4'
    document.body.style.cssText = 'background-color: #ffffff '
    pathText.style.color = "#212121";
    rpcText.style.color = "#212121";
    themeBtn.style.color = "#212121";
    pathBtn.style.color = "#212121";
    themeText.style.color = "#212121";
    songForm.style.color = "#212121";
    mainTypeStatusIcon.style.color = "#212121"
    secondTypeStatusIcon.style.color = "#212121"

    for (y in songList) {
      if (songList.hasOwnProperty(y)) {
        songList[y].style.color = "#212121"
      }
    }
  }
}

if (theme() === 'night') {
  updateComponents('night')
} else if (theme() === 'light') {
  updateComponents('light')
}
function changeTheme() {
  if (theme() === 'night') {
    window.localStorage.setItem('theme', 'light');
    updateComponents('light');
  } else if (theme() === 'light') {
    window.localStorage.setItem('theme', 'night');
    updateComponents('night')
  }
}