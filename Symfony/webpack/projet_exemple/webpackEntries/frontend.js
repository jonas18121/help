//////// Frontend ////////

module.exports = function (Encore) {
    Encore

        .addEntry('frontend/accueil', [
            './public/js/template/pages/accueil/accueil.js'
        ])
    ;
};