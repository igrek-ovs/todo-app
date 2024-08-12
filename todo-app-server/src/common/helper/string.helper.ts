export const tokenLifetimeStringToNumber = (str: string): number => Math.floor(Date.now() / 1000) + Number(str.replace("s", ""));
