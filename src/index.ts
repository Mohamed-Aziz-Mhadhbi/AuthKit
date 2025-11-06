import app from './app';
import config from './config';

app.listen(config.port, () => {
  console.log(`AuthKit listening on http://localhost:${config.port}`);
});
