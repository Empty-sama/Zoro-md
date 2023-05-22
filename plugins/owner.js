export default {
    cmd: ['owner'],
    tag: 'info',
    info: '',
    response: async (msg, zoro, mf) => {
        let author = await zoro.getContactById(owner.numberId)
        zoro.sendMessage(mf.from, `*Owner*: @${owner.number}`, {
            quotedMessageId: msg.id._serialized,
            mentions: [author]
        })
    }
}