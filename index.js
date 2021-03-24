/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
// Vars, Imports, And Configs
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv');
let prefixChange = false;
dotenv.config();
// Logs ready to console when bot turns on
client.on('ready', () => {
	console.log('Im Ready');
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
		message.channel.send(`The prefix was changed to ${prefix}`);
		message.channel.send('THIS PREFIX WONT SAVE AFTER THE NEXT RESTART, THIS WILL BE FIXED SO PLEASE DONT SPAM ME WITH MY PREFIX ISNT SAVED');
	}
	// name method call for bot
	if (message.content == prefix + 'name' && message.author != message.author.bot) {
		message.author.send(`hello, ${message.author.username}, my name is MonkeOS Support Bot and the server you are in is called ${message.guild.name}`);
		console.log(`hello, ${message.author.username}, my name is MonkeOS Support Bot and the server you are in is called ${message.guild.name}`);
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
