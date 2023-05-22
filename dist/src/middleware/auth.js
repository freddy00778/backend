"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const auth_1 = require("../utils/auth");
/**
 * middleware to check whether user has access to a specific endpoint
 *
 */
// export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
const authorize = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let jwt = req.headers.authorization;
        if (!jwt)
            return res.status(401).json({ message: 'Invalid token ' });
        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        // verify token hasn't expired yet
        // const decodedToken = await validateToken(jwt);
        yield (0, auth_1.validateToken)(jwt);
        // const hasAccessToEndpoint = allowedAccessTypes.some(
        //     (at) => decodedToken.accessTypes.some((uat) => uat === at)
        // );
        // if (!hasAccessToEndpoint) {
        //     return res.status(401).json({ message: 'No enough privileges to access endpoint' });
        // }
        next();
    }
    catch (error) {
        // if (error.name === 'TokenExpiredError') {
        //     res.status(401).json({ message: 'Expired token' });
        //     return;
        // }
        res.status(401).json({ message: 'Failed to authenticate user' });
    }
});
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map