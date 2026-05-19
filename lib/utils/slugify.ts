export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/[\s_-]+/g, '-') // swap spaces/underscores with single hyphen
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}
