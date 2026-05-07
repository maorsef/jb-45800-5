import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import config from 'config'
import Post from "../models/Post";
import Comment from "../models/Comment";
import Follow from "../models/Follow";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [User, Post, Comment, Follow],
    logging: console.log,
    ...config.get('db')
})

export default sequelize