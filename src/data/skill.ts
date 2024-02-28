import AWSIcon from "@/assets/icons/aws-logo.svg";
import DigitalOceanIcon from "@/assets/icons/digital-ocean-logo.svg";
import ExpressIcon from "@/assets/icons/express-logo.svg";
import MongoDBIcon from "@/assets/icons/mongodb-logo.svg";
import MySQLIcon from "@/assets/icons/mysql-logo.svg";
import NextJsIcon from "@/assets/icons/nextjs-logo.svg";
import NodeJsIcon from "@/assets/icons/nodejs-logo.svg";
import ReactIcon from "@/assets/icons/react-logo.svg";
import FlutterIcon from "@/assets/icons/flutter-logo.svg";
import { Skill } from "@/types/skill";
import dayjs from "dayjs";

export const careerStartDate = new Date("2020-08-01");
const technostacksStartDate = new Date("2022-12-01");
const technostacksEndDate = new Date("2024-01-31");

const skills: Skill[] = [
  {
    icon: ReactIcon,
    experience: [
      {
        startDate: careerStartDate,
        endDate: new Date(),
      },
    ],
    name: "React",
  },
  {
    icon: NextJsIcon,
    experience: [
      {
        startDate: dayjs(careerStartDate).add(1, "year").toDate(),
        endDate: new Date(),
      },
    ],
    name: "Next.js",
  },
  {
    icon: NodeJsIcon,
    experience: [
      {
        startDate: careerStartDate,
        endDate: new Date(),
      },
    ],
    name: "Node.js",
  },
  {
    icon: ExpressIcon,
    experience: [
      {
        startDate: careerStartDate,
        endDate: new Date(),
      },
    ],
    name: "Express.js",
  },
  {
    icon: MongoDBIcon,
    experience: [
      {
        startDate: technostacksStartDate,
        endDate: new Date(),
      },
    ],
    name: "MongoDB",
  },
  {
    icon: MySQLIcon,
    experience: [
      {
        startDate: careerStartDate,
        endDate: technostacksStartDate,
      },
      {
        startDate: technostacksEndDate,
        endDate: new Date(),
      },
    ],
    name: "MySQL",
  },
  {
    icon: FlutterIcon,
    experience: [
      {
        startDate: dayjs(careerStartDate).subtract(6, "months").toDate(),
        endDate: technostacksStartDate,
      },
    ],
    name: "Flutter",
  },
  {
    icon: AWSIcon,
    experience: [
      {
        startDate: dayjs(technostacksStartDate).subtract(3, "months").toDate(),
        endDate: new Date(),
      },
    ],
    name: "AWS Services",
  },
  {
    icon: DigitalOceanIcon,
    experience: [
      {
        startDate: dayjs(technostacksStartDate).add(6, "months").toDate(),
        endDate: technostacksEndDate,
      },
    ],
    name: "Digital Ocean",
  },
];

export default skills;
