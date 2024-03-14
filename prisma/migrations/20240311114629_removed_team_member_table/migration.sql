/*
  Warnings:

  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToTeamMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `occupation` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_memberId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTeamMember" DROP CONSTRAINT "_ProjectToTeamMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTeamMember" DROP CONSTRAINT "_ProjectToTeamMember_B_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "occupation" TEXT NOT NULL;

-- DropTable
DROP TABLE "TeamMember";

-- DropTable
DROP TABLE "_ProjectToTeamMember";

-- CreateTable
CREATE TABLE "_MemberToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToProject_AB_unique" ON "_MemberToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToProject_B_index" ON "_MemberToProject"("B");

-- AddForeignKey
ALTER TABLE "_MemberToProject" ADD CONSTRAINT "_MemberToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToProject" ADD CONSTRAINT "_MemberToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
