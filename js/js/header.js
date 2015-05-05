var link = document.querySelector('link[rel="import"]');
var content = link.import;

// Grab DOM from nav html's document.
var el = content.querySelector('nav');

document.body.appendChild(el.cloneNode(true));