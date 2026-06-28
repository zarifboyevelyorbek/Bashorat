-- CreateTable
CREATE TABLE "Prediction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "interests" TEXT[],
    "dream" TEXT NOT NULL,
    "profession" TEXT,
    "resultText" TEXT NOT NULL,
    "shareSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_shareSlug_key" ON "Prediction"("shareSlug");
