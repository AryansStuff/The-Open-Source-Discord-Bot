const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

client.on('ready', async () => {
  console.log("I'm in");
  console.log(client.user.username);

  let i = 0

  setInterval(function() {
    let activities = [`${client.guilds.cache.size} servers!`, `${client.channels.cache.size} channels!`, `${client.users.cache.size} users!`]

    client.user.setActivity(activities[i], { type: "WATCHING" })

    i = (i + 1) % activities.length
  }, 5 * 1000);

  client.on('guildCreate', async guild => {
    client.gData.set(guild.id, {
      _id: guild.id,
      prefix: process.env.PREFIX
    })
  })
  client.on('guildDelete', async guild => {
    client.gData.delete(guild.id)
  })

  await sleep(100)

  client.guilds.cache.forEach(guild => {
    if (!client.gData.has(guild.id)) client.emit('guildCreate', (guild))
  })
  client.gData.forEach(data => {
    if (!client.guilds.cache.has(data._id)) client.emit('guildDelete', (data))
  })

  console.log(client.gData)
});