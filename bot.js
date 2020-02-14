const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember, msg) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(!oldUserChannel && newUserChannel) {
    client.channels.get(`668073025848999950`).send(`${newMember.displayName} digite "entrar" para jogar!`)
  }
})
//move to private voiceChannel
client.on('message', async msg => {
  if(msg.content === 'entrar') {
    client.channels.get(`668073025848999950`).send(`${msg.member.displayName} entrará na conversa em 10 segundos`, {tts: true})
    await sleep(10000)
    msg.member.setVoiceChannel('677643141871828992')
  }
})
//Show if its working
client.on('message', async msg => {
  if(msg.content === 'status') {
    msg.reply(`Estou de crocs`)
  }
})

client.on('message', msg => {
  if(msg.content === 'jogando') {
    let a = client.voiceConnections.filter((conn) => conn.server.id === 677643141871828992)[0].voiceChannel.members
    console.log(a)
  }
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.LOGIN)
