const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Post extends Model {}

Post.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            isNumeric: true,
        },
        },
        title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 50],
        },
        },
        content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 500],
        },
        },
        user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
        },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
    );

module.exports = Post;