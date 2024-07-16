import axios from 'axios';
import fetch from 'node-fetch';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import search from 'yt-search';

async function spotifyxv(query) {
  let token = await tokens();
  let response = await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(query) + '&type=track',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const tracks = response.data.tracks.items;
  const results = tracks.map((track) => ({
    name: track.name,
    artista: track.artists.map((artist) => artist.name),
    album: track.album.name,
    duracion: timestamp(track.duration_ms),
    url: track.external_urls.spotify,
    imagen: track.album.images.length ? track.album.images[0].url : '',
  }));
  return results;
}

async function tokens() {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from('acc6302297e040aeb6e4ac1fbdfd62c3:0e8439a1280a43aba9a5bc0a16f3f009').toString('base64'),
    },
    data: 'grant_type=client_credentials',
  });
  return response.data.access_token;
}

function timestamp(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

async function getBuffer(url, options) {
  try {
    options = options || {};
    const res = await axios({
      method: 'get',
      url,
      headers: {
        DNT: 1,
        'Upgrade-Insecure-Request': 1,
      },
      ...options,
      responseType: 'arraybuffer',
    });
    return res.data;
  } catch (err) {
    return err;
  }
}

async function getTinyURL(text) {
  try {
    let response = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
    return response.data;
  } catch (error) {
    return text;
  }
}

async function createCarouselMessage(songs) {
  const sections = songs.map((song, index) => ({
    title: `${song.name}`,
    rows: [
      { title: song.name, description: `${song.artista.join(', ')} - ${song.album}`, id: song.url }
    ],
  }));

  return sections;
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Uso incorrecto del comando. Ejemplo: ${usedPrefix + command} Bellyache`;

  try {
    m.react('⌛️');
    let songInfo = await spotifyxv(text);
    if (!songInfo.length) throw `No se encontró ninguna canción.`;

    let carouselSections = await createCarouselMessage(songInfo);

    const messages = songInfo.map((song, index) => [
      `Name: ${song.name} - Artista : ${song.artista.join(', ')} - Album/EP: ${song.album}`, 
      `Script by: Juan-66`,
      song.imagen,
      [['no usar (crash en reparacion)']],
      [[`${usedPrefix}getmp3from ${song.name} - ${song.artista}`]],
      [['Enlace a Spotify', song.url], ['Spotify Premium APK', ("https://spotifypremium.net/file/spotify-premium-mod-apk-8-10-9-722.apk")]]
    ]);

    await conn.sendCarousel(m.chat, 'Aquí tienes las canciones encontradas:', 'Script by: Daniel, 'Cancion Encontrada:', messages, m);
    m.react('✅️');
  } catch (error) {
    m.react('❌');
  }
};

handler.command = /^(spotifyfinal|music2.0)$/i;
export default handler;
