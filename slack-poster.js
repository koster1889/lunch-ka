const webhookUrl = process.env.WEBHOOL_URL;
if (!webhookUrl) {
	console.error('The WEBHOOK_URL env variable needs to be set.')
	process.exit(1);
}

const { IncomingWebhook } = require('@slack/client');
const hook = new IncomingWebhook(webhookUrl);

function postMessage(message) {
	hook.send(message, (err, resp) => {
		if (err) {
			return console.error('Not able to send message.');
		}
		console.log('Successfully posted message');
	});
}

module.exports = {
    postMessage: postMessage
};
