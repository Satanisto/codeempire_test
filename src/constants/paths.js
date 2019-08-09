export const PUBLIC = process.env.PUBLIC_URL;
export const IMAGES = `${PUBLIC}/images`;

export const BURGERS = `${IMAGES}/burgers`;
export const INGREDIENTS = `${IMAGES}/ingredients`;
export const BUNS = `${IMAGES}/buns`;
export const MEATS = `${IMAGES}/meats`;
export const SAUCES = `${IMAGES}/sauces`;

export const IMAGE_EXTENSION = "png";

export function getImage(type, name) {
  return `${type}/${name}.${IMAGE_EXTENSION}`;
}
