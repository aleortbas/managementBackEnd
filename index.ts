import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const port = 5000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})