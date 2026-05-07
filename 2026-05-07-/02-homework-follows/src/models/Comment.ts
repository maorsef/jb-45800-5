import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Index, Length, Min, Model, PrimaryKey, Table } from "sequelize-typescript";
import Post from "./Post";
import User from "./User";

// underscored: true means that if i declare a field name firstName in TS
// the SQL equivalent will be first_name
@Table({
    underscored: true
})
export default class Comment extends Model {

    @PrimaryKey 
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)   
    id: string
    
    @ForeignKey(() => Post)
    @AllowNull(false)
    @Column(DataType.UUID)   
    postId: string

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)   
    userId: string

    @AllowNull(true)
    @Column(DataType.TEXT)    
    body: string

    @BelongsTo(() => Post)
    post: Post

    @BelongsTo(() => User)
    user: User

}