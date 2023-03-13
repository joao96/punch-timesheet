import { PrismaService } from '../prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaRecordsRepository } from './prisma-records-repository';
import { Moment } from '@application/entities/moment';

const fakeRecords = [
  {
    id: 'fake-id-1',
    day: new Date('2023-03-09'),
    schedule: ['08:00:00', '12:00:00'],
  },
  {
    id: 'fake-id-2',
    day: new Date('2023-03-10'),
    schedule: ['08:00:00'],
  },
  {
    id: 'fake-id-3',
    day: new Date('2023-03-10'),
    schedule: ['08:00:00', '12:00:00'],
  },
];

const prismaMock = {
  record: {
    findMany: jest.fn().mockReturnValue(fakeRecords),
    update: jest.fn().mockResolvedValue(fakeRecords[2]),
    findFirst: jest.fn().mockResolvedValue(fakeRecords[1]),
    create: jest.fn().mockResolvedValue(fakeRecords[0]),
  },
};

describe('Prisma records', () => {
  let prismaRecordsRepository: PrismaRecordsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaRecordsRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    prismaRecordsRepository = module.get<PrismaRecordsRepository>(
      PrismaRecordsRepository,
    );
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should execute createRecord', async () => {
    const moment = new Moment('2023-03-09T:08:00:00');
    const { id, schedule } = await prismaRecordsRepository.createRecord(moment);
    expect(id).toEqual(fakeRecords[0].id);
    expect(schedule).toEqual(fakeRecords[0].schedule);
    expect(prisma.record.create).toHaveBeenCalledTimes(1);
  });

  it('should execute findByDay', async () => {
    const day = '2023-03-10';
    const { id, schedule } = await prismaRecordsRepository.findByDay(day);
    expect(id).toEqual(fakeRecords[1].id);
    expect(schedule).toEqual(fakeRecords[1].schedule);
    expect(prisma.record.findFirst).toHaveBeenCalledTimes(1);
  });

  it('should execute updateRecord', async () => {
    const moment = new Moment('2023-03-10T:12:00:00');
    const { id, schedule } = await prismaRecordsRepository.updateRecord(moment);
    expect(id).toEqual(fakeRecords[2].id);
    expect(schedule).toEqual(fakeRecords[2].schedule);
    expect(prisma.record.findFirst).toHaveBeenCalledTimes(2);
    expect(prisma.record.update).toHaveBeenCalledTimes(1);
  });

  it('should execute findAllByMonth', async () => {
    const yearMonth = '2023-03';
    const records = await prismaRecordsRepository.findAllByMonth(yearMonth);
    expect(records).toHaveLength(3);
    expect(records[0].id).toEqual(fakeRecords[0].id);
    expect(records[1].id).toEqual(fakeRecords[1].id);
    expect(records[2].id).toEqual(fakeRecords[2].id);
    expect(prisma.record.findMany).toHaveBeenCalledTimes(1);
  });
});
