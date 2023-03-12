-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "schedule" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Record_day_idx" ON "Record"("day");
