import '../db/pgvector-sequelize'
import { DataTypes } from 'sequelize'
import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

type PgvectorDataTypes = typeof DataTypes & {
    VECTOR: (dimensions?: number) => ReturnType<typeof DataTypes.ABSTRACT>
}
const embeddingVectorType = (DataTypes as PgvectorDataTypes).VECTOR(1536)

@Table({
    underscored: true,
    tableName: 'post_embeddings',
})
export default class PostEmbedding extends Model {

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.UUID)
    postId: string

    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string

    @AllowNull(false)
    @Column({
        type: embeddingVectorType,
    })
    vector: number[]
}
