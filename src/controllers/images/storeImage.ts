// import { Request as ExpressRequest, Response, NextFunction } from "express";
// import { getRepository } from "typeorm";
// import fs from 'fs';
// import { Image } from "orm/entities/images/Image";


// interface MulterFile extends File{
//     originalname: string;
//     path: string
//   }
  
// interface Request extends ExpressRequest {
//     file: MulterFile;
//   }


// export const storeImage = [
//     // upload.single('file'), // 'image' is the name of the field that is going to be uploaded
//     async (req: Request, res: Response, next: NextFunction) => {
//         const { originalname: name } = req.file; // get the original name of the file

//         // read the file from the file system
//         const fileData = fs.readFileSync(req.file.path);

//         // convert the file data to a Base64 string
//         const data = fileData.toString('base64');

//         const imageRepository = getRepository(Image);
//         try {
//             const image = new Image();
//             image.name = name;
//             image.data = data;

//             const savedImage = await imageRepository.save(image);

//             // delete the file from the file system
//             fs.unlinkSync(req.file.path);

//             res.status(201).json({ message: "Image uploaded successfully", id: savedImage.id });
//         } catch (err) {
//             next(err);
//         }
//     }
// ];