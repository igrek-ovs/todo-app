"use strict";

const { DataTypes} = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tasks", "accumulativeProgress", {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tasks", "accumulativeProgress");
  },
};
