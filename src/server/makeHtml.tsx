import { attachAssets } from '@nodekit/express-isomorphic';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

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

  console.log(123, assets);

  const appRoot = (
    <Universal />
  );

  const appRootInString = renderToString(appRoot);
  console.log('[make-html] app in string: %s', appRootInString);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>express-isomorphic-example</title>
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