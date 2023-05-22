//process.on('uncaughtException', console.error)

import pkg from 'whatsapp-web.js'
const { Client, LocalAuth, MessageMedia } = pkg
import puppeteer from 'puppeteer'
import qrcode from 'qrcode-terminal'
import extra from './lib/extra.js'
import { intro, loading, online, log, delay, checkPlugins, watchPlugins } from './lib/functions.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import fs from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'


await intro()
await checkPlugins()
await watchPlugins()
await start()

async function start(){
    const zoro = new Client({
        authStrategy: new LocalAuth({
            dataPath: './auth',
            userDataDir: './auth/session'
        }),
        puppeteer: {
            headless: true,
            executablePath: '/nix/store/x205pbkd5xh5g4iv0g58xjla55has3cx-chromium-108.0.5359.94/bin/chromium-browser',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      })

     zoro.initialize()

    zoro.on('qr', qr => {
        qrcode.generate(qr, {small: true})
        log('[!] scan the QR', 'bgGreen')
    })

    zoro.on('loading_screen', (percent, message) => {
        loading(percent, message)
    })

    zoro.on('authenticated', () => {
        log('[!] Authenticated', 'bgGreen')
    })

    zoro.on('auth_failure', m => {
        log(`[!] Authenticated Failure ${m}`,'bgRed')
    })

    zoro.on('disconnected', (reason) => {
        log('zxoro was logged out '+reason, 'bgRed')
        start()
    })

    zoro.on('ready', () => {
        log('BOT Active','bgGreen')
        //online(owner.ig)
        zoro.sendMessage(owner.numberId, '*BOT Active*')
    })

    await zoro.on('message_create', async (msg) => extra( msg, zoro ))
}
