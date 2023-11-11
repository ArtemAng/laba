require('dotenv').config();
const {createTables} = require('./generate.database');

const express = require('express');

const userRouter = require('./routes/user.routes');
const employeeRouter = require('./routes/employees.routes');
const projectRouter = require('./routes/projects.routes');
const authRouter = require('./routes/auth.routes');

const PORT = process.env.PORT || 2000;

const app = express();

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', employeeRouter);
app.use('/api', projectRouter);
app.use('/api', authRouter);

app.listen(PORT, async () => {
  const creationResult = await createTables();
  creationResult.status ? console.log('Database created') : console.log(`Error: ${creationResult.message}`); 
  console.log(`Server started on port ${PORT}`);
})