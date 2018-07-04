
const slack = require('./slack-poster');
const scraper = require('./star-scraper');

whatsForLunch();

function whatsForLunch() {
	scraper.scrape().then(slack.postMessage)
	.catch(slack.postMessage);
}

