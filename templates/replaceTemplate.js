module.exports = (temp, product) => {
  //
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%PRODUCTIMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCTFROM%}/g, product.from);
  output = output.replace(/{%PRODUCTNUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT-QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCTPRICE%}/g, product.price);
  output = output.replace(/{%PRODUCTDESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (product.organic === false) {
    output = output.replace(/{%ISORGANIC%}/g, "not-organic");
  }
  return output;
};
