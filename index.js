const {Client, GatewayIntentBits} = require('discord.js')
const mongoose = require("mongoose")
require('dotenv/config')

const messageCountSchema = require("./message-count-schema")

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
        'GM',
        'GN'
    ];

    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({ activities: [{ name: `${status}`}]});
    }, 3600000);

    mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true
    })
})

client.on('messageCreate', message => {
    if (message.content === 'gm') {
        message.reply('GM!')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'GM') {
        message.reply('GM!')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'Gm') {
        message.reply('GM!')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'gM') {
        message.reply('GM!')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'gN') {
        message.reply('GN.')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'Gn') {
        message.reply('GN.')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'GN') {
        message.reply('GN.')
    }
})

client.on('messageCreate', message => {
    if (message.content === 'gn') {
        message.reply('GN.')
    }
})

client.on('messageCreate', async (message) => {
    await messageCountSchema.findOneAndUpdate({
        _id: message.author.id
    }, {
        _id: message.author.id,
        $inc: {
            messageCount: 1,
        }
    }, {
        upsert: true
    })
})

client.login(process.env.TOKEN)
