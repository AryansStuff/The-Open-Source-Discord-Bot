/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
// Vars, Imports, And Configs
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
let prefixChange = false;
dotenv.config();
// Logs ready to console when bot turns on
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

client.on('ready', async () => {
	console.log('Im in');
	console.log(client.user.username);

	let i = 0;

	setInterval(function() {
		const activities = [`${client.guilds.cache.size} servers!`, `${client.channels.cache.size} channels!`, `${client.users.cache.size} users!`];

		client.user.setActivity(activities[i], { type: 'WATCHING' });

		i = (i + 1) % activities.length;
	}, 5 * 1000);

	client.on('guildCreate', async guild => {
		client.gData.set(guild.id, {
			_id: guild.id,
		});
	});
	client.on('guildDelete', async guild => {
		client.gData.delete(guild.id);
	});

	await sleep(100);

	client.guilds.cache.forEach(guild => {
		if (!client.gData(guild.id)) client.emit('guildCreate', (guild));
	});
	client.dat(data => {
		if (!client.guilds.cache.has(data._id)) client.emit('guildDelete', (data));
	});

	console.log(client.gData);
});
let prefix = '?';
client.on('message', message => {
	// Checking if prefixChange is true and that the message wasn't written by a bot, then changing prefix
	if (prefixChange == true) {
		if(message.author.bot) {
			return;
		}
		prefix = message.content;
		console.log(prefix);
		prefixChange = false;
		message.channel.send('The prefix was changed to', prefix);
	}
	// name method call for bot
	if (message.content == prefix + 'name' && message.author != message.author.bot) {
		message.author.send('hello,', message.author.username, ' my name is MonkeOS Support Bot and the server you are in is called ', message.guild.name);
		console.log('hello,', message.author.username, 'my name is MonkeOS Support Bot and the server you are in is called ', message.guild.name);
	}
	// changeprefix method call for bot
	if (message.content == prefix + 'changePrefix' && message.author != message.author.bot) {
		message.channel.send('What would you like me to change it to?');
		prefixChange = true;
	}
	// 'Uncomment these lines if you want to make sure your bot is getting input.';
	// const x = message.content;
	// console.log(x);
});
// Logging in as the bot and running everything
client.login(process.env.TOKEN);