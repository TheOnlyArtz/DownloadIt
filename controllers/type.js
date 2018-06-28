$(document).ready(() => {
  $('.fixed-action-btn').click(() => {
    console.log('as6fas')
      $('.fixed-action-btn').init();
  })
  const mainStatus = () => {return window.localStorage.getItem('mainType')}
  console.log(mainStatus() === 'mp4')
  const mainStatusDisplay = document.getElementById('mainTypeStatus');
  const secondStatusDisplay = document.getElementById('secondTypeStatus');

  if (mainStatus() === null) window.localStorage.setItem('mainType', 'm4a');

  if (mainStatus() === 'm4a') {
    mainStatusDisplay.className = 'fas fa-music';
    secondStatusDisplay.className = 'fas fa-video';
  } else if (mainStatus() === 'mp4') {
    mainStatusDisplay.className = 'fas fa-video';
    console.log(mainStatus.className === 'mp4')
    secondStatusDisplay.className = 'fas fa-music';
  }
  
  $('#secondTypeStatus').click(() => {
    if (mainStatus() === 'm4a') {
      console.log('Successfuly changed type to mp4')
      
      window.localStorage.setItem('mainType', 'mp4');
      mainStatusDisplay.className = 'fas fa-video';
      secondStatusDisplay.className = 'fas fa-music';
    } else if (mainStatus() === 'mp4') {
      console.log('Successfuly changed type to m4a')
      
      window.localStorage.setItem('mainType', 'm4a');
      mainStatusDisplay.className = 'fas fa-music';
      secondStatusDisplay.className = 'fas fa-video';
    }
  });
})


  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });