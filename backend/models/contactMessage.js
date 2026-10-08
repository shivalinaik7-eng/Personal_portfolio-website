module.exports = (sequelize, DataTypes) => {
  const ContactMessage = sequelize.define(
    'ContactMessage',
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
        validate: {
          isEmail: true
        }
      },

      subject: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 2000]
        }
      }
    },
    {
      tableName: 'contact_messages',
      timestamps: true
    }
  );

  return ContactMessage;
};