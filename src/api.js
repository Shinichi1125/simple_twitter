const fs = require('fs');
const path = require('path');
const express = require('express');

const api = express();
const apiUrl = process.env.URL || 'http://localhost';
//const apiPort = parseInt((process.env.PORT || 3001));
//const apiPort = 8080;
//const apiPort = parseInt((process.env.PORT || 8081));
const apiPort = 3000;

const cors = require('cors');
api.use(cors());

api.use(express.json());

api.get('/api/feed/get' , (req, res) => {
  console.log('Displaying the result of api.get: ');
  let feedFile = path.resolve(__dirname, '../feed.json');

  res.type('json');
  res.sendFile(feedFile);
});

api.post('/api/feed/post' , (req, res) => {     //  /api/feed/post      //  ../feed.json
  //let feedFile = path.resolve(__dirname, '../employees.json');  // just an experiment with a simpler file
  let feedFile = path.resolve(__dirname, '../feed.json');
  let feedContent = JSON.parse(fs.readFileSync(feedFile));
  let feedPosted = req.body;

  let feedJson = '';

  console.log('/api/feed/post:', feedPosted);
  
  feedContent.push(feedPosted);

  feedJson = JSON.stringify(feedContent);

  fs.writeFileSync(feedFile, feedJson);

  res.type('json');
  res.sendFile(feedFile);
});

api.patch('/api/feed/patch' , (req, res) => {     
  let feedFile = path.resolve(__dirname, '../feed.json');
  let feedContent = JSON.parse(fs.readFileSync(feedFile));
  let feedPatch = req.body;

  let feedJson = '';

  for(var kweet in feedContent){
    if(feedContent[kweet].kweetId == feedPatch.kweetId){
      switch(feedPatch.reactionType){
        case 'replies':
          feedContent[kweet].actions.replies++;
          break;
        case 'rekweets':
          feedContent[kweet].actions.rekweets++;
          break;
        case 'likes':
          feedContent[kweet].actions.likes++;
          break;
      }
    }
  }

  feedJson = JSON.stringify(feedContent);

  fs.writeFileSync(feedFile, feedJson);

  res.type('json');
  res.sendFile(feedFile);
});

api.delete('/api/feed/delete' , (req, res) => {     
  let feedFile = path.resolve(__dirname, '../feed.json');
  let feedContent = JSON.parse(fs.readFileSync(feedFile));
  let feedDelete = req.body;

  let feedJson = '';
  var tempArray = [];

  for(var kweet in feedContent){
    tempArray.push(feedContent[kweet]);
  }

  for(var i = 0; i < tempArray.length; i++){
    if(tempArray[i].kweetId == feedDelete.kweetId){
      tempArray.splice(i, 1);
    }
  }

  feedJson = JSON.stringify(tempArray);
  fs.writeFileSync(feedFile, feedJson);

  res.type('json');
  res.sendFile(feedFile);
});

api.listen(apiPort, () => {
  console.log(`API server running at ${apiUrl}:${apiPort}`);
});
