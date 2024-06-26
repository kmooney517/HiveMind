module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
				alias: {
					'@navigation': './src/Navigation',
					'@redux': './src/Redux',
					'@components': './src/Components',
					'@auth': './src/Components/Auth',
					'@games': './src/Components/Games',
					'@home': './src/Components/Home',
					'@hive': './src/Components/Hive',
					'@profile': './src/Components/Profile',
					'@wordle': './src/Components/Games/Wordle',
					'@supabaseClient': './supabaseClient',
				},
			},
		],
		'react-native-reanimated/plugin',
		'babel-plugin-styled-components',
	],
};
