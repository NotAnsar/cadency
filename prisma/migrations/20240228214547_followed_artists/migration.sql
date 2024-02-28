-- CreateTable
CREATE TABLE "Artist" (
    "userId" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Artist_artistId_userId_key" ON "Artist"("artistId", "userId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
