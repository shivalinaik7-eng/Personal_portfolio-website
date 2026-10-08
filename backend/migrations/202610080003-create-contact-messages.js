module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'contact_messages',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },

        name: {
          type: Sequelize.STRING(100),
          allowNull: false
        },

        email: {
          type: Sequelize.STRING(150),
          allowNull: false
        },

        subject: {
          type: Sequelize.STRING(200),
          allowNull: false
        },

        message: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },

        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable(
      'contact_messages'
    );
  }
};