const express = require('express');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
//app.use('/auth', authRoutes);       // 🔑 Login route
app.use('/products', productRoutes); // 🔐 Protected route

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('DB sync error:', err);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
