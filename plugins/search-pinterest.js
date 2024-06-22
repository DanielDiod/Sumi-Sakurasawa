import axios from "axios";

let handler = async (m, { conn, text }) => {
  if (!text)
    return conn.reply(
      m.chat,
      "*🚩 Ingresa lo que deseas buscar en Pinterest.*",
      m,
    );
  await m.react("🎌");
  let response = await axios.get(`https://delirius-api-oficial.vercel.app/api/pinterest?text=${encodeURIComponent(text)}`);
  let results = response.data.result;
  if (!results.length)
    return conn
      .reply(
        m.chat,
        "No se encontraron resultados, intenta con otro término de búsqueda.",
        m,
      )
      .then((_) => m.react("✖️"));

  for (let i = 0; i < (results.length >= 5 ? 5 : results.length); i++) {
    let txt = '`- Ｐｉｎｔｅｒｅｓｔ-`';
    txt += `\n\n`;
    txt += `	🏳️  *Titulo* : ${results[i].title || "×"}\n`;
    txt += `	🏳️  *Creador* : ${results[i].created_at}\n`;
    txt += `	🏳️  *Url* : ${results[i].media.url}\n`;
    txt += '\n\n`By : Daniel`';
    await conn.sendFile(m.chat, results[i].media.url, "", txt, m, null, rcanal);
  }

  await m.react("✅");
};
handler.help = ["pinterestsearch"];
handler.tags = ["search"];
handler.command = ["pinterestsearch", "pintsearch"];
handler.register = true;
export default handler;
