let url, DiscordRPC, ClientId, rpc, ready;

function connect() {
  DiscordRPC = require('discord-rpc');

  ClientId = '459996127752617984';
  DiscordRPC.register(ClientId);
  rpc = new DiscordRPC.Client({transport: 'ipc'});
}


function s() {
  connect()
  const startTimestamp = new Date();

  async function setActivity() {
    if (!rpc)
      return;

    const songName = document.downloadingRn
    const songStatus = document.songStatus
    let details = songName
    rpc.setActivity({
      details,
      state: songStatus,
      startTimestamp,
      largeImageKey: 'x',
      largeImageText: document.downloadingRn,
      smallImageKey: 'question',
      smallImageText: songStatus,
      instance: false
    });
  }

  rpc.on('ready', () => {
    ready = true;
    setActivity();

    setInterval(() => {
      setActivity();
    }, 15e3)
  })

  rpc.login(ClientId).catch(console.error);
}

function destroy() {
  rpc.destroy()
}

module.exports = {connect: s, destroy, ready};

