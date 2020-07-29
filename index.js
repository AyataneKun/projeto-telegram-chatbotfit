const TelegramBot = require('node-telegram-bot-api');
const dialogFlow = require('./dialogflow');
const youtube = require('./youtube')

const token ='TOKEN DO SEU BOT TELEGRAM';
const bot = new TelegramBot(token, {polling:true});

bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogFlow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if(dfResponse.intent === 'treinos em casa'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.locais.stringValue, dfResponse.fields.exercicios.stringValue);
    }

    bot.sendMessage(chatId, responseText);
});
