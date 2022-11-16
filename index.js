const {Client, GatewayIntentBits} = require('discord.js');
const cleverbot = require('cleverbot-free');
require('dotenv/config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
    ],
})

client.on('ready' , () => {
    console.log('The bot is reddy');

    const activities = [
        'Sleeping',
        'GM',
        'GN'
    ];

    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({ activities: [{ name: `${status}`}]});
    }, 3600000);
    
});

let conversation = [];

client.on("messageCreate", message => {
    if (message.author.bot) return false;
    if (message.mentions.has(client.user.id)) {
        let text = message.content;
        text = text.substring(text.indexOf(">") +2, text.length);
        console.log(text);

        //Get a AI response and add test / res to conversation
        cleverbot(test,conversation).then(res=>{
            conversation.push(text);
            conversation.push(res);
            message.channel.send(res);
        });
    }
});

client.on('messageCreate', message => {
    if (message.content === 'gm') {
        message.reply('GM!')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'GM') {
        message.reply('GM!')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'Gm') {
        message.reply('GM!')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'gM') {
        message.reply('GM!')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'gN') {
        message.reply('GN.')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'Gn') {
        message.reply('GN.')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'GN') {
        message.reply('GN.')
    }
});

client.on('messageCreate', message => {
    if (message.content === 'gn') {
        message.reply('GN.')
    }
});

client.login(process.env.TOKEN)