let handler = async (m, {conn, args, usedPrefix, command}) => {
  let isClose = {
    // Switch Case Like :v
    open: "not_announcement",
    close: "announcement",
    abierto: "not_announcement",
    cerrado: "announcement",
    abrir: "not_announcement",
    cerrar: "announcement",
  }[args[0] || ""];
  if (isClose === undefined)
    throw `

*╭─ ❖ ── ✦ ── ✧ ── ❖ ──┓* 
*┠┉↯ ${usedPrefix + command} abrir*
*┠┉↯ ${usedPrefix + command} cerrar*
*╰─ ❖ ── ✦ ── ✧ ── ❖ ──┛*
`.trim();
  await conn.groupSettingUpdate(m.chat, isClose);
  {
    m.reply("🏳️ grupo configurado correctamente");
  }
};
handler.help = ["group open / close", "grupo abrir / cerrar"];
handler.tags = ["group"];
handler.command = /^(group|grupo)$/i;
handler.admin = true;
handler.botAdmin = true;
export default handler;
