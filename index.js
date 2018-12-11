const { RTMClient, WebClient } = require('@slack/client');
const randomGreet = require('./lib/getRandomGreet');
const { parrotize } = require('./lib/msgProcessing');
const TOKEN = "xoxb-bot-user-token";

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(TOKEN);
const web = new WebClient(TOKEN);
rtm.start();

const memberChannels = [];

function talkToChannel(cid, msg) {
  return rtm.sendMessage(msg, cid);
}

function broadcastToAllMemberRooms(msg) {
  const pArr = memberChannels.map((c) => {
    return talkToChannel(c.id, msg);
  });
  return Promise.all(pArr);
}

function refreshRooms() {
  return web.channels.list()
    .then((res) => {
      res.channels.forEach((c) => {
        if(c.is_member && memberChannels.indexOf(c) < 0) {
          memberChannels.push(c);
        }
      });
    });
}

rtm.on('message', (msg) => {
  // For structure of `message`, see https://api.slack.com/events/message

  // Skip messages that are from a bot or my own user ID
  if ((msg.subtype && msg.subtype === 'bot_message') || (!msg.subtype && msg.user === rtm.activeUserId)) {
    return;
  }

  // Log the message
  console.log(`(channel:${msg.channel}) ${msg.user} says: ${msg.text}`);
});

refreshRooms()
  .then(() => {
    // squawk!
    broadcastToAllMemberRooms(`${parrotize(randomGreet())}`);
  });
