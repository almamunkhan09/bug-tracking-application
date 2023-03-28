"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    if (err) {
        console.log(err);
        res.status(400).json({
            messsage: 'Ops an error occured. Refresh and retry.If the erro persists please contact us',
        });
    }
    next();
}
exports.default = errorHandler;
