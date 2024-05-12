import { env } from "../envConfig";
export const jwtConfig = {
    secret: env.JWT_SECRET,
    expiresIn: '1h',
};