const Discord = require('discord.js');
const fs = require('fs');
const Guide = require('./patterns/guide');
const sleep = require('./util/sleep');
const play = require('./util/play');

const client = new Discord.Client();

require('dotenv/config');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;
  if (
    !oldUserChannel &&
    newUserChannel &&
    newMember.user.id !== '677302567717437440'
  ) {
    client.channels.get(`434107062381707277`).send(Guide());
    client.channels
      .get(`434107062381707277`)
      .send(`${newMember.displayName} digite "entrar" para jogar!`);
  }

  if (newMember.selfMute && !oldMember.selfMute) {
    newMember.setDeaf(true);
  }
  if (!newMember.selfMute && oldMember.selfMute) {
    newMember.setDeaf(false);
  }
});

client.on('message', async msg => {
  const [command, attr] = msg.content.split(' ');

  if (command === 'in') {
    const a = client.channels.get('434107062381707280');
    play('https://www.youtube.com/watch?v=L_f1L1YL_pg', a, 'yt');
  }

  if (command === 'enviar') {
    const file = msg.attachments.first();
    saveFile(file.url, `./files/${file.filename}`);
  }

  // if (command === 'selecionar') {}

  if (command === 'buscar') {
    try {
      const buff = fs.readFileSync(`./files/${attr}`);
      const file = new Discord.Attachment(buff, `${attr}`);
      msg.channel.send(file);
    } catch (err) {
      msg.channel.send(`arquivo ${attr} não encontrado!`);
    }
  }

  if (command === 'cfg') {
    try {
      const buff = fs.readFileSync(`./files/${attr}.cfg`);
      const cfg = new Discord.Attachment(buff, `${attr}.cfg`);
      msg.channel.send(`Esta é a cfg de ${attr}`, cfg);
    } catch (err) {
      msg.channel.send(`cfg ${attr} não encontrada!`);
    }
  }

  // list the commands
  if (command === 'guia') {
    msg.channel.send(Guide());
  }

  // List who is playing
  if (command === 'jogando' || command === 'Jogando' || command === 'JOGANDO') {
    const users = client.channels.get('677643141871828992').members;
    users.map(user => {
      msg.channel.send(`${user}`);
    });
  }

  if (command === 'GARABIN') {
    const a = client.channels.get('669915711153635328');
    play('https://www.youtube.com/watch?v=L_f1L1YL_pg', a, 'yt');
  }

  // move to private voiceChannel
  if (command === 'entrar' || command === 'Entrar' || command === 'ENTRAR') {
    const users = client.channels.get('669915711153635328').members;
    await users.map(async user => {
      if (user === msg.member) {
        if (msg.member.voiceChannel && !user.sent) {
          user.sent = true;
          const privateChannel = client.channels.get('677643141871828992');
          play(
            'https://www.youtube.com/watch?v=BJrxKiW5f-4',
            privateChannel,
            'yt'
          );
          await sleep(10000);
          msg.member.setVoiceChannel('677643141871828992');
          user.sent = false;
        }
      }
    });
  }
});

client.login(process.env.LOGIN);
