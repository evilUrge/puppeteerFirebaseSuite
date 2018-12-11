exports.baseDir = require('path').join(__dirname, '..');

exports.getBrowserPage = async () => {
    /**
     * Creates a headless webdriver.
     */
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    return browser.newPage();
};
