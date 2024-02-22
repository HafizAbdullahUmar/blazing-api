"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorImageStore = void 0;
const CustomError_1 = require("utils/response/custom-error/CustomError");
const validatorImageStore = (req, res, next) => {
    const errorsValidation = [];
    if (!req.file) {
        errorsValidation.push({ file: "Image file field is required" });
    }
    if (errorsValidation.length !== 0) {
        const customError = new CustomError_1.CustomError(400, "Validation", "Image validation error", null, null, errorsValidation);
        return next(customError);
    }
    return next();
};
exports.validatorImageStore = validatorImageStore;
//# sourceMappingURL=validatorImageStore.js.map