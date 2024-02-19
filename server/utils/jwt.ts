import dotenv from "dotenv";

dotenv.config();

if(!process.env.SECRET)
    throw Error(".env 's SECRET is absent, please fill in");

    if (!process.env.EMAIL)
  throw Error(".env 's EMAIL is absent, please fill in");

if (!process.env.MOBILE_PHONE)
  throw Error(".env 's MOBILE_PHONE is absent, please fill in");

export default {
    jwtSecret: process.env.SECRET,
    jwtSession:{
        session: false,
    },
    email: process.env.EMAIL,
    mobilePhone: process.env.MOBILE_PHONE,
}