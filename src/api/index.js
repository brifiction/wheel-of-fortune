const express = require("express");

const jsonfile = require("jsonfile");
const fs = require("fs");

const app = express();
const port = 4000;

app.use(express.json({ type: "*/*" }));

// Create `wheel-items.json` file, for first time
fs.writeFile("./wheel-items.json", "", { flag: "wx" }, (err) => {
  if (!err) {
    console.log("The wheel-items.json has been created.");
  }
});

// Define your routes here
app.get("/api/items/get", (req, res) => {
  const getWheelItems = jsonfile.readFileSync("./wheel-items.json", function(
    err,
    obj
  ) {
    if (err) console.error(err);
    return obj;
  });
  res.send(getWheelItems);
});

app.post("/api/items/create", express.json({ type: "*/*" }), (req, res) => {
  const getWheelItems = req.body;
  jsonfile.writeFileSync("./wheel-items.json", getWheelItems, {
    spaces: 2,
  });

  res.json(getWheelItems);
});

app.listen(port, () =>
  console.log(`Example backend API listening on port ${port}!`)
);
