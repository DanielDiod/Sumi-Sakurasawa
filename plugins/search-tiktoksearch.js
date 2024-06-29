import axios from "axios";

let handler = async (m, { conn, usedPrefix, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "*🍭 Ingrese lo que deseas buscar en  Tiktok .*",
      m,
    );
  await m.react("✅");
  try {
    let response = await axios.get(`https://delirius-api-oficial.vercel.app/api/tiktoksearch?query=${encodeURIComponent(text)}`);
    let results = response.data.meta;
    if (!results.length)
      return conn
        .reply(
          m.chat,
          "No se encontraron resultados, intenta con un nombre más corto.",
          m,
        )
        .then((_) => m.react("✖️"));
    let txt = '`- ＴｉｋＴｏｋ － Ｓｅａｒｃｈ`\n\n';
    for (let i = 0; i < (30 <= results.length ? 30 : results.length); i++) {
      let video = results[i];
      txt += `\n`;
      txt += `	🔖  *Titulo* : ${video.title}\n`;
      txt += `	🔖  *Duración* : ${video.duration} segundos\n`;
      txt += `	🔖  *Url* : ${video.url}\n`;
      txt += `	🔖  *Autor* : ${video.author.username || "×"}\n`;
      txt += `	🔖  *Views* : ${video.play}\n`;
      txt += `	🔖  *Likes* : ${video.like}\n\n`;
    }
    const url = "https://telegra.ph/file/dd053a0c4d2e7eba7cd3a.jpg"; 
    const responseImg = await axios.get(url, { responseType: 'arraybuffer' });
    await conn.sendFile(m.chat, responseImg.data, "thumbnail.png", txt, m, null, rcanal); 
    await m.react("✅");
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "Ocurrió un error al buscar en TikTok.", m);
    m.react("❌");
  }
};
handler.help = ["tiktoksearch"];
handler.tags = ["search"];
handler.command = ["tiktoksearch", "tiks"];
handler.register = true;
export default handler;
