const Discord = require("discord.js");
const express = require("express");
const app = express();
const client = new Discord.Client({ intents: 32767 });
const Topgg = require("@top-gg/sdk");
const { topGG, discord } = require("./config");
let webhook = new Topgg.Webhook(topGG.authWebhook || "http://127.0.0.1:3000");
let api = new Topgg.Api(topGG.authToken);

app.post(
  "/dbl",
  webhook.listener((vote) => {
    // هنا حط عايز يحصل ايه بقا لما يعمل vote
    new Discord.WebhookClient(discord.thxWebhook).send(`${vote.user} has voted for you bot.`)
  })
);

client.on("ready", async () => {
  setInterval(async () => {
    await api.postStats({
      serverCount: client.guilds.cache.size,
      shardCount: client.shard.count,
    });
  }, 1000 * 60 * 15);
});

app.listen(3000, topGG.authWebhook || "http://127.0.0.1:3000", () =>
  console.log("host is online, your webhook will end by '/dbl'")
);
client.login(discord.token);
