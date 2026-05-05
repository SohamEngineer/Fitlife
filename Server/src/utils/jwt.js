const DEFAULT_JWT_SECRET = "soham@33";

export const getJwtSecret = () => process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
