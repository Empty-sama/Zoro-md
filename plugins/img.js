import { Configuration, OpenAIApi } from 'openai'
import pkg from 'whatsapp-web.js'
const { MessageMedia } = pkg

export default {
    cmd: ['img'],
    tag: 'openai',
    info: 'ImageGPT',
    response: async (msg, zoro, mf) => {
        if (mf.is.noText) return msg.reply('*give a task*')
        try {
            const config = new Configuration({
                apiKey: db.data.apikey,
            })
            const openai = new OpenAIApi(config)
            const res = await openai.createImage({
                prompt: mf.text,
                n: 1,
                size: "256x256"
            })
            const media = await MessageMedia.fromUrl(res.data.data[0].url)
            await msg.reply(media, msg.from, {caption: mf.text})
        }
        catch(err) {
            console.error(err)
            await msg.reply('*Too Many Requests*')
        }
    }
}