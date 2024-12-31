import './styles/app.css';

const $ = require('jquery');
// Positionner jQuery en variable globale reste nécessaire malgré la configuration Encore.autoProvidejQuery()
// si des appels jQuery sont réalisés en-dehors de WebPack
global.$ = global.jQuery = $;
window.$ = window.jQuery = $;

// import '@publicJS/general.js';
// import '@publicJS/bootstrapExecution.js';

