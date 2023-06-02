import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vki } from "./vki.data.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Vki])]
})

export class VkiModule {};