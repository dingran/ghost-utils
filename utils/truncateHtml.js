const truncate = require('truncate-html');

export default function truncateHtml(html, previewLength, previewRatio) {
  let length = previewLength || 500;
  // preview ratio can overwrite preview length
  if (previewRatio && previewRatio > 0 && previewRatio <= 1) {
    let strippedString = html
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/\n/g, '')
      .trim();
    // console.log(strippedString.trim());
    const contentLength = strippedString.length;
    length = Math.round(contentLength * previewRatio);
  }
  return truncate(html, length);
}
