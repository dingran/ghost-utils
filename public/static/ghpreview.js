(function () {
  var defaultCSSSelector = 'aside[class*="upgrade-cta"]';
  var ctaElement =
    document.querySelector(defaultCSSSelector) ||
    document.querySelector('div[class*="post-access-cta"]');
  //TODO: allow custom selector

  if (!ctaElement) {
    console.log('[ghpreview]', 'Not able to find CTA element');
    return;
  }
  console.log('[ghpreview]', 'Found CTA element');
  var ghpreviewScript = document.currentScript;
  var siteId = ghpreviewScript.getAttribute('data-site');

  // strip trailing slash then split by slash
  var pathArray = window.location.pathname.replace(/\/$/, '').split('/');
  var slug = pathArray[pathArray.length - 1];

  var url = new URL(ghpreviewScript.src);
  var domainUrl = ghpreviewScript.src.replace(url.pathname, '');
  var previewEndpoint = `${domainUrl}/api/ghpreview?siteId=${siteId}&slug=${slug}`;

  console.log(previewEndpoint);
  fetch(previewEndpoint)
    .then((response) => response.json())
    .then((data) => {
      var clientSettings = data.clientSettings;
      console.log('Ghost Preview clientSettings', clientSettings);
      var bgColor = clientSettings?.bgColor || '255, 255, 255';
      var style = document.createElement('style');
      var css = `
  .ghpreview-membersonly-excerpt {
    position: relative;
  }
  
  .ghpreview-membersonly-excerpt:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 70%;
    margin-left: -50vw;
    margin-right: -50vw;
    background: linear-gradient(
      to top,
      rgba(${bgColor}, 1) 0%,
      rgba(${bgColor}, 0.9) 30%,
      rgba(${bgColor}, 0) 100%
    );
  }`;
      var head = document.head || document.getElementsByTagName('head')[0];
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);

      var div = document.createElement('div');
      div.innerHTML = data.response.html;
      div.className = 'ghpreview-membersonly-excerpt';
      if (ctaElement) {
        //delete some elements
        var { indexOfChildrenToDelete } = clientSettings;
        if (indexOfChildrenToDelete) {
          var toDelete = [];
          for (var idx of indexOfChildrenToDelete) {
            toDelete.push(ctaElement.parentNode.children[idx]);
          }
          for (var ele of toDelete) {
            ele.remove();
          }
        }
        ctaElement.insertAdjacentElement('beforebegin', div);
      }
    });
})();
