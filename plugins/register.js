export default {
    cmd: ['register'],
    tag: 'other',
    response: async (msg, zoro, mf) => {
        if (mf.is.reg) {
            await msg.reply('*you are already registered*')
        } else {
            await msg.reply('*Register sucess*')
            db.data.users[mf.numberId] = {
                name: mf.name,
                number: mf.number,
                numberId: mf.numberId,
                level: 0
            }
            await db.write()
        }
    }
}