const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content === 'hm') {
    client.channels.get(`668073025848999950`).send(`${newMember.displayName} digite !entrar para jogar!`)
  }
})
client.on('voiceStateUpdate', (oldMember, newMember, msg) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(!oldUserChannel && newUserChannel) {
    client.channels.get(`668073025848999950`).send(`${newMember.displayName} digite "entrar" para jogar!`)
  }
})

client.on('message', async msg => {
  if(msg.content === 'entrar') {
    client.channels.get(`668073025848999950`).send(`${msg.member.displayName} entrará na conversa em 10 segundos`, {tts: true})
    await sleep(10000)
    msg.member.setVoiceChannel('677643141871828992')
    // msg.member.voiceChannel.join('677639323302101005').then(() => console.log('moved'))
  }
})

client.on('message', msg => {
    if (msg.content === 'conn') {
      if (msg.member.voiceChannel) {
          msg.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
              msg.reply('I have successfully connected to the channel!');
            })
            .catch(console.log);
        } else {
          msg.reply('You need to join a voice channel first!');
        }
    }
    if (msg.content === 'say') {
        
    }
});


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login('Njc3MzAyNTY3NzE3NDM3NDQw.XkXayQ.BwlkTOO3uV1d1f49edt9MhH-lpE');
