

import   fs from "fs"; //lets you  read  create files and read directories and exposes readdirSync function below 
import   path from "path";
export const getAllFiles=(folderPath:string)=>
{
    let response:string[]=[];
    const allFilesAndFolders=fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file=>
    {
        const fullFilePath=path.join(folderPath,file);
        if( fs.statSync(fullFilePath).isDirectory()){
            response=response.concat(getAllFiles(fullFilePath));// why noit push coz it will return response like this response=[file.txt,["assets/file.txt"]]
        }
            else {
                response.push(fullFilePath);
            }
        
        
        
    });
     return response;

}