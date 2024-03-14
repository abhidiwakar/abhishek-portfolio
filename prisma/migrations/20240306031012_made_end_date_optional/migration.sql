-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "technologies" TEXT[],
ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "avatar" DROP NOT NULL;
