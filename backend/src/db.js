require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,
   
   {
     dialect: 'postgres',
     dialectModule: require('pg'),
     logging: false,
     native: false,
     ssl: true,
     dialectOptions: {
       ssl: {
         require: true,
         rejectUnauthorized: false
       }
     }  
   }
 );
const basename = path.basename(__filename);

const modelDefiners = [];

//Read all files from the Models folder, request them, and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

//Inject the connection (sequelize) to all the models         
modelDefiners.forEach((model) => model(sequelize));

const { User, Integration, Product } = sequelize.models;

User.belongsToMany(Integration, { through: 'user_integrations' });
Integration.belongsToMany(User, { through: 'user_integrations' });

module.exports = {
   ...sequelize.models,
   conn: sequelize, 
};
