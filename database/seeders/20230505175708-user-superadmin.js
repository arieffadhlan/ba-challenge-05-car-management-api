"use strict";
const bcrypt = require("bcryptjs");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        name: "Superadmin",
        email: "superadmin@gmail.com",
        password: bcrypt.hashSync("superadmin_pass", 10),
        role: "Superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin_pass", 10),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Member",
        email: "member@gmail.com",
        password: bcrypt.hashSync("member_pass", 10),
        role: "Member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", { role: "Superadmin"}, {});
  }
};
