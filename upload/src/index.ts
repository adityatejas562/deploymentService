import express from "express";
import  cors from "cors";
import simpleGit from "simple-git"; 
import { generate } from "./utils";
import path from 'path';
import {getAllFiles} from './file';
import { uploadFile } from "./aws";
import {createClient} from "redis";
const publisher= createClient();
publisher.connect();
const app=express(); 
app.use(cors());
app.use((express.json()));

//postman 
app.post("/deploy",async(req,res)=>
{
    const repoUrl=req.body.repoUrl;
    const id=generate();
     await  simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`)) ;
     const files = getAllFiles(path.join(__dirname, `output/${id}`));

files.forEach(async file => {
    await uploadFile(file.slice(__dirname.length + 1), file);
})//removes the dir name +1 C:\\Users\\lapzone\\vercelproject\\vercel\\dist\\output\\kkfpt\\vite.config.js all from c: to dist 
            
        //put this on s3

        publisher.lPush("build-queue",id);
      res.json({
        id:id
      })
          
});
app.listen(3000);
