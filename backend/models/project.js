module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 150]
        }
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 2000]
        }
      },

      technologies: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      githubLink: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: true
        }
      },

      demoLink: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: true
        }
      }
    },
    {
      tableName: 'projects',
      timestamps: true
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Project;
};