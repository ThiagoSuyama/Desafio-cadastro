import Sequelize, { Model } from 'sequelize';

class Office extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      area: Sequelize.STRING,
      hierarchy_level: Sequelize.INTEGER,
      subordinate_user: Sequelize.INTEGER,
    },
    {
      sequelize,
    }
    );

    return this;

  }


  static associate(models){
    this.belongsTo(models.Office, {foreignKey : 'hierarchy_level', as : 'office' });
    this.belongsTo(models.User, {foreignKey : 'subordinate_user', as : 'subordinate' });

  }

}

export default Office;