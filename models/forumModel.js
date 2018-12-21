module.exports = function(sequelize, DataTypes) {
    var Forum = sequelize.define("Forum", {
      title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1,99]
          }
      },
      post: {
          type: DataTypes.TEXT,
          validate: {
              len: [10]
          }
      }
    });

    Forum.associate = function(models) {
        Forum.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Forum;
  };
  