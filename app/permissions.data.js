const defaultAppearance = [
  {
    text: "Create",
    value: "CREATE"
  },
  {
    text: "Fetch One",
    value: "FETCHONE"
  },
  {
    text: "Fetch All",
    value: "FETCHALL"
  },
  {
    text: "Update",
    value: "UPDATE"
  },
  {
    text: "Delete",
    value: "DELETE"
  }
];
const defaultValues = (() => {
  return defaultAppearance.map(item => {
    return item.value;
  });
})();
module.exports = {
  bundles: {
    appearance: [...defaultAppearance],
    values: [...defaultValues]
  }
};
