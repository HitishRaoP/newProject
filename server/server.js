const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const scrapeAmazon = async (query) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://amzn.to/3vLv3Zp");
    await page.type("#twotabsearchtextbox", query);
    await page.click("#nav-search-submit-button");
    await page.waitForSelector(".s-pagination-next");
  
    // Gather product title
    const title = await page.$$eval(".a-color-base.a-text-normal", (nodes) =>
      nodes.map((n) => n.innerText)
    );
  
    // Gather price
    const price = await page.$$eval(
      ".a-price-whole",
      (nodes) => nodes.map((n) => n.innerText)
    );
    
  
    const review = await page.$$eval(".aok-align-bottom", (nodes) =>
      nodes.map((n) => n.innerText)
    );
  
    // Consolidate product search data
    const amazonSearchArray = title.slice(0, 50).map((value, index) => {
      return {
        title: title[index],
        price: price[index],
        rating: review[index],
      };
    });
  
    await browser.close();
    return amazonSearchArray;
};

const scrapeFlipkart = async (query) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://www.flipkart.com/");
    await page.type(".Pke_EE", query);
    await page.click("._2iLD__");
  
    // Gather product title
    const title = await page.$$eval(".s1Q9rs , ._4rR01T, .IRpwTa" , (nodes) =>
      nodes.map((n) => n.innerText)
    );
  
    // Gather price
    const price = await page.$$eval(
      "._30jeq3 , _30jeq3 _1_WHN1 ",
      (nodes) => nodes.map((n) => n.innerText)
    );
  
    const review = await page.$$eval("._3LWZlK" , (nodes) =>
      nodes.map((n) => n.innerText)
    );
  
    // Consolidate product search data
    const FlipkartSearchArray = title.slice(0, 50).map((value, index) => {
      return {
        title: title[index],
        price: price[index],
        rating: review[index]? review[index] + " out of 5 stars" : "N/A",
      };
    });
  
    await browser.close();

    return FlipkartSearchArray;
};

app.get("/scrape/:query", async (req, res) => {
    const { query } = req.params;

    try {
        const flipkartData = await scrapeFlipkart(query);
        const amazonData = await scrapeAmazon(query);

        const data = {
            flipkart: flipkartData,
            amazon: amazonData,
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});