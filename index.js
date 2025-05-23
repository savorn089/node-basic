const express = require('express');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);       // 🔑 Login route
app.use('/products', productRoutes); // 🔐 Protected route
app.use('/users', userRoutes);     // 👤 User route

sequelize.sync().then(() => {
  // console.log('Database synced');
}).catch(() => {
  // console.error('DB sync error:', err);
});

app.listen(PORT, () => {
  // console.log(`Server running at http://localhost:${PORT}`);
});
