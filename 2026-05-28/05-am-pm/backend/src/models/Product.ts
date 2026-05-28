import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Category from "./Category";

@Table({
    underscored: true
})
export default class Product extends Model {

    @PrimaryKey 
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)   
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)   
    name: string

    @AllowNull(false)
    @Column(DataType.DATE)
    manufactureDate: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    expirationDate: Date

    @ForeignKey(() => Category)
    @AllowNull(false)
    @Column(DataType.UUID)   
    categoryId: string

    @AllowNull(false)
    @Column(DataType.FLOAT)   
    price: number

    @BelongsTo(() => Category)
    category: Category

}