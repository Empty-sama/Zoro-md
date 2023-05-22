import fs from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { notif } from './functions.js'

export default async (msg, zoro, mf) => {

    notif()

    let files = fs.readdirSync('./plugins')
    for (let file of files) {
        let module = await import('../plugins/'+file+'?update='+Date.now())
        if (!module.default||typeof module.default !== 'object'||!module.default.cmd) continue
        let plugin = module.default
        if (plugin.cmd.includes(mf.cmd)) {
            if (!(mf.is.fromMe)&&mf.is.unreg) {
                let module = await import('../plugins/register.js?update='+Date.now()),
                plugin = module.default
                if(plugin.cmd.includes(mf.cmd)) return plugin.response(msg, zoro, mf)
                else return msg.reply('*[ ! ] You havent registered yet*\nuse .reg to register')
            }
            await msg.react('⏱')
            await plugin.response(msg, zoro, mf)
            await msg.react('✅')
        }
    }
}
