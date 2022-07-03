createValidationError = (validationArray, ...params) => {
  const result = {};
  params.forEach((p) => {
    const error = validationArray.find((v) => v.param === p);
    if (error) result[p] = error.msg;
  });

  return result;
};

module.exports = createValidationError;
