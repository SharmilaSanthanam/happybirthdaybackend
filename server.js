const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
require('./connection')
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: '*',
    // cors: 'http://localhost:3006',
    // methods: '*'
    methods: ['GET', 'POST', 'PATCH', "DELETE"]
  })
  // const path = require("path");
  
const productRoutes = require('./routes/productRoutes');
const audioRoutes = require('./routes/audioRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.get("/", (req, res) =>
  res.send(`Server Running`)
);

const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/products', productRoutes);
app.use('/audios', audioRoutes);
app.use('/images', imageRoutes);

server.listen(PORT, ()=>{
  console.log('listening to', PORT)
  })

  app.set('socketio', io);
