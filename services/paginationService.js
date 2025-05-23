const paginate = async (model, page, limit, options = {}) => {
  const { count, rows } = await model.findAndCountAll({
    offset: (page - 1) * limit,
    limit: limit,
    order: options.order,
    where: options.where,
    attributes: options.attributes,
  });

  // console.log('Paginate function called with options:', {
  //   page,
  //   limit,
  //   count,
  //   rows,
  // });

  return {
    data: rows,
    page,
    pageSize: limit,
    total: count,
    totalPages: Math.ceil(count / limit),
  };
};

module.exports = {
  paginate,
};
