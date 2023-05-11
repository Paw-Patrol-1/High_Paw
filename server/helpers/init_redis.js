const redis = require("redis");

const client = redis.createClient({
  socket: {
    port: 6379,
    host: "127.0.0.1",
  },
  legacyMode: true,
});

client.on("connect", async () => {
  console.log("Client connected to redis");
});

client.on("ready", async () => {
  console.log("Client connected to redis and ready to use");
});

client.on("error", async (err) => {
  console.log(err.message);
});

client.on("end", async () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

client.connect().catch((err) => {
  console.log(err.message);
});

module.exports = client;
