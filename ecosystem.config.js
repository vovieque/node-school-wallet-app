module.exports = {
	apps: [
		{
			name: 'node-school-app',
			script: 'source/app.js',
			instance_var: 'INSTANCE_ID',
			exec_mode: 'cluster',
			instances: 4,
			env: {
				NODE_PATH: '.'
			},
			env_development: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}, {
			name: 'telegram-bot',
			script: 'telegram-bot/index.js',
			env: {
				NODE_PATH: '.'
			},
			env_development: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
