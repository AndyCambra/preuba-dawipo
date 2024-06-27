#!/usr/bin/env node

//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import { authenticateDatabase, synchronizeDatabase } from '../src/config/db.config';
import app from '../src/app';

const PORT = process.env.PORT || 3001;

async function startServer(): Promise<void> {
  try {
    await authenticateDatabase();
    await synchronizeDatabase();
  } catch (error) {
    console.error('Error setting up database:', error);
    return;
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

startServer();