'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('offices', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      area:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      hierarchy_level:{
        type: Sequelize.INTEGER,
        references: { model: 'offices', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      subordinate_user:{
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }

    });

  },

  down: async (queryInterface) => {
     await queryInterface.dropTable('offices');
  }
};
