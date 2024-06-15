//créditos del code SAMU
import axios from 'axios'
const {
    proto,
   generateWAMessageFromContent,
    prepareWAMessageMedia,
    generateWAMessageContent,
    getDevice
} = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '> 🍟: *Ingresa lo que desea buscar en Tiktok*', m)
    async function createVideo(url) {
        const { videoMessage } = await generateWAMessageContent({
            video: { url }
        }, { upload: conn.waUploadToServer })
        return videoMessage
    }
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
    try {
        let push = [];
        let { data } = await axios.get(`https://apis-starlights-team-cbb6f3a3.koyeb.app/starlight/tiktoksearch?text=${text}`)
        let res = data.data
        shuffleArray(res)
        let ult = res.splice(0, 7)
        let i = 1
        for (let result of ult) {
            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: null
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: "© Starlights Team"
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `${result.title}`,
                    hasMediaAttachment: true,
                    videoMessage: await createVideo(result.nowm)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                     /*   {
                            name: "cta_url",
                            buttonParamsJson: `{"display_text":"url","Link":"${result.nowm}","merchant_url":"${result.nowm}"}`
                        }*/
                    ]
                })
            });
        }
        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: '*\`T I K T O K - S E A R C H\`*'
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: null
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: [...push]
                        })
                    })
                }
            }
        }, {})
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {        
}}
handler.command = ['tiktoksearch']
export default handler
