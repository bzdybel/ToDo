function portEcho(port) {
    console.log("Listen at: " + port);
}
const express = require('express');
const app = express();
port = 3006;

app.use(express.static('../front-end'))
app.listen(port, portEcho(port));
