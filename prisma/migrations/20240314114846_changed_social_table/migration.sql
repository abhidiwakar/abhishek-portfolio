/*
  Warnings:

  - You are about to drop the column `link` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Social` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "link",
DROP COLUMN "name",
ADD COLUMN     "discord" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "skype" TEXT,
ADD COLUMN     "slack" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "youtube" TEXT;
