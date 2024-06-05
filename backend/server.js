// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoUri = 'mongodb+srv://theneoalpha:VikashKaushik@cluster0.fxhrtlq.mongodb.net/finance_tracker?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // 'income' or 'expense'
  date: { type: Date, required: true },
});

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);
const Budget = mongoose.model('Budget', BudgetSchema);

// Routes
app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) {
      res.status(400).send({ error: 'Invalid credentials' });
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/transaction', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.post('/budget', async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).send(budget);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.get('/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.send(budgets);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
