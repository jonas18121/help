import toastr from '../../../../../../vendor/plugins/toastr/toastr.min.js';

// Select adresses
$(function () {
    // select id of first userId on document ready
    let userId = $('#input_id_create_users').val();
    loadAddresses(userId, '#input_id_create_invoiceAddresses');
    loadAddresses(userId, '#input_id_create_shippingAddresses');

    // Address
    $('select#input_id_create_users').on('change', function () {
        loadAddresses(this.value, '#input_id_create_invoiceAddresses');
        loadAddresses(this.value, '#input_id_create_shippingAddresses');
    });
});  

// Increment and Decrement the quantity
$(function () {
    // Increment the quantity
    $(document).on('click', '#more', function (e) {
        incrementQuantity($(this));
    });

    // Decrement the quantity
    $(document).on('click', '#less', function (e) {
        decrementQuantity($(this));
    });
}); 

// Select and display a product into card
$(function () {
    // select id of product on document ready
    selectProductId();

    // select id on order_create_products change
    $(document).on('change', '#input_id_create_products', function (e) {
        selectProductId();
    });

    /* On click display a product into card */
    $(document).on('click', '.btn-product-select', function (e) {
        e.preventDefault();
        displayProductIntoCard($(this));
    });
});

// Select the corresponding option in the select field
$(function () {
    selectOptionInSelectFieldFromUrl('userId', '#input_id_create_users');
    selectOptionInSelectFieldFromUrl('productId', '#input_id_create_products');
});  

// Others

function selectOptionInSelectFieldFromUrl(paramUrl, idOfSelect) {   
    // Get ID from URL
    let urlParams = new URLSearchParams(window.location.search);
    let getParamUrl = urlParams.get(paramUrl);
    
    // Select the corresponding option in the select field
    if (getParamUrl !== null) {
        $(idOfSelect).val(getParamUrl);
    }
}

// Addresses - Load
function loadAddresses(userId, elementDomId) {

    $(elementDomId).empty();

    if (userId !== 'undefined' && userId !== undefined && userId !== 0 && userId !== '') {
        $.ajax({
            type: 'GET',
            url: baseUrl + 'order/tools/users/' + userId + '/addresses',
            success: function (response) {
                if (response.result == "success") {
                    $(elementDomId).append($('<option>', {value: '', text: 'Sélectionnez une adresse'}));
                    $.each(response.data.addresses, function (key, value) {
                        $(elementDomId).append($('<option>', {value: value.id, html: value.fullAddress.replace('<br />', ' : ')}));
                    });
                } else {
                    toastr.error('Une erreur a été rencontrée' + ' : ' + response.data);
                }
            },
            error: function (xhr, textStatus, error) {
                toastr.error('Une erreur a été rencontrée' + ' : ' + xhr.statusText + '.');
            },
            complete: function (data) {
                // Nothing
            }
        });
    } else {
        $(elementDomId).append($('<option>', {value: '', text: 'Sélectionnez une adresse'}));
    }
}

// search product id into html for cards
function searchProductIdIntoAllCards() {
    let html = $('.product-select').html();
    let regex = /data-product-id="(\d+)"/g;
    let productIds = [];

    let match;
    while ((match = regex.exec(html)) !== null) {
        productIds.push(parseInt(match[1]));
    }

    return productIds;
}

function incrementQuantity(element) {
    let elementContainer = element.closest('.bloc');
    let quantityElement = elementContainer.find('.product-quantity input#quantity');
    let quantity = parseInt(quantityElement.val());
    let maxVal = quantityElement.attr('max');
    let minVal = quantityElement.attr('min');

    if (maxVal > quantity) {
        quantity++;
    }
    
    if (maxVal <= quantity) {
        elementContainer.find('.product-quantity span#more').hide();
    }
    
    if (minVal < quantity) {
        elementContainer.find('.product-quantity span#less').show()
    } 
    
    quantityElement.text(quantity);
    elementContainer.find('input[name$="[quantity]"]').val(parseInt(quantity));
}

function decrementQuantity(element) {
    let elementContainer = element.closest('.bloc');
    let quantityElement = elementContainer.find('.product-quantity input#quantity');
    let quantity = parseInt(quantityElement.val());
    let maxVal = quantityElement.attr('max');
    let minVal = quantityElement.attr('min');

    if (minVal < quantity) {
        quantity--;
    } 
    if(minVal >= quantity)  {
        elementContainer.find('.product-quantity span#less').hide();
    }
    if (maxVal > quantity) {
        elementContainer.find('.product-quantity span#more').show();
    }

    quantityElement.text(quantity);
    elementContainer.find('input[name$="[quantity]"]').val(quantity);
}

function displayProductIntoCard(element) {
    let idProduct = element.attr('data-product-id');

    let productIds = searchProductIdIntoAllCards();

    // check if idProduct is in array productIds
    let index = $.inArray(idProduct.toString(), productIds.map(String));

    if (index >= 0) {
        toastr.error('Vous avez déjà ajouté ce produit à la commande.');
    } else {
        // Getting template
        $.ajax({
            type: 'GET',
            url: baseUrl + 'order/tools/product/' + idProduct + '/add',
            data: {},
            success: function (response) {
                if (response.result == "success") {
                    let responseHtml = hideQuantitySign(response.data, 'max', 1, 'more');
                    responseHtml = hideQuantitySign(responseHtml, 'min', 1, 'less');
                    
                    // Add HTML in nearest container bloc
                    element.siblings('.product-select').append(responseHtml);
                } else {
                    toastr.error('Ce produit est en rupture de stock.');
                }
            },
            error: function (xhr, textStatus, error) {
                toastr.error('Une erreur a été rencontrée' + ' : ' + xhr.statusText + '.');
            },
            complete: function (data) {
                // Nothing
            }
        });
    }
}

function selectProductId() {
    let idProduct = $('#input_id_create_products').val();
    $('#product-select').attr('data-product-id', idProduct);
}

// hide Quantity Sign into methode success of ajax
function hideQuantitySign(responseHtml, attribute, limit, id) {
    let update = null;
    let objectResponse = $(responseHtml);
    if (objectResponse.find('input#quantity').attr(attribute) <= limit) {
        update = objectResponse.find('.product-quantity span#' + id).attr('style', 'display: none;');
        let regex = new RegExp('<span id="' + id + '">.*?<\/span>', 'gs');
        return responseHtml.replace(regex, update.prop('outerHTML'));
    }

    return responseHtml;
}