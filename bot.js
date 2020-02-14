const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv/config')

let game = 'nada'

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


client.on('message', async msg => {

  let [command, attr] = msg.content.split(' ')

  //list the commands
  if(command === 'guia') {
    client.channels.get(`677727313659428877`).send(`
      digite "guia" a qualquer momento para saber as funções do bot.
      digite "status" para verificar o funcionamento do bot.
      Entre na Lista de espera e digite "entrar" para jogar.
      digite "jogo" para definir o jogo.
      digite "jogando" para listar quem está jogando no momento.
    `)
  }
  //set the game
  if(command === 'jogo') game = attr

  //List who is playing
  if(command === 'jogando') {
    let users = client.channels.get('677643141871828992').members;
    users.map(user => {
      client.channels.get(`668073025848999950`).send(`${user}`)
    })
    client.channels.get(`668073025848999950`).send(`Estão jogando ${game}`)
  }

  //Show if its working
  if(command === 'status') {
    msg.reply(`Estou de crocs`)
  }

  //move to private voiceChannel
  if(command === 'entrar') {
    client.channels.get(`668073025848999950`).send(`${msg.member.displayName} entrará na conversa em 10 segundos`, {tts: true})
    await sleep(10000)
    msg.member.setVoiceChannel('677643141871828992')
  }
})
  
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.LOGIN)
