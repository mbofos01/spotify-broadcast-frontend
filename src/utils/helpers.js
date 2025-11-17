export const truncateName = (name, maxLength = 25) => {
  if (!name) return "";
  return name.length > maxLength ? name.slice(0, maxLength) + "…" : name;
};
