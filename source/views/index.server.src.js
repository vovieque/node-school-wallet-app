import React from 'react';
import {renderToString} from 'react-dom/server';
import {extractCritical} from 'emotion-server';
import serialize from 'serialize-javascript';
import {App} from '../client/components';

module.exports = (appData) => {
	const app = renderToString(<App data={appData} />);
	const {html, ids, css} = extractCritical(app);
	const viewData = `window.__data=${serialize({ids, appData})};`;

	return (
		<html>
			<head>
				<meta charset='utf-8' />
				<title>Node School App</title>
				<link rel='shortcut icon' href='/public/favicon.ico' />
				<link rel='stylesheet' href='index.css' />
				<style
					type='text/css'
					dangerouslySetInnerHTML={{__html: css}}>
				</style>
			</head>
			<body>
				<div
					id='root'
					dangerouslySetInnerHTML={{__html: html}}>
				</div>
				<script dangerouslySetInnerHTML={{__html: viewData}}></script>
				<script src='index.js'></script>
			</body>
		</html>
	);
};
