
const cron = require('node-cron');
const slack = require('./slack-poster');
const scraper = require('./star-scraper');

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
//postTime = BEFORE_LUNCH_ON_WEEKDAYS;

cronString = `0 ${postTime.minute} ${postTime.hour} * * ${postTime.daysOfWeek}`;

console.log('Scheduling...');
cron.schedule(cronString, whatsForLunch);
console.log('Scheduled!');

function whatsForLunch() {
	scraper.scrape().then(slack.postMessage)
	.catch(slack.postMessage);
}
