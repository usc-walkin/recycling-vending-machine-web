import { attachAssets } from '@nodekit/express-isomorphic';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

const makeHtml: MakeHtml = async function ({
  assets,
  requestUrl = '',
  universalAppPath = '',
}) {
  let Universal;
  try {
    Universal = require(universalAppPath).default;
  } catch (err) {
    console.error('Error loading UniversalApp at path: %s\nOriginal Error: %o', universalAppPath, err);
    Universal = () => <div>RootContainer not found</div>;
  }

  const appRoot = (
    <Universal />
  );

  const appRootInString = renderToString(appRoot);
  console.log('[make-html] app in string: %s', appRootInString);

  const sheet = new ServerStyleSheet();
  const styledComponentsStyleTags = sheet.getStyleTags();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>express-isomorphic-example</title>
  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>
  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />
  ${styledComponentsStyleTags}
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${attachAssets(assets)}
</body>
</html>
`;
};

export default makeHtml;

interface MakeHtml {
  (arg: {
    assets: string[];
    requestUrl: string;
    universalAppPath: string;
  }): Promise<string>;
}