const express = require('express');
const cors = require('cors');

const {
  sequelize
} = require('./models');

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());

const PORT = 5000;

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running.'
  });
});

app.get('/api/headers', (req, res) => {
  res.json(req.headers);
});

app.use(
  '/api/projects',
  projectRoutes
);

app.use(
  '/api/contact',
  contactRoutes
);

app.use(
  '/api/login',
  authRoutes
);

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log(
      'MySQL database connection successful.'
    );

    app.listen(PORT, () => {
      console.log(
        `Server running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error.message
    );
  }
}

startServer();