/*
  Warnings:

  - You are about to drop the column `discord` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `skype` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `slack` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `Social` table. All the data in the column will be lost.
  - Added the required column `link` to the `Social` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Social` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SocialType" AS ENUM ('GITHUB', 'LINKEDIN', 'TWITTER', 'EMAIL', 'YOUTUBE', 'DISCORD', 'SLACK', 'SKYPE');

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "discord",
DROP COLUMN "email",
DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "skype",
DROP COLUMN "slack",
DROP COLUMN "twitter",
DROP COLUMN "youtube",
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "name" "SocialType" NOT NULL;
