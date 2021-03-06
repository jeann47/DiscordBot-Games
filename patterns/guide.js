const Discord = require('discord.js');

function Guide() {
  return new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Comandos')
    .setURL('https://gph.is/2cu8U3N')
    .setAuthor('Robertinho', 'https://i.imgur.com/NPtbcQM.png')
    .setDescription('Lista de comandos disponíveis')
    .addField('jogando', 'Lista todos que estão jogando no momento')
    .addField(
      'entrar',
      'Só funciona dentro da lista de espera, usado para entrar no canal de voz'
    )
    .addField(
      'selecionar',
      'Ao enviar um áudio com o texto "selecionar", este áudio poderá ser ouvido por todos quando você entrar no canal'
    )
    .addField(
      'enviar',
      'Ao enviar um arquivo no chat com o texto "enviar", esse arquivo é salvo'
    )
    .addField('buscar', 'Busca um arquivo salvo. ex: "buscar meme.jpg"')
    .addField(
      'cfg',
      'Busca uma cfg com base em seu nome. ex: "cfg jeans" retorna jeans.cfg'
    )
    .addField(
      'automáticos',
      'Ao desabilitar o microfone, seu áudio também é desabilitado',
      true
    )
    .setImage('https://media.giphy.com/media/tbyi455ahTA6A/giphy.gif') // frog
    .setTimestamp()
    .setFooter(
      'Desenvolvido por Jeann Carlos Batemarque',
      'https://i.imgur.com/NPtbcQM.png'
    );
}

module.exports = Guide;
