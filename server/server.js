const { app } = require("./App");
require("./config/db.config");
require("redis");

const { PORT = 3000 } = process.env || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Server is listening at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
