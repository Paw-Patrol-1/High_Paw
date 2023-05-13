const redis = require("redis");

const client = redis.createClient({
  socket: {
    port: 6379,
    host: "redis",
  },
  legacyMode: true,
});

client.on("connect", () => {
  console.log("Client connected to redis");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});

process.on("SIGINT", () => {
  client.quit();
});

client.connect().catch((err) => {
  console.log(err.message);
});

module.exports = client;
