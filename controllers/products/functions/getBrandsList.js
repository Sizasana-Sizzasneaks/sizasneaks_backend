const getBrandsList = (products) => {
  try {
    var brands = [];

    products.forEach((product) => {
      brands.push(product.brand);
    });

    var brandList = [...new Set(brands)];

    return { ok: true, data: brandList };
  } catch {
    return { ok: false, message: "Failed to get Brand List from Products" };
  }
};

module.exports = getBrandsList;
