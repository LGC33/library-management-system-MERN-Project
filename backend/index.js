const express = require('express');
require('./db/config');
const User = require('./db/User');
const Inventory = require('./db/inventory');
const Book = require('./db/book')
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
app.post('/register', async (req, res) => {
  try {
    let existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.send('user already exist');
    } else {

      let user = new User(req.body);
      let result = await user.save();
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.send('error');
  }
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      if (user.role === 'student' || user.role === 'teacher') {
        res.send(user);
      } else {
        res.send({ result: 'Invalid user role' });
      }
    } else {
      res.send({ result: 'No user found' });
    }

  } else {
    res.send({ result: 'No user found' });
  }
});

app.post('/bookss', async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    const result = await inventory.save();
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/student-list', async (req, res) => {
  try {
    const role = req.body.role;
    const users = await User.find({ role: 'student' });
    res.send(users);

  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});
app.get('/book-list', async (req, res) => {
  try {

    const inventory = await Inventory.find();
    res.send(inventory);

  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post('/request-book', async (req, res) => {
  try {
    const { bookname, email } = req.body;

    // Add your condition for bookname here
    if (bookname !== bookname) {
      return res.status(400).send('Invalid bookname');
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('Student not found');
    }

    const request = {
      name: user.username,
      bookname,
      status: 'pending'
    };

    const result = await Inventory.updateOne(
      { title: bookname },
      { $push: { requests: request } }
    );

    if (result.nModified === 0) {
      return res.status(400).send('Book not found');
    }

    res.status(201).send({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/requests', async (req, res) => {
  try {
    
    const requests = await Inventory.find({  });

    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.delete("/book/:id", async (req, resp) => {

  const result = await Inventory.deleteOne({ _id: req.params.id })
  resp.send(result);
})

app.post('/books', async (req, res) => {
  const { bookname, departments, status,semester } = req.body;
  const inventory = new Inventory({ bookname, departments, status,semester });
  try {
    const newBook = await inventory.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/bookk/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBook = await Inventory.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get("/search/:key", async (req, resp) => {
  let result = await Inventory.find(
      {
          "$or": [
              { bookname: { $regex: req.params.key } },
              { departments: { $regex: req.params.key } },
              { csemester: { $regex: req.params.key } },
          ]
      }
  )
  resp.send(result)
})


app.listen(3800)
