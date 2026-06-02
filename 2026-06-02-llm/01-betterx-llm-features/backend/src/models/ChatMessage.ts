import { AllowNull, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    underscored: true
})
export default class ChatMessage extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string

    @AllowNull(false)
    @Column(DataType.UUID)
    chatId: string

    @AllowNull(false)
    @Column(DataType.STRING)
    role: string

    @AllowNull(false)
    @Column(DataType.TEXT)
    content: string
}

