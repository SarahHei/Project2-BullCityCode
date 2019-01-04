module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [7]
      }
    },
    learnMoreResearchOpp: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    learnMoreGivingOpp: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    learnMoreVitalNews: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    time_to_call_morning: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    time_to_call_afternoon: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    time_to_call_evening: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Forum, {
      onDelete: "cascade"
    });
  };
  return User;
};
