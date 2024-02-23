import express from "express";
import { CheckInService } from "../services/checkInService";



export class CheckInController {
    router = express.Router()
    constructor(private checkInService: CheckInService) {
        this.router.get
    }
}