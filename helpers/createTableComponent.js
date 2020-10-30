const DEFAULT_OPTIONS = {
  paginateBy: null,
  defaultPage: null,
  sortBy: null,
  sortOrder: "asc"
};

module.exports = function createTableComponent(
  include,
  name,
  dataObject,
  options = DEFAULT_OPTIONS
) {
  let pages = {};
  let { paginateBy, defaultPage, sortBy, sortOrder, limitCols } = options;
  const { header } = dataObject;

  if (paginateBy) {    
    if(sortBy) {
      dataObject.items.sort((a, b) => sortOrder === "asc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]);
    } else {
      dataObject.items.sort((a, b) => a[paginateBy] - b[paginateBy]);
    }

    dataObject.items.forEach((item) => {
      if (!pages[item[paginateBy]]) {
        pages[item[paginateBy]] = [];
      }
      pages[item[paginateBy]].push(item);
    });
  } else {
    pages = { 0: dataObject.items };
  }

  if (!defaultPage) {
    defaultPage = Object.keys(pages)[0];
  }

  return {
    tableOutput: include("components/TableOutput", { pages, name, header, paginateBy, limitCols }, {async: false}),
    scriptOutput: include("components/TableScript", { pages, name, defaultPage }, {async: false}),
  };
};
