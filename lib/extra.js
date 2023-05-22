import event from './event.js'
import moment from 'moment-timezone'
import chalk from 'chalk'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import PhoneNumber from'awesome-phonenumber'

let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
let mf = {}

export default async (msg, zoro) => {

    await db.read()

	let info = zoro.info
	const chat = await msg.getChat()
    const contact = await msg.getContact()
    let prefixs = [ '.', '/', '#' ]

    mf.from = msg.from
    mf.number = contact.number
    mf.numberId = contact.id._serialized
    mf.phoneNumber = await PhoneNumber(`+${mf.number}`).getNumber('international')
    mf.name = contact.pushname
    mf.type = msg.type
    mf.body = msg.body.trim()
    mf.prefix = mf.body.split``[0]
    mf.cmd = prefixs.includes(mf.prefix) ? mf.body.substring(1).split` `[0].toLowerCase() : ''
    mf.args = mf.body.split` `.slice(1)
    mf.text = mf.args.join` `
    //mf.contact = await client.getContactById(mf.numberId)

    mf.is = {}
        mf.is.group = chat.isGroup
        mf.is.owner = db.data.owners.includes(mf.numberId)
        mf.is.premium = db.data.premiums.includes(mf.numberId)
        mf.is.business = contact.isBusiness
        mf.is.media = msg.hasMedia
        mf.is.quoted = msg.hasQuotedMsg
        mf.is.viewOnce = msg._data.isViewOnce || false
        mf.is.noBody = mf.body == ''
        mf.is.noTemf = mf.text == ''
        mf.is.fromMe = msg.fromMe
        mf.is.reg = mf.numberId in db.data.users
        mf.is.unreg = mf.is.reg == false
        mf.is.cmd = db.data.cmds.includes(mf.cmd)

    mf.group = {}
    if (chat.isGroup) {
        mf.group.name = chat.name
        mf.group.id = chat.id._serialized
        mf.group.owner = chat.groupMetadata.owner ? chat.groupMetadata.owner._serialized : chat.groupMetadata.descOwner._serialized
        mf.group.participants = chat.groupMetadata.participants
        let admin = []
        let superAdmin = []
        for ( let participant of mf.group.participants ) {
            if ( participant.isAdmin == true ) await admin.push(participant)
            if ( participant.isSuperAdmin == true ) await superAdmin.push(participant)
        }
        mf.group.admin = admin
        mf.group.superAdmin = superAdmin
    }

    mf.media = {}
    if (mf.is.media) {
        mf.media.msg = await msg.downloadMedia()
    }

    mf.quoted = {}
    if (mf.is.quoted) {
        mf.quoted.msg = await msg.getQuotedMessage()
        mf.quoted.media = await mf.quoted.msg.downloadMedia()
        mf.quoted.id = mf.quoted.msg.id._serialized
    }

	await event(msg, zoro, mf)
}

export { mf }
