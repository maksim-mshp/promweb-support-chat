'use strict';
let style = document.createElement("link");
style.rel = "stylesheet";
style.type = "text/css";
style.href = "http://localhost/style.css";
document.head.appendChild(style);

let iframe = document.createElement('iframe');
iframe.src = "http://localhost:3000/embed/" + window.location.host;
iframe.id = 'iframe';
iframe.frameBorder = '0';
iframe.scrolling = 'no';
document.body.appendChild(iframe);