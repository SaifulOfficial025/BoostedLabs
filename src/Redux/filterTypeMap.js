// Mapping of filter categories to their type IDs from the backend
export const filterTypeMap = {
  "weight-loss": 1,
  cosmetic: 2,
  performance: 3,
  energy: 4,
  metabolic: 5,
  healing: 6,
};

// Reverse mapping to get display name from ID
export const filterIdToName = {
  1: "Weight Loss",
  2: "Cosmetic",
  3: "Performance",
  4: "Energy",
  5: "Metabolic",
  6: "Healing",
};

// Get type ID from category slug
export const getTypeIdFromCategory = (category) => {
  return filterTypeMap[category] || null;
};

// Get display name from category slug
export const getDisplayName = (category) => {
  const typeId = filterTypeMap[category];
  return typeId ? filterIdToName[typeId] : null;
};
