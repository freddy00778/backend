import {catchErrors} from '../errors'
import DataProvider from "../data/DataProvider";
import VideoHandlers from "../data/videos/VideoHandlers";
import fs from 'fs'
import AWS from 'aws-sdk'


const multer = require('multer');
const upload =  multer({dest:'uploads/'}).single("file");

export const getAll =
    catchErrors(async (req, res) => {
        console.log("req", req)
        const data = await DataProvider.create()
        const videos = await (await VideoHandlers.create(data)).getList()

        return res.respond({
            videos
        })
    })

export const getById =
    catchErrors(async (req, res) => {
        const { id } = req.params
        const data = await DataProvider.create()
        const video = await ( await VideoHandlers.create(data)).getById(id)

        return res.respond({
            video
        })
    })

async function uploadToS3(fileObject, media_extension) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        region: "eu-west-1"
    })

    const imagePath = `${fileObject.destination}/${fileObject.filename}${media_extension}`
    const blob = fs.readFileSync(imagePath)

    //@ts-ignore
    const uploadedImage = await s3.upload({
        //@ts-ignore
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileObject.filename + media_extension,
        Body: blob,
        ContentType: fileObject.mimetype
    }).promise()
    return uploadedImage;
}

function renameFile(fileObject, media_extension) {
    fs.rename(`${fileObject.destination}/${fileObject.filename}`,
        `${fileObject.destination}/${fileObject.filename}${media_extension}`, function (err) {
            if (err) console.log('ERROR: ' + err);
        })
}

export const createVideo =
    catchErrors(async (req, res) => {
        const data = await  DataProvider.create()

        await upload(req, res, (err) => {
                if (err) {res.status(400).send("Something went wrong!");}

                // @ts-ignore
                let fileObject = req.file

                 VideoHandlers.create(data)
                     .then( async (video) => {
                         const name = fileObject.originalname
                         const media_extension = name.substr(Number(name.indexOf(".")))
                         console.log("Media extension", media_extension)
                         console.log("Media name extension", name.indexOf("."))
                         renameFile(fileObject, media_extension);
                         // const new_name = `${fileObject.destination}/${fileObject.filename}${media_extension}`
                         const uploadedImage = await uploadToS3(fileObject, media_extension);

                         const videoBody = {
                             ...req.body,
                             name: fileObject.originalname,
                             mime_type: fileObject.mimetype,
                             size: fileObject.size,
                             // link: `${fileObject.destination}${fileObject.filename}${media_extension}`
                             link: uploadedImage.Location
                         }
                         video.create(videoBody)

                         console.log("Uploaded image", uploadedImage)
                     })
                // @ts-ignore
                res.send(req.file);
            });
    })