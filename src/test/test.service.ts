import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Test } from './test.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FatRate } from 'src/fat-rate-data/fat-rate-data.entity';
import { Vki } from 'src/vki-data/vki.data.entity';
import { User } from 'src/user/user.entity';
import { FatRateCalculateDto, VkiCalculateDto } from './dto/calculate.dto';
import { GenderEnum, TestType, testTypeName } from 'src/enums/user.enum';
const DietList = require('../assets/static-files/diyet-list.json');
const { vki, fatRate } = require('../assets/static-files/result.json');
const SporList = require('../assets/static-files/spor-list.json');

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly repo: Repository<Test>,
    @InjectRepository(FatRate)
    private readonly fatRateRepo: Repository<FatRate>,
    @InjectRepository(Vki)
    private readonly vkiRepo: Repository<Vki>,
  ) {}

  async calculateFatRate(dto: FatRateCalculateDto, user: User) {
    try {
      let result = 0;
      if (dto.gender === GenderEnum.Male) {
        // erkek
        result =
          495 /
            (1.0324 -
              0.19077 * Math.log10(dto.waist - dto.neck) +
              0.15456 * Math.log10(dto.height)) -
          450;
      } else {
        result =
          495 /
            (1.29579 -
              0.35004 * Math.log10(dto.waist + dto.hip - dto.neck) +
              0.221 * Math.log10(dto.height)) -
          450;
      }
      if (result <= 0) {
        throw new HttpException(
          "Bilgileriniz yanlış olmalı. Yağ oranınız 0'ın altında.",
          HttpStatus.BAD_REQUEST,
        );
      }
      let suggestions = '';
      let description = '';
      let img: string | null = null;
      const newFatRate = await this.fatRateRepo.save(dto);
      fatRate.forEach((rate: any) => {
        if (rate.baslangicDegeri <= result && rate.bitisDegeri >= result) {
          suggestions = (rate.diyetList as string[]).join(',');
          if (suggestions.length > 0) suggestions += ',';
          suggestions += (rate.sporList as string[]).join(',');
          description = rate.description;
          img = rate.img;
        }
      });
      const testResult = await this.repo.save({
        name: testTypeName[TestType.FAT_RATE],
        type: TestType.FAT_RATE,
        result: Math.round(result),
        suggestions,
        fatRateId: newFatRate.id,
        userId: user.id,
        description,
        img,
      });

      await this.fatRateRepo.update(
        { id: newFatRate.id },
        {
          testId: testResult.id,
        },
      );

      return testResult;
    } catch (error) {
      throw error;
    }
  }

  async calculateVki(dto: VkiCalculateDto, user: User) {
    try {
      const heightMeter = dto.height / 100;
      let result = dto.weight / (heightMeter * heightMeter);
      if (result <= 0) {
        throw new HttpException(
          "Bilgileriniz yanlış olmalı. Vücut Kitle İndeksiniz 0'ın altında.",
          HttpStatus.BAD_REQUEST,
        );
      }
      if (result <= 0) {
        throw new HttpException(
          "Bilgileriniz yanlış olmalı. Vücut Kitle İndeksiniz 40'ın üzerinde",
          HttpStatus.BAD_REQUEST,
        );
      }
      const newVki = await this.vkiRepo.save(dto);
      let suggestions = '';
      let description = '';
      let img: string | null = null;
      vki.forEach((each: any) => {
        if (each.baslangicDegeri <= result && each.bitisDegeri >= result) {
          suggestions = (each.diyetList as string[]).join(',');
          if (suggestions.length > 0) suggestions += ',';
          suggestions += (each.sporList as string[]).join(',');
          description = each.description;
          img = each.img;
        }
      });

      const testResult = await this.repo.save({
        name: testTypeName[TestType.VKI],
        type: TestType.VKI,
        userId: user.id,
        vkiId: newVki.id,
        suggestions,
        result: Math.round(result),
        description,
        img,
      });
      await this.vkiRepo.update(
        { id: newVki.id },
        {
          testId: testResult.id,
        },
      );

      return testResult;
    } catch (error) {
      throw error;
    }
  }

  async getMyTestResult(user: User) {
    try {
      const myVkiDatas = await this.repo.findAndCount({
        where: {
          userId: user.id,
          type: TestType.VKI,
        },
        order: {
          date: 'DESC',
        },
        cache: true,
      });
      const myFatRateDatas = await this.repo.findAndCount({
        where: {
          userId: user.id,
          type: TestType.FAT_RATE,
        },
        order: {
          date: 'DESC',
        },
        cache: true,
      });
      return {
        vki: {
          rows: myVkiDatas[0],
          count: myVkiDatas[1],
        },
        fatRate: {
          rows: myFatRateDatas[0],
          count: myFatRateDatas[1],
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getMyVkiTestDatas(id: string) {
    try {
      const data = await this.vkiRepo.findOneBy({ id });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getMyFatRateTestDatas(id: string) {
    try {
      const data = await this.fatRateRepo.findOneBy({ id });
      return data;
    } catch (error) {
      throw error;
    }
  }
}
