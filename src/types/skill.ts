type Skill = {
  name: string;
  icon: string;
  experience: {
    startDate: Date;
    endDate: Date;
  }[];
  imgProps?: {
    className?: string;
  };
};

export type { Skill };
