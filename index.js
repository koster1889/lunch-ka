
const cheerio = require('cheerio');
const axios = require('axios');
const cron = require('node-cron');

const slack = require('./slack-poster');

const BEFORE_LUNCH_ON_WEEKDAYS = {
	hour: 10,
	minute: 30,
    daysOfWeek: '1,2,3,4,5'
};

const EVERY_MINUTE = {
	hour: '*',
	minute: '*',
    daysOfWeek: '*'
};

postTime = EVERY_MINUTE;

cronString = `0 ${postTime.minute} ${postTime.hour} * * ${postTime.daysOfWeek}`;

console.log('Scheduling...');
cron.schedule(cronString, whatsForLunch);
console.log('Scheduled!');

function whatsForLunch() {
	const url = 'http://starbowling.se/restaurang/lunch';
	const selector = '.node-dagens-lunch h2';

	axios.get(url).then((response) => {
		if (response.status !== 200) {
			return 'Unable to get lunch page :(';
		}
		const html = response.data;
		const $ = cheerio.load(html);
		return $(selector).text();
	}).then(slack.postMessage);
}
