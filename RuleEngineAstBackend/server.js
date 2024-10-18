require('dotenv').config();
const connect = require("./src/config/db.js");
const PORT = process.env.PORT || 7000;

const app = require("./src/app.js");


connect()
  .then(() => {
    app.listen(PORT, () => {
      try {
        console.log("Listening to port ", PORT);
      } catch (error) {
        console.error("Something went wrong ", error.message);
      }
    });
  })
  .catch((err) => {
    console.error("Something went Wrong", err);
  });



// 670faef8d60e6e32746323c3
// 670faf2f2b9371f59e6a0a3a

// 670faf635c383e0d350f7316