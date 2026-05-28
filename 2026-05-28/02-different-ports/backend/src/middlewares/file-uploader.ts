import { Upload } from "@aws-sdk/lib-storage";
import type { NextFunction, Request, Response } from "express";
import s3Client from "../aws/aws";
import config from 'config'
import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import path from "path";

declare global {
    namespace Express {
        interface Request {
            imageUrl: string
        }
    }
}

export default async function fileUploader(request: Request, response: Response, next: NextFunction) {
    // this middlewares checks the request
    // if there are files in the request, it should upload them to the cloud
    // it there are no files in the request, just keep going

    if(!request.files) {
        return next()
    } 

    const image = request.files.image as UploadedFile
    // upload to the cloud, and get a url from the cloud
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: config.get('aws.bucket'),
            Key: `${randomUUID()}${path.extname(image.name)}`,
            Body: image.data,
            ContentType: image.mimetype
        }
    })

    const awsResponse = await upload.done()  
    console.log(awsResponse)  

    request.imageUrl = awsResponse.Location

    next()
    

}