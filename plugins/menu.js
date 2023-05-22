import pkg from 'whatsapp-web.js'
const { MessageMedia } = pkg

export default {
    cmd: ['menu'],
    tag: 'main',
    info: 'menu',
    response: async (msg, zoro, mf) => {
        let guru = `Konnichiwa I AM ${bot.name3}\nA Bot developed by ${owner.name}\nMy prefix is *#*\nMy commands are\n\n  • *Alive*\n\n • *ai*\n\n • *img*\n\n • *s*\n\n • *readvo*`
        try {
            const media = MessageMedia.fromFilePath('./assets/Guru1.jpg')
             msg.reply(media, msg.from, {caption: guru})
        }
        catch(err) {
            console.error(err)
            await msg.reply('*Too Many Requests*')
        }
    }
}
