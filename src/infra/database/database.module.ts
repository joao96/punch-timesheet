import { RecordsRepository } from '@application/repositories/records-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaRecordsRepository } from './prisma/repositories/prisma-records-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RecordsRepository,
      useClass: PrismaRecordsRepository,
    },
  ],
  exports: [RecordsRepository],
})
export class DatabaseModule {}
