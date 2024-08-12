"use strict";

const { DataTypes } = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tasks", {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.fn("uuid_generate_v4"),
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      taskType: {
        type: DataTypes.STRING,
        values: ["ONE-TIME", "RECCURING", "ACCUMULATING"],
        allowNull: false,
      },
      accumulativeGoal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      frequency: {
        type: DataTypes.STRING,
        values: ["DAILY", "MONTHLY", "YEARLY"],
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        references: { model: "users", key: "id" },
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tasks");
  },
};
