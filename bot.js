const Discord = require('discord.js');
const fs = require('fs');
const Guide = require('./patterns/guide');
const sleep = require('./util/sleep');
const play = require('./util/play');
const saveFile = require('./util/saveFile');

const client = new Discord.Client();

require('dotenv/config');

let afking = false;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  const general = client.channels.get(`414943180983762946`);
  const newUserChannel = newMember.voiceChannel;
  const oldUserChannel = oldMember.voiceChannel;
  const privateChannel = client.channels.get(`677643141871828992`);
  if (privateChannel.members.size === 1 && !afking) {
    await sleep(30000);
    afking = true;
    if (privateChannel.members.size === 1 && afking) {
      play('https://www.youtube.com/watch?v=5qrQcpWyh1o', privateChannel, 'yt');
    }
  }
  if (
    privateChannel.members.size >= 3 ||
    (privateChannel.members.find(val => val.id === '677302567717437440') &&
      privateChannel.members.size === 1)
  ) {
    privateChannel.leave();
    afking = false;
  }

  if (
    !oldUserChannel &&
    newUserChannel &&
    newMember.user.id !== '677302567717437440'
  ) {
    general.send(Guide());
    general.send(`${newMember.displayName} digite "entrar" para jogar!`);
  }

  if (newMember.selfMute && !oldMember.selfMute) {
    newMember.setDeaf(true);
  }
  if (!newMember.selfMute && oldMember.selfMute) {
    newMember.setDeaf(false);
  }
});

client.on('message', async msg => {
  const privateChannel = client.channels.get(`677643141871828992`);
  const waitList = client.channels.get(`669915711153635328`);
  const [command, attr] = msg.content.split(' ');

  if (command === 'in') {
    // play(`./greeting/${msg.member.displayName}.mp3`, privateChannel);
    const user = privateChannel.members.find(
      val => val.id === '677302567717437440'
    );
    console.log(user);
  }

  if (command === 'enviar') {
    const file = msg.attachments.first();
    saveFile(file.url, `./files/${file.filename}`);
  }

  if (command === 'selecionar') {
    const file = msg.attachments.first();
    saveFile(file.url, `./waiting/${msg.member.user.username}.mp3`);
  }

  if (
    command === 'check' &&
    (msg.member.id === '360184430540619776' ||
      msg.member.id === '414942740837826662')
  ) {
    msg.mentions.users.map(user => {
      fs.copyFileSync(
        `./waiting/${user.username}.mp3`,
        `./greeting/${user.username}.mp3`
      );
      fs.unlinkSync(`./waiting/${user.username}.mp3`);
    });
  }

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
    const users = privateChannel.members;
    users.map(user => {
      msg.channel.send(`${user}`);
    });
  }

  if (command === 'GARABIN') {
    play('https://www.youtube.com/watch?v=L_f1L1YL_pg', waitList, 'yt');
  }

  // move to private voiceChannel
  if (command === 'entrar' || command === 'Entrar' || command === 'ENTRAR') {
    const users = waitList.members;
    await users.map(async user => {
      if (user === msg.member) {
        if (msg.member.voiceChannel && !user.sent) {
          user.sent = true;

          const customFile = fs.existsSync(
            `./greeting/${msg.member.user.username}.mp3`
          );

          if (customFile) {
            play(`./greeting/${msg.member.user.username}.mp3`, privateChannel);
          } else {
            play(
              'https://www.youtube.com/watch?v=L_f1L1YL_pg',
              privateChannel,
              'yt'
            );
          }

          await sleep(10000);
          msg.member.setVoiceChannel('677643141871828992');
          user.sent = false;
        }
      }
    });
  }
});

client.login(process.env.LOGIN);
