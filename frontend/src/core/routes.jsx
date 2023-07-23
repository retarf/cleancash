export const BASE_ROUTES = {
  CREATE: "create",
};

export const APP_ROUTES = {
  CLEANINGS: {
    LIST: "/cleanings",
    EDIT: "/cleanings/:id",
    CREATE: `/cleanings/${BASE_ROUTES.CREATE}`,
  },
  CHILDREN: {
    LIST: "/children",
    EDIT: "/children/:id",
    CREATE: `/children/${BASE_ROUTES.CREATE}`,
  },
  SALARY: {
    LIST: "/salary",
    EDIT: "/salary/:id",
    CREATE: `/salary/${BASE_ROUTES.CREATE}`,
  },
  FIELDS: {
    LIST: "/fields",
    EDIT: "/fields/:id",
    CREATE: `/fields/${BASE_ROUTES.CREATE}`,
  },
};
