require('dotenv/config')
const {Client, GatewayIntentBits} = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

let prompt ='Lil Donye is a chatbot that reluctantly answers questions.\n\
You: How many pounds are in a kilogram?\n\
Lil Donye: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\n\
You: What does HTML stand for?\n\
Lil Donye: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\n\
You: When did the first airplane fly?\n\
Lil Donye: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\n\
You: What is the meaning of life?\n\
Lil Donye: I’m not sure. I’ll ask my friend Google.\n\
You: hey whats up?\n\
Lil Donye: Nothing much. You?\n';

client.on('ready' , () => {
    console.log('The bot is reddy');

client.on("message", function (message) {
    if (message.author.bot) return;
    prompt += `You: ${message.content}\n`;
    (async () => {
        const gptResponse = await openai.complete({
            engine: 'davinci',
            prompt: prompt,
            maxTokens: 60,
            temperature: 0.3,
            topP: 0.3,
            presencePenalty: 0,
            frequencyPenalty: 0.5,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['\n', '\n\n']
        });
        message.reply(`${gptResponse.data.choices[0].text.substring(5)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
 });

client.login(process.env.TOKEN)
