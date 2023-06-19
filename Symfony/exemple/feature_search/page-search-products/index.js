import '../../../sass/templates/page-search-products/page-search-products.scss';

$(function () {
    optionSelected(); // On document ready
    sortSearch(); // On change
});  

/**
 * Select the corresponding option in the <select>
 * 
 * @returns {void}
 */
function optionSelected() {
     // Retrieve parameters from URL
    let urlParams = new URLSearchParams(window.location.search);
    let selectedValue = urlParams.get('s');

    if (selectedValue) {
        $('select#search-sort').val(selectedValue);
    }
}

/**
 * Rebuilds the url according to the selected option
 * 
 * @returns {void}
 */
function sortSearch() {
    $('select#search-sort').change(function(e){
        let optionSelected = $("select#search-sort option:selected");
        let url = window.location.href.split('&');
        let selectedValue = optionSelected.val();
        let newUrl = url[0] + '&s=' + selectedValue;

        window.location.href = newUrl;
    });
}