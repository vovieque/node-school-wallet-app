/* eslint-disable */

module.exports = {
	"extends": "airbnb",

	"globals": {
		"document": true
	},

	"rules": {
		"strict": 0,
		"comma-dangle": 0,
		"no-tabs": 0,
		"indent": [2, "tab", {"SwitchCase": 1}],
		"arrow-parens": [2, "always"],
		"no-underscore-dangle": [2, {"allowAfterThis": true}],
		"max-len": [2, 120, 4, {"ignoreUrls": true}],
		"no-confusing-arrow": [2, {"allowParens": true}],
		"object-curly-spacing": [2, "never"],

		"import/no-extraneous-dependencies": 0,
		"import/no-unresolved": 0,

		"jsx-quotes": [2, "prefer-single"],

		"react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-closing-bracket-location": [1, "after-props"],
		"react/require-default-props": 0,
		"react/no-array-index-key": 0
	}
};
