import appRootPath from 'app-root-path';
import dotenv, { configDotenv } from 'dotenv';

export function EnvConfig(params){
    dotenv.config({
        path: appRootPath.resolve('./configs/env/.env')
    });
}