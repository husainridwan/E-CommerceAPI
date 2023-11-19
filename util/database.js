import Sequelize from 'sequelize'

const sequelize = new Sequelize('crypto', 'root', 'SilentBazaar@007', {dialect: 'mysql', host: 'localhost'});
export default sequelize;
