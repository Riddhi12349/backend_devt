const fs = require("fs");

/////////////////////////////////////////////////////////
//*********** files ********
// blocking -- asynchronously
/*
const txt = fs.readFileSync("./input.txt", "utf-8");
console.log(txt);

fs.writeFileSync("./output.txt", txt);
*/
// non-blocking -- asynchronously
/*
fs.readFile("./input.txt", "utf-8", (err, data) => {
  console.log(err, data);
});
console.log("file is readed!");
*/

//////////////////////////////////////////////////////////////////
//************** WEB-SERVER *****************

const http = require("http");
const url = require("url");
const replaceTemplate = require("./templates/replaceTemplate.js");

const data_json = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data_json);

const products_json = fs.readFileSync(`${__dirname}/product.json`, "utf-8");
const productsObj = JSON.parse(products_json);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);

  const { query, pathname } = urlObj;

  if (pathname === "/" || pathname === "/overview") {
    //
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = productsObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace(/{%OVERVIEW-TEMPLATE%}/g, cardsHtml);
    res.end(output);
    //
  } else if (pathname === "/api") {
    // ***************** building a simple api at '/api' pathname ************

    // fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {

    //   const prodData = JSON.parse(data);
    //   res.writeHead(200, { "Content-Type": "application/json" });
    //   res.end(data);
    // });

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    //
  } else if (pathname === "/product") {
    //
    res.writeHead(200, { "Content-type": "text/html" });

    const output = replaceTemplate(tempProduct, productsObj[query.id]);

    res.end(output);
    //
  } else {
    //
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("Page Not Found! 404 ERROR!!");
  }
});

server.listen(8000, () => {
  console.log("server listning");
});
