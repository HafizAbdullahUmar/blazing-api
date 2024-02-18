// import { Request, Response, NextFunction } from "express";
// import { getRepository } from "typeorm";
// import { Image } from "orm/entities/images/Image";

// export const getImage = async (req: Request, res: Response, next: NextFunction) => {
//     let { id } = req.params;
//     const imageRepository = getRepository(Image);
//     try {
//         const image = await imageRepository.findOne(id);

//         if (!image) {
//             return res.status(400).json({ message: "Image not found" });
//         }

//         // Assuming image.data is a Base64 encoded string
//         const imageData = Buffer.from(image.data, 'base64');

//         // Set the content type to image
//         res.set('Content-Type', 'image/png'); // Change 'image/jpeg' to the correct content type of your images
//         res.set('Content-Length', String(imageData.length));
//         res.set('Cross-Origin-Resource-Policy', 'cross-origin');

//         // Send the image data as a buffer
//         return res.send(imageData);
//     } catch (err) {
//         next(err);
//         return res.status(500).json({ message: "An error occurred while retrieving the image" });
//     }
// };