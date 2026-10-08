module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100]
        }
      },

      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [6, 100]
        }
      }
    },
    {
      tableName: 'users',
      timestamps: true
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Project, {
      foreignKey: 'userId',
      as: 'projects'
    });
  };

  return User;
};