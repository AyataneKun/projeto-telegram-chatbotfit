const YouTube = require('youtube-node');
const config = require('./youtube-config.json');

const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideoURL(message, queryTextLocal, queryTextAction){
    return new Promise((resolve, reject) => {
        youtube.search(`${queryTextAction} em ${queryTextLocal}`, 2, function(error, result){
            if(!error){
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeURL = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`)
                resolve(`${message} ${youtubeURL.join(`, `)}`);
            } else{
                reject('Deu Erro!');
            }
        });
    });
};

module.exports.searchVideoURL = searchVideoURL;