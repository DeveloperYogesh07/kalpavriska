import express from 'express';
import { APP_PORT } from './config/config';

class ExpressApp {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  getApp() {
    return this.app;
  }

  startServer() {
    this.app.listen(APP_PORT, () => {
      console.log(`Server is listening on port: ${APP_PORT}`);
    });
  }
}

export default ExpressApp;
