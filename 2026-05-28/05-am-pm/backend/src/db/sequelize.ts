import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Category from "../models/Category";
import Product from "../models/Product";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [Category, Product], // <= add all sequelize models here
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize