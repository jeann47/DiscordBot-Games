const Discord = require('discord.js');
const request = require('request')
const client = new Discord.Client();
const fs = require('fs')

require('dotenv/config')

let game = 'nada'
const Guide = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Comandos')
    .setURL('https://discord.js.org/')
    .setAuthor('Robertinho', 'https://i.imgur.com/NPtbcQM.png') //crocs
    .setDescription('Lista de comandos disponíveis')
    .addField('jogando', 'Lista todos que estão jogando no momento')
    .addField('entrar', 'Só funciona dentro da lista de espera, usado para entrar no canal de voz')
    .addField('automáticos', 'Ao desabilitar o microfone, seu áudio também é desabilitado', true)
    // .addField('automáticos', 'Ao desabilitar o microfone, seu áudio também é desabilitado', true)
    .setImage('https://i.imgur.com/9oX2b2n.jpg') //crocs
    .setTimestamp()
    .setFooter('Desenvolvido por Jeann Carlos Batemarque', 'https://i.imgur.com/NPtbcQM.png');



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember, msg) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(!oldUserChannel && newUserChannel) {
    client.channels.get(`434107062381707277`).send(Guide);
    client.channels.get(`434107062381707277`).send(`${newMember.displayName} digite "entrar" para jogar!`)
  }

  if(newMember.selfMute && !oldMember.selfMute) {
    newMember.setDeaf(true)
  } 
  if(!newMember.selfMute && oldMember.selfMute) {
    newMember.setDeaf(false)
  }
})


client.on('message', async msg => {

  let [command, attr] = msg.content.split(' ')

  if(command === 'enviar') {
    let file = msg.attachments.first()
    request.get(file.url).on('error', console.error).pipe(fs.createWriteStream(`./files/${file.filename}`))
  }

  if(command === 'buscar') {
    try {
      const buff = fs.readFileSync(`./files/${attr}`)
      const file = new Discord.Attachment(buff, `${attr}`);
      msg.channel.send(file)
    } catch(err) {
      msg.channel.send(`arquivo ${attr} não encontrado!`)
    }
  }

  if(command === 'cfg') {
    try {
      const buff = fs.readFileSync(`./files/${attr}.cfg`)
      const cfg = new Discord.Attachment(buff, `${attr}.cfg`);
      msg.channel.send(`Esta é a cfg de ${attr}`, cfg)
    } catch(err) {
      msg.channel.send(`cfg ${attr} não encontrada!`)
    }
  }

  //list the commands
  if(command === 'guia') {
    msg.channel.send(Guide);
  }
  //set the game
  if(command === 'jogo') game = attr

  //List who is playing
  if(command === 'jogando' || command === 'Jogando' || command === 'JOGANDO') {
    let users = client.channels.get('677643141871828992').members;
    users.map(user => {
      msg.channel.send(`${user}, esta é sua cfg!`, cfg)
    })
    msg.channel.send(`Estão jogando ${game}`)
  }

  //Show if its working
  if(command === 'status') {
    msg.reply(`Estou de crocs`)
  }

  if(command === 'GARABIN') {
    msg.reply(`BIN GARABIN BIN`, {tts: true})
  }

  //move to private voiceChannel
  if(command === 'entrar' ||command === 'Entrar' ||command === 'ENTRAR') {
    let users = client.channels.get('669915711153635328').members;
    await users.map(async user => {
      if(user === msg.member) {
        if(msg.member.voiceChannel && !user.sent) {
          user.sent = true;
          msg.channel.send(`${msg.member.displayName} entrará na conversa em 10 segundos`, {tts: true})
          await sleep(10000)
          msg.member.setVoiceChannel('677643141871828992')
          user.sent = false
        }
      }
    })
   
  }
  
})
  
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.LOGIN)
