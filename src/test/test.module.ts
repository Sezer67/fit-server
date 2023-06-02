import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "./test.entity";
import { FatRate } from "src/fat-rate-data/fat-rate-data.entity";
import { Vki } from "src/vki-data/vki.data.entity";
import { TestService } from "./test.service";
import { TestController } from "./test.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Test,FatRate,Vki])],
    providers: [TestService],
    controllers: [TestController],
})

export class TestModule {};