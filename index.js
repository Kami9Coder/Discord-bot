const {Client, Intents}= require('discord.js');
const {token}= require('./config.json');
const bot = new Client ({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const googleAPI = require('./externalAPIs/googleQR');

bot.login(token);

bot.once('ready', ()=> {
    console.log('Bot Ready!');
    
})

bot.on('messageCreate', (message)=>
{
    if(message.author.id===bot.user.id) return;

    if(message.content==="ping"){
        message.reply("pong");
    }
    
    if(message.content==="ding"){
        message.reply("dong");
    }
    

}
)

bot.on('interactionCreate', async interaction =>{
    if(!interaction.isCommand()) return;

    const {commandName}= interaction;

    if(commandName==='do-something')
    {
        await interaction.reply('working!');
    }

    if(commandName==='qr')
    {
            const url = interaction.options.getString('url');
            const height = interaction.options.getString('height');
            const width = interaction.options.getString('width');
            const color = interaction.options.getString('color');

            await interaction.reply(googleAPI.generateQR(url, height, width, color));
          
    }

    
}
)





