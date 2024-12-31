//////// Admin ////////

module.exports = function (Encore) {
    Encore

        .addEntry('admin/category', [
            './public/js/template/pages/admin/category.js'
        ])

        .addEntry('admin/product', [
            './public/js/template/pages/admin/product.js'
        ])
    ;
};