import { Module } from '@nestjs/common';
import { RecordsRepository } from 'src/application/repositories/records-repository';
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
