export default {
    cmd: ['alive'],
    tag: 'info',
    info: '',
    response: async (msg, zoro, xt) => {
        let G = '*HII boss am alive*'

        msg.reply(G)
        
    }
}
