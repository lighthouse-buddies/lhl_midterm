require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

// Create a Sequelize instance
const sequelize = new Sequelize(dbParams.database, dbParams.user, dbParams.password, {
  host: dbParams.host,
  port: dbParams.port,
  dialect: 'postgres',
});


const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id', // Specify the corresponding column name in the table
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username', // Specify the corresponding column name in the table
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email', // Specify the corresponding column name in the table
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password', // Specify the corresponding column name in the table
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('DEFAULT'),
      field: 'deleted_at', // Specify the corresponding column name in the table
    },
  },
  {
    tableName: 'users', // Specify the existing table name
    timestamps: false, // Disable Sequelize's timestamp fields (createdAt, updatedAt)
  }
);

const Chapter = sequelize.define(
  'Chapter',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id', // Specify the corresponding column name in the table
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content', // Specify the corresponding column name in the table
    },
    prev: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'prev', // Specify the corresponding column name in the table
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id', // Specify the corresponding column name in the table
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at', // Specify the corresponding column name in the table
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: 'deleted_at', // Specify the corresponding column name in the table
    },
  },
  {
    tableName: 'chapters', // Specify the existing table name
    timestamps: false, // Disable Sequelize's timestamp fields (createdAt, updatedAt)
  }
);


const Vote = sequelize.define(
  'Vote',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id', // Specify the corresponding column name in the table
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id', // Specify the corresponding column name in the table
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'chapter_id', // Specify the corresponding column name in the table
    },
  },
  {
    tableName: 'votes', // Specify the existing table name
    timestamps: false, // Disable Sequelize's timestamp fields (createdAt, updatedAt)
  }
);

const Story = sequelize.define(
  'Story',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id', // Specify the corresponding column name in the table
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title', // Specify the corresponding column name in the table
    },
    first_chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'first_chapter_id', // Specify the corresponding column name in the table
    },
    last_chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'last_chapter_id', // Specify the corresponding column name in the table
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'complete', // Specify the corresponding column name in the table
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: null,
      field: 'deleted_at', // Specify the corresponding column name in the table
    },
  },
  {
    tableName: 'stories', // Specify the existing table name
    timestamps: false, // Disable Sequelize's timestamp fields (createdAt, updatedAt)
  }
);

module.exports = {
  Vote,
  Story,
  Chapter,
  User,
}

