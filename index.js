const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Nahrul × Rimuru Bot Aktif 🔥")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server aktif")
})

const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require("pino")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const BOT_NAME = "Nahrul × Rimuru"

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ['Nahrul', 'Chrome', '1.0.0'],
        printQRInTerminal: false
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", async (
