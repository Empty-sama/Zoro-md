import fs from 'fs'
import pkg from 'whatsapp-web.js'
const { MessageMedia } = pkg

export default {
    cmd: ['tool'],
    response: async (msg, zoro, mf) => {
    	if (mf.is.quoted && mf.quoted.msg.type=='image'){
            await msg.reply(mf.quoted.media, mf.from,{ caption: (mf.quoted.msg.body) ? `Caption: ${mf.quoted.msg.body}` : ''})
        } else return msg.reply('*reply to a view once message*')
    }
}