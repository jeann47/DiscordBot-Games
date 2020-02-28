const ytdl = require('ytdl-core');

function play(song, voiceChannel, type = 'local') {
  voiceChannel
    .join()
    .then(connection => {
      const dispatcher =
        type === 'local'
          ? connection.playFile(song)
          : connection.playStream(ytdl(song));
      dispatcher.on('end', () => {
        voiceChannel.leave();
      });
    })
    .catch(err => console.log(err));
}

module.exports = play;
