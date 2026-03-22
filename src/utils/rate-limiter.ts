import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    // 15 minutes
    windowMs: 15 * 60 * 1000, 
    // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	limit: 100, 
     // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	standardHeaders: 'draft-8',
    // Disable the `X-RateLimit-*` headers.
	legacyHeaders: false, 
	ipv6Subnet: 56,
})