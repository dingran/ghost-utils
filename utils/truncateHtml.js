const truncate = require('truncate-html');

export default function truncateHtml(
  html,
  previewLength,
  previewRatio,
  maxLength
) {
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

  if (maxLength) {
    try {
      length = length > maxLength ? maxLength : length;
    } catch (error) {
      console.error(error);
    }
  }

  return truncate(html, length);
}
