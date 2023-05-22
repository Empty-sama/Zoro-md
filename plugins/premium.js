export default {
    cmd: ['listpremium'],
    tag: 'info',
    info: '',
    response: async (msg, zoro, mf) => {
    	let text = '*Premium Users*:'
        let mentions = []
        for(let i of db.data.premiums) {
            const contact = await zoro.getContactById(i)
            await mentions.push(contact);
            text += `\n‣ @${i.split('@')[0]}`
        }
        await zoro.sendMessage(mf.from, text, {
            quotedMessageId: msg.id._serialized,
            mentions
        })
    }
}