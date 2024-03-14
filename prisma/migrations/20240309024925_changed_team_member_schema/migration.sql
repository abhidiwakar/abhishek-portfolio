/*
  Warnings:

  - You are about to drop the column `teamMemberId` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_teamMemberId_fkey";

-- AlterTable
ALTER TABLE "Social" DROP COLUMN "teamMemberId",
ADD COLUMN     "memberId" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "avatar",
DROP COLUMN "name",
ADD COLUMN     "memberId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
