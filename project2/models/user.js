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
        allowNull: true,
          validate: {
          len: [1]
        }
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
        type: DataTypes.INTEGER,
        allowNull: true,
          validate: {
          len: [10]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
          validate: {
          len: [1]
        }
      },
      learnmoreresearchOpp: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      learnmoregivingOpp: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      learnmorevitalNews: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      timetocallAM: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      timetocallPM: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      callspecificDay: {
        type: DataTypes.STRING,
        allowNull: true,
          validate: {
          len: [1]
        }
      },
      callspecificTIME: {
        type: DataTypes.STRING,
        allowNull: true,
          validate: {
          len: [1]
        }
      }

//add more stuff here, not below, if creating    
});

    User.associate =function(models) {
      User.hasMany(models.Forum, {
        onDelete: "cascade"
      });
    };

    return User;
  };