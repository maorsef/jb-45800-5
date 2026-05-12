import { AllowNull, BelongsToMany, Column, DataType, Default, HasMany, Index, Length, Min, Model, PrimaryKey, Table } from "sequelize-typescript";
import Post from "./Post";
import Comment from "./Comment";
import Follow from "./Follow";

// underscored: true means that if i declare a field name firstName in TS
// the SQL equivalent will be first_name
@Table({
    underscored: true
})
export default class User extends Model {

    @PrimaryKey 
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)   
    id: string
    
    @AllowNull(false)
    @Column(DataType.STRING(30))    
    name: string
    
    @AllowNull(false)
    @Index({unique: true})
    @Column(DataType.STRING(30))    
    username: string
    
    @AllowNull(false)
    @Column(DataType.STRING)    
    password: string

    @AllowNull(true)
    @Column(DataType.STRING)    
    profilePic: string

    @HasMany(() => Post, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts: Post[]

    @HasMany(() => Comment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    comments: Comment[]

    //              tabel A,   assoc table   the current primary key
    @BelongsToMany(() => User, () => Follow, 'followeeId', 'followerId')
    followers: User[]

    @BelongsToMany(() => User, () => Follow, 'followerId', 'followeeId')
    following: User[]

}