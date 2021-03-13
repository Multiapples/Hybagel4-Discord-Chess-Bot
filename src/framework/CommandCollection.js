module.exports = {
	
	name: '',
	description: '',
	subCommands: new Map(),
	
	execute(message, arguments, jointArguments) {
		
		const subCommandPieces = jointArguments.split(/ +/);
		
		const subName = subCommandPieces.shift();
		const subArguments = subCommandPieces;
		const subJointArguments = jointArguments.slice(subName.length).trim();
		
		if (this.doesCommandExist(subName)) {
			
			try {
				
				this.subCommands.get(subName).execute(message, subArguments, subJointArguments);
				
			} catch (error) {
				
				console.error(error);
				message.reply('An error occurred.')
			}
		}
	},
	
	setSubCommands(commands) {
		
		commands.forEach( c => {
			
			this.subCommands.set(c.name, c);
		});
	},
	
	doesCommandExist(name) {
		
		return this.subCommands.has(name);
	},
}

