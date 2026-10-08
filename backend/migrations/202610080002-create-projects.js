module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'projects',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },

        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },

        title: {
          type: Sequelize.STRING(150),
          allowNull: false
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },

        technologies: {
          type: Sequelize.STRING(500),
          allowNull: false
        },

        category: {
          type: Sequelize.STRING(100),
          allowNull: false
        },

        githubLink: {
          type: Sequelize.STRING(500),
          allowNull: true
        },

        demoLink: {
          type: Sequelize.STRING(500),
          allowNull: true
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
    await queryInterface.dropTable('projects');
  }
};