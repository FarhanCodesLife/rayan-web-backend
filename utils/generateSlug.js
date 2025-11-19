export const generateSlug = (text = "") => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")          // replace spaces with -
    .replace(/[^\w\-]+/g, "")      // remove special characters
    .replace(/\-\-+/g, "-")        // remove multiple --
    .replace(/^-+/, "")            // trim - from start
    .replace(/-+$/, "");           // trim - from end
};

export default generateSlug;
