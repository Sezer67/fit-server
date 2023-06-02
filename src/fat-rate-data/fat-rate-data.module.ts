import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FatRate } from "./fat-rate-data.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FatRate])]
})

export class FatRateModule {};