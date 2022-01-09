require('dotenv').config();
const app = require('./app');

const port = process.env.PORT;

app.listen(port,
    () => console.log(`server listening at http://localhost:${port}`)
);