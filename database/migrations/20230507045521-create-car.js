'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
			id: {
				allowNull: false,
        autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			rentPerDay: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			size: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			image: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			available: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
      createdBy: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
			},
			updatedBy: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
			},
			deletedBy: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
			},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};