module.exports = {
	root: true,
	extends: '@react-native',
	rules: {
        'react/no-unstable-nested-components': 'off',
        'no-useless-escape': 'off',
        "react-hooks/exhaustive-deps": "off"
    },
    ignorePatterns: [
		'.eslintrc.js',
		'prettierrc',
		'node_modules/*',
	],
	env: {
		'browser': true,
		'es2021': true,
		'react-native/react-native': true,
	},
};
