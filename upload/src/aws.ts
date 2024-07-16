
import { S3 } from "aws-sdk";
import fs from "fs";


const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})
// fileName => output/12312/src/App.jsx

export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({ 
        Body: fileContent,
        Bucket: "vercelproject",
        Key: fileName,
    }).promise();
    console.log(response);
}