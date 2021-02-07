export function startsWithHttp(str) {
  // console.log(str);
  return (
    str.toLowerCase().startsWith('http://') ||
    str.toLowerCase().startsWith('https://')
  );
}

export function validUrl(str) {
  // if (!startsWithHttp(str)) return false;
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

function request_image(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function () {
      reject(url);
    };
    img.src =
      url +
      '?random-no-cache=' +
      Math.floor((1 + Math.random()) * 0x10000).toString(16);
  });
}

function ping(url, multiplier) {
  return new Promise(function (resolve, reject) {
    var start = new Date().getTime();
    var response = function () {
      var delta = new Date().getTime() - start;
      delta *= multiplier || 1;
      resolve(delta);
    };
    request_image(url).then(response).catch(response);

    // Set a timeout for max-pings, 5s.
    setTimeout(function () {
      reject(Error('Timeout'));
    }, 1000);
  });
}

export const reachUrl = async (url) => {
  if (!validUrl(url)) return false;
  try {
    const result = await ping(url);
    return true;
  } catch (err) {
    // console.log(err);
    return false;
  }
};
