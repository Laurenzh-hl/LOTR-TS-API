import { DataTypes, Model } from "sequelize";
import db from "../config/db";

export interface CharAttributes {
  id: number;
  name: string;
  origin: string;
  fellowshipMember: boolean;
  weapon: string;
}

export class Character extends Model<CharAttributes> implements CharAttributes {
  id!: number;
  name!: string;
  origin!: string;
  fellowshipMember!: boolean;
  weapon!: string;
}

Character.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fellowshipMember: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    weapon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

export interface RaceAttributes {
  id: number;
  name: string;
  dominions: string;
  languages: string;
  lifespan: string;
  height: string;
}

export class Race extends Model<RaceAttributes> implements RaceAttributes {
  id!: number;
  name!: string;
  dominions!: string;
  languages!: string;
  lifespan!: string;
  height!: string;
}

Race.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dominions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifespan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

Race.hasMany(Character);
Character.belongsTo(Race);
