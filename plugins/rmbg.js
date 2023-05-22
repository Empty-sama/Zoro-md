import axios from "axios"
import { mf } from "../lib/extra.js"


export default {
    cmd: ['carbon'],
    tag: 'openai',
    info: 'ChatGPT',
    response: async({ zoro, mf }) => {
        if (mf.is.notext) return msg.reply('*give a task*')
        let data = await axios({
            url: 'https://carbonara.solopov.dev/api/cook',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { code: mf.text },
            responseType: 'arraybuffer'
        })
        zoro.sendMessage(mf.from, data?.data, { quoted: mf })
    }
}