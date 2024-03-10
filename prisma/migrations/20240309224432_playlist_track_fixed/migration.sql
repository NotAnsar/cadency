/*
  Warnings:

  - A unique constraint covering the columns `[trackId,playlistId]` on the table `PlaylistTrack` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PlaylistTrack_trackId_playlistId_key" ON "PlaylistTrack"("trackId", "playlistId");
