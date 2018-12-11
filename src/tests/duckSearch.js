const utils = require('../utils');
const constant = require('../constant').duck_search;
let page;

/**
 * Example test that goes to duckduckgo querying and retrieve a screenshot of the desired result(or just the first one).
 * @param req - expecting the following GET params {query: required, result: default 0}
 * @param res -
 * @return {Promise<void>} - req  200 with a screenshot of the desired result.
 */
exports.duckSearch = async (req, res) => {
    const query = req.query.query;

    page = page ? page : await utils.getBrowserPage();
    const result = constant.selectors.specific_result.replace('{}',req.query.result ? req.query.result : '0');
    if (!query) {
        res.status(404).send('Missing search query arg');
    } else{
        try {
            await page.goto(constant.conf.url);
            await page.waitForSelector(constant.selectors.searchbar_textbox);
            await page.type(constant.selectors.searchbar_textbox, query);
            await page.keyboard.press('Enter');
            await page.waitForSelector(result);

            await page.click(result);
            await page.waitForSelector(result, { hidden: true });
            const imageBuffer = await page.screenshot();
            res.set('Content-Type', 'image/png');
            res.status(200).send(imageBuffer);

        } catch (e) {
            res.status(500).send(JSON.stringify(e));
        }
    }

};
