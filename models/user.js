import sequelize from "../util/database";
import Sequelize from 'sequelize';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        length: 255,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        length: 255,
        allowNull: false
    }
});

export default User;