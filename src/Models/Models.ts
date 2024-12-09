import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import db from "../config/db";

export class Character extends Model<
  InferAttributes<Character>,
  InferCreationAttributes<Character>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare origin: string;
  declare fellowshipMember: CreationOptional<boolean>;
  declare weapon: string;
  declare raceId: ForeignKey<Race["id"]>;

  declare getRace: BelongsToGetAssociationMixin<Race>;
  declare setRace: BelongsToSetAssociationMixin<Race, number>;
  declare createRace: BelongsToCreateAssociationMixin<Race>;
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

export class Race extends Model<
  InferAttributes<Race>,
  InferCreationAttributes<Race>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare dominions: string;
  declare languages: string;
  declare lifespan: string;
  declare height: string;

  declare getCharacters: HasManyGetAssociationsMixin<Character>;
  declare countCharacters: HasManyCountAssociationsMixin;
  declare hasCharacter: HasManyHasAssociationMixin<Character, number>;
  declare hasCharacters: HasManyHasAssociationsMixin<Character, number>;
  declare setCharacters: HasManySetAssociationsMixin<Character, number>;
  declare addCharacter: HasManyAddAssociationMixin<Character, number>;
  declare addCharacters: HasManyAddAssociationsMixin<Character, number>;
  declare removeCharacter: HasManyRemoveAssociationMixin<Character, number>;
  declare removeCharacters: HasManyRemoveAssociationsMixin<Character, number>;
  declare createCharacter: HasManyCreateAssociationMixin<Character, "raceId">;
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
