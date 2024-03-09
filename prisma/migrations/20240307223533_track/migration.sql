-- CreateTable
CREATE TABLE "Track" (
    "userId" TEXT NOT NULL,
    "trackId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_trackId_userId_key" ON "Track"("trackId", "userId");

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
