const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const Cookies = require('js-cookie');

const PostIt = require('./models/postit');

require('dotenv').config();

const cors = require('cors');

const app = express();
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT_POSTIT;

const axios = require('axios');
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(mongoUrl)
.then(() => {
  console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB Atlas!');
  console.error(error);
});

// CREATE A POSTIT
app.post('/new', (req, res) => {
  const { title, content, user_id } = req.body;
  const newPostIt = new PostIt({
    title,
    content,
    user_id,
  });
  newPostIt.save()
    .then(() => {
      res.status(201).json({
        message: 'PostIt created successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
// END CREATE A POSTIT

// FIND ALL POSTITS
// app.get('/', async (req, res) => {
//   PostIt.find()
//   .then((postIts) => {
//     res.status(200).json(postIts);
//   })
//   .catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });
// END FIND ALL POSTITS

// FIND ALL POSTIT BY USER ID
app.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  PostIt.find({ user_id: userId }).then(
    (myPostsIt) => {
      res.status(200).json(myPostsIt);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});
// END FIND A POSTIT BY USER ID

// DELETE POSTIT BY ID
app.use('/delete/:id', (req, res) => {
  PostIt.deleteOne({
    _id: req.params.id
  })
  .then((myPostIt) => {
    res.status(200).json({
      myPostIt,
      message: 'PostIt deleted successfully!',
    });
  })
  .catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
    );
  });
// END DELETE POSTIT BY ID

// EDIT A POSTIT BY ITS ID
app.put('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const editPostIt = {
    title,
    content,
  };
  PostIt.findOneAndUpdate({_id: req.params.id}, editPostIt, { new: true })
    .then(() => {
      res.status(201).json({
        message: 'PostIt updated successfully!'
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
});
// END EDIT A POSTIT BY ITS ID

module.exports = app;

app.listen(port, () => console.log(`Express app running on port ${port}!`));