import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "./Product";

@Table({
    underscored: true
})
export default class Category extends Model {

    @PrimaryKey 
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)   
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)   
    name: string

    @HasMany(() => Product, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    products: Product[]    
}