import { AxiosRequestConfig } from "axios";
import { config } from 'dotenv';
config();

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'apikey': `${process.env.EXCHANGE_RATE_API}`,
    },
};