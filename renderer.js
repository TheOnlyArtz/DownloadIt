// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let toChange = -1;
const downloadSong = require('./downloadSong');
const fs = require('fs');
let lastTerm;
async function s () {
    document.getElementById("SongForm").addEventListener("keyup", async (e) => {
      if (e.key !== "Enter") return;
      
      const path = document.pathAvilable;
      if (path === null) {
        alert('Please choose a path before trying to download a song');
        return
      }
      
      toChange++
      let form = document.getElementById('SongForm');
      let value = form.value
      let themeType = window.localStorage.getItem('theme');
      if (lastTerm === value) return; //Don't keep going if spamming same result.
      lastTerm = value;
      
      if (themeType === 'night') {
        M.toast({html: `<span style="color:white">Looking for: ${value}</span>`, classes: 'grey darken-3'})
      } else if (themeType === 'light') {
        M.toast({html: `<span style="color:black">Looking for: ${value}</span>`, classes: 'grey lighten-4'})
      }// Launch a responsive toast.
      const downloadInfo = await downloadSong(value, path);
      
      const position = {}
      if (position[downloadInfo.titles]) delete position[downloadInfo.titles];
      
      const found = downloadInfo.found
      document.downloadingRn = downloadInfo.titles;
      document.songStatus = found ? "Downloading" : "Didn't find results";
      
      position[downloadInfo.titles] = {pos: toChange};
      
      let node = document.createElement("LI"); 
      node.className = "theme"
      
      if (themeType === 'night') {
        node.style.color = "white"
      } else if (themeType === "light") {
        node.style.color = "#212121"  
      }
      
      let textnode = document.createTextNode(found ? "Downloading: " + downloadInfo.titles : `Didn\'t find results for: ` + downloadInfo.titles);         // Create a text node
      node.appendChild(textnode);  
      document.getElementById("list").appendChild(node);

      if (found) {
         downloadInfo.buffer.on('end', async () => {
            let pp = document.getElementById('list').getElementsByTagName('li')
            let songPos = position[downloadInfo.titles].pos;
            console.log(songPos)
            pp[songPos].innerHTML = "✓: " + downloadInfo.titles;
            document.downloadingRn = "✓: " + downloadInfo.titles;    
            document.songStatus = 'Finished'
          })
        }

      form.value = ""
  });
}

s();
