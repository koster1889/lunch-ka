const webhookUrl = process.env.WEBHOOL_URL;
if (!webhookUrl) {
	console.error('The WEBHOOK_URL env variable needs to be set.')
	process.exit(1);
}

const { RTMClient, WebClient, IncomingWebhook } = require('@slack/client');
const cheerio = require('cheerio')
const axios = require('axios')
const cron = require('node-cron')

const hook = new IncomingWebhook(webhookUrl);

const postTime = {
	hour: 10,
	minute: 30,
    daysOfWeek: '1,2,3,4,5'
};

console.log('Scheduling...');
cron.schedule(`0 ${postTime.minute} ${postTime.hour} * * ${postTime.daysOfWeek}`, whatsForLunch);
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
	}).then(postMessage);
}

function postMessage(message) {
	hook.send(message, (err, resp) => {
		if (err) {
			return console.error('Not able to send message.');
		}
		console.log('Successfully posted message');
	});
}
