import '../config.js'
import PhoneNumber from'awesome-phonenumber'
import moment from 'moment-timezone'

export default {
    cmd: ['s', 'stiker', 'sticker'],
    tag: 'sticker',
    info: '',
    response: async (msg, zoro, mf) => {
        //console.log(mf.quoted.msg.type)
        let dmy = moment.tz('Asia/Kolkata').format('DD-MM-YYYY')
        let hms = moment.tz('Asia/Kolkata').format('HH:mm:ss')
        let number=PhoneNumber(`+${mf.number}`).getNumber('international')
        let stickerName = `${bot.name3}\n@${owner.ig}`, stickerAuthor = `Sticker by:\n${number}`

        //const quotedMsg = await msg.getQuotedMessage()
        if (msg.hasMedia && (mf.type == "image" || mf.type == "video")) {
            //let media = await msg.downloadMedia()
            return msg.reply(mf.media.msg, mf.from, { sendMediaAsSticker: true, stickerName, stickerAuthor })
        } else if (mf.is.quoted && (mf.quoted.msg.type == "image" || mf.quoted.msg.type == "video")) {
            //let media = await mf.quoted.downloadMedia()
            return msg.reply(mf.quoted.media, mf.from, { sendMediaAsSticker: true, stickerName, stickerAuthor })
        } else {
            return msg.reply("*Reply to a media*")
        }
    }
}