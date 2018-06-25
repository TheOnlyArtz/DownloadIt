const fs = require('fs');
const sf = require('snekfetch');
const ytdl = require('ytdl-core');
const fetcher = require('youtube-info');
const chalk = require('chalk');
const artzlogger = require('artzlogger');
const {API_key} = require('./config/settings.json');

const logger = new artzlogger;

let toDownload;

function downloadSong(name, path) {
  return new Promise(async (res, rej) => {
    let data = await sf.get(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=` + encodeURIComponent(name) + '&key=' + API_key);
      
    if (!data.body.items.length) {
        res({titles: name, found: false})
        return;
      }
    
    fetcher(data.body.items[0].id.videoId).then(async info => {
      console.log(chalk.green('Success!, Downloading'), info.title);

    fs.readdir(path, async (err, files) => {
      if (err) throw Error(err);
      toDownload = ytdl(data.body.items[0].id.videoId, { filter: (format) => format.container === 'm4a'})
      let title = info.title.replace(/\.|\…|\-|\?|\#|\!|\@|\$|\%|\^|\&|\*|\(|\)|\_|\=|\+|[0-9]|\"|\[|\]|\//g, ''); //Make sure to kick those errors.
      
      res({
        titles: title,
        buffer: toDownload,
        found: true
      });

      toDownload.pipe(fs.createWriteStream(path + '/' + title + '.mp3'))
    });
  });

}).catch(logger.error);

}

module.exports = downloadSong