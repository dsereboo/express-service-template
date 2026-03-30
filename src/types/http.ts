import { STATUS_CODES } from "src/utils/constants";

export type HTTPStatusCodes = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];