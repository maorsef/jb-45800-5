import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import config from 'config'

// cloning an object this way, clones the 1st level fields, but the sub docs remain identical
// const s3Config = {...config.get<object>('aws.connection')}

// this is a way to clone deeply
const s3Config = JSON.parse(JSON.stringify(config.get('aws.connection')))
const s3Client = new S3Client(s3Config)

export async function createAppBucketIfNotExist() {
    try {
        // create the bucket....
        const response = await s3Client.send(new CreateBucketCommand({
            Bucket: config.get('aws.bucket')
        }))
        console.log('created bucket', response)
    } catch (e) {
        // ignore
        console.log('exception in create bucket, probably already exist', e)
    }
}

export default s3Client