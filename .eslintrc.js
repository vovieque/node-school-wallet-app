module.exports = {
	extends: 'airbnb',

	rules: {
		'strict': 0,
		'comma-dangle': 0,
		'no-tabs': 0,
		'indent': [2, 'tab'],
		'arrow-parens': 2,

		'import/no-extraneous-dependencies': 0,
		'import/no-unresolved': 0,

		'no-underscore-dangle': [2, {'allowAfterThis': true}]
	}
};
