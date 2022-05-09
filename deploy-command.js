const {SlashCommandBuilder}= require('@discordjs/builders');
const {REST}= require('@discordjs/rest');
const{Routes}= require('discord-api-types/v9');
const{clientId,guildId,token}= require('./config.json');



const commands= [
    new SlashCommandBuilder().setName('do-something').setDescription('Does something...'),

    new SlashCommandBuilder()
        .setName('qr')
        .setDescription('Generates QR code for the url provided')
        .addStringOption(option => option.setName('url').setDescription('url to be encoded'))
        .addStringOption(option => option.setName('height').setDescription('height of QR in pixels'))
        .addStringOption(option => option.setName('width').setDescription('width of QR in pixels'))
        .addStringOption(option => option.setName('color').setDescription('color of QR')),

 
    
        
]

const rest= new REST({version: '9'}).setToken(token)

rest.put(Routes.applicationGuildCommands(clientId,guildId), {body: commands.map(command=> command.toJSON() )})
    .then(()=> console.log('sucessfully registered application commands'))
    .catch(console.error);