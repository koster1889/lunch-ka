const cheerio = require('cheerio');
const axios = require('axios');

function scrape() {

	const params = {
		url: 'http://starbowling.se/restaurang/lunch',
		selector: '.node-dagens-lunch tbody'
	};

	const {url, selector} = params;

	return axios.get(url).then((response) => {
		if (response.status !== 200) {
			throw 'Unable to get lunch page :(';
		}
		const html = response.data;
		const $ = cheerio.load(html);
		return $(selector).text();
	})
}

module.exports = {
    scrape: scrape
};