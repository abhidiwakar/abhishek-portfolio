export const protectedUIPath = [
  new RegExp(/\/project\/add/),
  new RegExp(/\/project\/[a-zA-Z0-9-]+\/edit/),
];

export const protectedAPIPath = [
  {
    method: new Set(["*"]),
    path: new RegExp(/\/api\/technologies/),
  },
  {
    method: new Set(["*"]),
    path: new RegExp(/\/api\/team/),
  },
  {
    method: new Set(["POST"]),
    path: new RegExp(/\/api\/project/),
  },
];
