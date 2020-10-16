const express = require('express');
const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || '6379';

console.log('Redis:', redisHost, redisPort);

const redisClient = redis.createClient({ host: redisHost, port: redisPort });
const app = express();

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get('*', (req, res) => {
  redisClient.incr(req.url, (err, data) => {
    res.send(`Hello ${req.url} ${data}`);
  });
});

app.listen(port, () => console.log(`Listening on ${port}...`));
