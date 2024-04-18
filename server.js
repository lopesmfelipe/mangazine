const app = require("./app");

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

if (!CONNECTION) {
  console.error("MongoDB connection string not provided");
  process.exit(1);
}

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
    app.listen(PORT, () => {
      console.log("App listening on port " + PORT);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
