// import { Request, Response, NextFunction } from 'express';
// import { getRepository } from 'typeorm';

// import { Role } from 'orm/entities/users/types';
// import { Entry } from 'orm/entities/entries/Entry';
// import { JwtPayload } from 'types/JwtPayload';
// import { createJwtToken } from 'utils/createJwtToken';
// import { CustomError } from 'utils/response/custom-error/CustomError';
// import { User } from 'orm/entities/users/User';

// export const createEntry = async (req: Request, res: Response, next: NextFunction) => {
//   let { metadata } = req.body;
//   const { id, name } = req.jwtPayload;

//   const userRepository = getRepository(User);
//   const entryRepositroy = getRepository(Entry);
//   try {
//     const user = await userRepository.findOne({ where: { id } });
//     if (!user) {
//       const customError = new CustomError(404, 'General', 'Not Found', [`User ${name} not found.`]);
//       return next(customError);
//     }

//     try {
//       const newEntry = new Entry();
//       newEntry.user = user.id;
//       newEntry.metadata = metadata;
//       const savedEntry = await entryRepositroy.save(newEntry);
//     } catch (err) {
//       const customError = new CustomError(400, 'Raw', `Entry with link '${metadata}' can't be created`, null, err);
//       return next(customError);
//     }

//     const jwtPayload: JwtPayload = {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role as Role,
//       created_at: user.created_at,
//     };

//     try {
//       const token = createJwtToken(jwtPayload);
//       res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
//     } catch (err) {
//       const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
//       return next(customError);
//     }
//   } catch (err) {
//     const customError = new CustomError(400, 'Raw', 'Error', null, err);
//     return next(customError);
//   }
// };
