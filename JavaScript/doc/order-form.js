"use strict";

import toastr from '../../../../../../public/assets/shared_all/plugins/toastr/toastr.min.js';
import '../../translations.js'
import  '../../../../../../lib/bundle/public/assets/backend/js/translations.js';
import Translator from '../../../../../../vendor/willdurand/js-translation-bundle/Resources/public/js/translator.min.js';

// Select adresses
$(function () {
    // Select address on change select#order_create_users
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

// Select, display a product into card and delete card
$(function () {
    // select id of product on document ready
    selectProductId('#input_id_create_products');

    // select id on input_id_create_products change
    $(document).on('change', '#input_id_create_products', function (e) {
        selectProductId('#input_id_create_products');
    });

    /* On click display a product into card */
    $(document).on('click', '.btn-product-select', function (e) {
        e.preventDefault();
        displayProductIntoCard($(this));
    });

    /* On click delete a product card */
    $(document).on('click', '.btn-product-delete', function () {
        deleteProductCard($(this));
    });
});

// Select the corresponding option in the select field
$(function () {
    selectOptionInSelectFieldFromUrl('userId', '#input_id_create_users');
    selectOptionInSelectFieldFromUrl('productId', '#input_id_create_products');
}); 

// For each change in input input_id_create_shippingModes, display the delivery price into input price
$(function () {
    // display the delivery price into input price on document ready
    calculTotalPrice('div.bloc', 'span.priceHT', 'input#quantity', 'input#input_id_create_priceHT');
    calculTotalPrice('div.bloc', 'span.priceTTC', 'input#quantity', 'input#input_id_create_priceTTC');

    $(document).on('change', '#input_id_create_shippingModes', function (e) {
        calculTotalPrice('div.bloc', 'span.priceHT', 'input#quantity', 'input#input_id_create_priceHT');
        calculTotalPrice('div.bloc', 'span.priceTTC', 'input#quantity', 'input#input_id_create_priceTTC');
    });
}); 

// Hide Or Show Elements and Enlarge or reduce the fields #paymentModes and shippingModes, when clicking on #createUser
$(function () {
    let isWide = false;
    $(document).on('click', '#createUser', function () {
        hideOrShowElements(isWide, "#formCreateUser", "#selectUser");
    });
}); 

// Others

/**
 * Hide Or Show Elements 
 * 
 * @param {boolean} isWide 
 * @param {string} showElement - Give in CSS display: none;
 * @param {string} hideElement
 * 
 * @returns {void} 
 */
function hideOrShowElements(isWide, showElement, hideElement) {
    $(showElement).toggle();
    $(hideElement).toggle();

    if ($(showElement).is(':visible') && $(hideElement).is(':hidden') ) {
        isWide = false; 
    }
    else {
        isWide = true;
    }

    enlargeOrReduceFields(isWide, ['#paymentModes', '#shippingModes'], 'col-lg-6 col-md-6', 'col-lg-4 col-md-4');
}

/**
 * Enlarge or reduce the fields #paymentModes and shippingModes, 
 * 
 * @param {boolean} isWide 
 * @param {string[]} elements
 * @param {string} class1 
 * @param {string} class2 
 * 
 * @returns {void} 
 */
function enlargeOrReduceFields(isWide, elements, class1, class2) {
    if (isWide) {
        for (let index = 0; index < elements.length; index++) {
            $(elements[index]).removeClass(class1).addClass(class2);
        }
    } else {
        for (let index = 0; index < elements.length; index++) {
            $(elements[index]).removeClass(class2).addClass(class1);
        }
    }
}

/**
 * Select the corresponding option in the select field from Url
 * 
 * @param {string} paramUrl 
 * @param {string} elementDomId 
 * 
 * @returns {void} 
 */
function selectOptionInSelectFieldFromUrl(paramUrl, elementDomId) {   
    let urlParams = new URLSearchParams(window.location.search);
    let getValueParamUrl = urlParams.get(paramUrl);
    
    if (getValueParamUrl !== null) {
        $(elementDomId).val(getValueParamUrl);

        if (paramUrl === 'productId') {
            selectProductId('#input_id_create_products option:selected');
            displayProductIntoCard($('.btn-product-select'));
        }

        if (paramUrl === 'userId') {
            let userId = $('#input_id_create_users option:selected').val();
            loadAddresses(userId, '#input_id_create_invoiceAddresses');
            loadAddresses(userId, '#input_id_create_shippingAddresses');
        }
    }
}

/**
 * @param {string} userId 
 * @param {string} elementDomId 
 * 
 *  @returns {void} 
 */
function loadAddresses(userId, elementDomId) {

    $(elementDomId).empty();

    if (userId !== 'undefined' && userId !== undefined && userId !== 0 && userId !== '') {
        $.ajax({
            type: 'GET',
            url: baseUrl + 'order/tools/users/' + userId + '/addresses',
            success: function (response) {
                if (response.result == "success") {
                    $(elementDomId).append($('<option>', {value: '', text: Translator.trans('backend.js.order.create.select_address_option_default', {}, 'javascript')}));
                    $.each(response.data.addresses, function (key, value) {
                        $(elementDomId).append($('<option>', {value: value.id, html: value.fullAddress.replace('<br />', ' : ')}));
                    });
                } else {
                    toastr.error(Translator.trans(' js.error_occured', {}, 'javascript') + ' : ' + response.data);
                }
            },
            error: function (xhr, textStatus, error) {
                toastr.error(Translator.trans(' js.error_occured', {}, 'javascript') + ' : ' + xhr.statusText + '.');
            },
            complete: function (data) {
                // Nothing
            }
        });
    } else {
        $.ajax({
            type: 'GET',
            url: baseUrl + 'order/tools/users/addresses',
            success: function (response) {
                if (response.result == "success") {
                    $(elementDomId).append($('<option>', {value: '', text: Translator.trans('backend.js.order.create.select_address_option_default', {}, 'javascript')}));
                    $.each(response.data.addresses, function (key, value) {
                        $(elementDomId).append($('<option>', {value: value.id, html: value.fullAddress.replace('<br />', ' : ')}));
                    });
                } else {
                    toastr.error(Translator.trans(' js.error_occured', {}, 'javascript') + ' : ' + response.data);
                }
            },
            error: function (xhr, textStatus, error) {
                toastr.error(Translator.trans(' js.error_occured', {}, 'javascript') + ' : ' + xhr.statusText + '.');
            },
            complete: function (data) {
                // Nothing
            }
        });
    }
}

/**
 * search product id into html for cards
 * 
 * @returns {number[]} productIds
 */
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

/**
 * @param {Object} elementDomId 
 * 
 * @returns {void} 
 */
function incrementQuantity(elementDomId) {
    let elementContainer = elementDomId.closest('.bloc');
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

    calculTotalPrice('div.bloc', 'span.priceHT', 'input#quantity', 'input#input_id_create_priceHT');
    calculTotalPrice('div.bloc', 'span.priceTTC', 'input#quantity', 'input#input_id_create_priceTTC');
}

/**
 * @param {Object} elementDomId 
 * 
 * @returns {void} 
 */
function decrementQuantity(elementDomId) {
    let elementContainer = elementDomId.closest('.bloc');
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

    calculTotalPrice('div.bloc', 'span.priceHT', 'input#quantity', 'input#input_id_create_priceHT');
    calculTotalPrice('div.bloc', 'span.priceTTC', 'input#quantity', 'input#input_id_create_priceTTC');
}

/** 
 * @param {Object} elementDomId 
 * 
 * @returns {void} 
 */
function displayProductIntoCard(elementDomId) {
    let idProduct = elementDomId.attr('data-product-id');

    let productIds = searchProductIdIntoAllCards();

    // check if idProduct is in array productIds
    let index = $.inArray(idProduct.toString(), productIds.map(String));

    if (index >= 0) {
        toastr.error(Translator.trans('backend.js.order.create.error_occured.product_already_selected', {}, 'javascript'));
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
                    elementDomId.siblings('.product-select').append(responseHtml);

                    calculTotalPrice('div.bloc', 'span.priceHT', 'input#quantity', 'input#input_id_create_priceHT');
                    calculTotalPrice('div.bloc', 'span.priceTTC', 'input#quantity', 'input#input_id_create_priceTTC');
                } else {
                    toastr.error(Translator.trans('backend.js.order.create.error_occured.product_out_of_stock', {}, 'javascript'));
                }
            },
            error: function (xhr, textStatus, error) {
                toastr.error(Translator.trans('backend.js.order.create.select_address_option_default', {}, 'javascript') + ' : ' + xhr.statusText + '.');
            },
            complete: function (data) {
                // Nothing
            }
        });
    }
}

/**
 * @param {String} elementDomId 
 * 
 * @returns {void} 
 */
function selectProductId(elementDomId) {
    let idProduct = $(elementDomId).val();
    $('#product-select').attr('data-product-id', idProduct);
}

/**
 * hide Quantity Sign into methode success of ajax
 * 
 * @param {string} responseHtml 
 * @param {string} attribute 
 * @param {number} limit 
 * @param {string} id 
 * 
 * @returns {string} responseHtml 
 */
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

/**
 * Look for the price and the quantity in each block to calculate and display them
 * 
 * @param {string} elementDomId 
 * @param {string} fieldPrice 
 * @param {string} fieldQuantity 
 * @param {string} displayPrice 
 * 
 * @returns {void} 
 */
function calculTotalPrice(elementDomId, fieldPrice, fieldQuantity, displayPrice) {
    const TVArate = 1.2; // TVA = +20%
    let total = 0;
    $(elementDomId).each(function() {
        let price = parseFloat($(this).find(fieldPrice).text());
        let quantity = parseInt($(this).find(fieldQuantity).val());
        let subtotal = price * quantity;
        total += subtotal;
    });

    if (displayPrice === 'input#input_id_create_priceTTC') {
        total += parseFloat($('#input_id_create_shippingModes').val());
    }

    if (displayPrice === 'input#input_id_create_priceHT') {
        total += parseFloat($('#input_id_create_shippingModes').val() / TVArate);
    }

    $(displayPrice).val(total.toFixed(2));
}

/**
 * @param {Object} elementDomId 
 * 
 * @returns {void}
 */
function deleteProductCard(elementDomId) {
    if (window.confirm(Translator.trans(' js.page.bloc.delete.question', {}, 'javascript'))) {
        elementDomId.closest('.bloc').remove();
        calculTotalPrice('div.bloc', 'span.priceHT', 'input#quantity', 'input#input_id_create_priceHT');
        calculTotalPrice('div.bloc', 'span.priceTTC', 'input#quantity', 'input#input_id_create_priceTTC');
        // Show warning
        showWarningEditedPage();
    }
}

/**
 * @returns {void}
 */
function hideWarningEditedPage() {
    $('#message-warning-edited-page').hide();
}

/**
 * @returns {void}
 */
function showWarningEditedPage() {
    $('#message-warning-edited-page').show();
}

//////////// exemple de code symfony pour rendre un template en json

    /**
     * @Route("/backend/order/tools/product/{id}/add", name="backend_order_tools_product_add")
     */
    // public function toolsOrderAddProduct(
    //     Product $product
    // ): JsonResponse {
    //     if ($product->getStock() > 0) {
    //         $viewParameters = [];
    //         $viewParameters['product'] = $product;
    //         $viewParameters['quantity'] = 1;

    //         return new JsonResponse(['result' => 'success', 'data' => $this->render('Backend/Pages/Order/Bloc/product.item.select.html.twig', $viewParameters)->getContent()]);
    //     }

    //     return new JsonResponse(['result' => 'error', 'data' => 'Ce produit est en rupture de stock.']);
    // }
