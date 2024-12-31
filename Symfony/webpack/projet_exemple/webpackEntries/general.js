//////// Frontend - Générique ////////

module.exports = function (Encore) {
    Encore

        .addEntry('frontend/general', [
            './public/js/general.js'
        ])

        .addEntry('frontend/bootstrapExecution', [
            './public/js/bootstrapExecution.js'
        ]) 
    ;
};