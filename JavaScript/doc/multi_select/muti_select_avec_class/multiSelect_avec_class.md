# Multiple select avec class MultiSelectFunction 

## TWIG
```twig
{# Updated #}
<div class="col-lg-6 col-md-12 mb-3 multiSelectUpdated">
    {{ form_label(form.selectProduct, null, {label_attr: {class: 'form-label'}}) }}
    {{ form_widget(form.selectProduct, {attr: {class: 'form-control form-control-sm multiSelect_field'}}) }}
    <div class="form-error">
        {{ form_errors(form.selectProduct) }}
    </div>
</div>

{# Created #}
<div class="col-lg-6 col-md-12 mb-3 multiSelectCreated">
    {{ form_label(form.selectProduct, null, {label_attr: {class: 'form-label'}}) }}
    {{ form_widget(form.selectProduct, {attr: {class: 'form-control form-control-sm multiSelect_field'}}) }}
    <div class="form-error">
        {{ form_errors(form.selectProduct) }}
    </div>
</div>
```

#### backend/CategoryController.php
```php
// backend/CategoryController.php

/**
 * @Route("/backend/category/{id}/product", requirements={"id"="\d+"}, name="backend_category_product")
 */
public function toolsGetOptionCategory(
    Category $category,
    CategoryRepository $categoryRepository
): JsonResponse {
    $data = [];
    $category = $categoryRepository->findOneBy(['product' => $product->getId()]);

    if (null !== $category) {
        foreach ($category->getProducts() as $key => $value) {
            $data[] = [
                'id' => $value->getId(),
                'name' => $value->getName(),
            ];
        }
    }

    return new JsonResponse(['result' => 'success', 'data' => ['elements' => $data]]);
}
```

## Javascript

#### webpack.config.js

```js
  // webpack.config.js

 .addEntry('backend/product/multiple-select', [
    './public/assets/backend/js/Pages/page-product/product.js',
    './public/assets/backend/sass/select/multiple-select.scss'
  ])
```

#### Class MultiSelectFunction
```js
// multi-select-function.js

export class MultiSelectFunction {

    /**
     * Manage multiple selection with ajax
     * 
     * @param {string} urlComplement
     * 
     * @returns {void}
     */
    manageMultiSelectWithAjax(urlComplement) {
        const multiSelectFunction = this;
        let baseUrl = window.location.origin;
        $.ajax({
            url: baseUrl + urlComplement,
            data: {},
            success: function(response) {
                multiSelectFunction.manageMultiSelect('.multiSelectUpdated', 80, response);
            },
            error: function (xhr, textStatus, error) {
                'Error : ' + xhr.statusText + '.';
            },
            complete: function (data) {
                // Nothing
            }
        });
    }
    
    /**
     * Manage multiple selection
     * 
     * @param {string} elementDomId
     * @param {int} moreHeight
     * @param {object} response
     * 
     * @returns {void}
     */
    manageMultiSelect(elementDomId, moreHeight, response = null) {
        const multiSelectFunction = this;
        $(elementDomId).each(function(e) {
            let self = $(this);
            let field = self.find('.multiSelect_field');
            let fieldOption = field.find('option'); // search all they tag option
            let placeholder = field.attr('data-placeholder');
    
            // Prepare for show options list into multiSelect_dropdown
            field.hide().after(`<div class="multiSelect_dropdown"></div>
            <ul class="multiSelect_list"></ul>`);
    
            // Show options into the popup multiSelect_dropdown
            fieldOption.each(function(e) {
              $('.multiSelect_list').append(
                `<li class="multiSelect_option" data-value="`+$(this).val()+`">
                    <a class="multiSelect_text">`+$(this).text()+`</a>
                  </li>`
              );
            });
    
            // Keep definition of variables always after above code
            let dropdown = self.find('.multiSelect_dropdown');
            let list = self.find('.multiSelect_list');
            let option = self.find('.multiSelect_option');
            let optionText = self.find('.multiSelect_text');
                    
            dropdown.attr('data-multiple', 'true');
            list.css('top', dropdown.height() + moreHeight);
    
            if('' !== response && [] !== response && null !== response && undefined !== response) {
                multiSelectFunction.displayElementsSelectedIntoInputFromBdd(response, field, dropdown, list, option, moreHeight);
            }

            multiSelectFunction.displayElementsSelectedIntoInputOnClick(field, dropdown, list, option, moreHeight);
            multiSelectFunction.updateCSSForDropdownList(dropdown, list, moreHeight);
            multiSelectFunction.closeDropdownList(dropdown, list);
        });
    }
    
    /**
     * Displays the elements in the multi select input, if it exists in the product database
     * 
     * @param {object|null} response
     * @param {object} field
     * @param {object} dropdown
     * @param {object} list
     * @param {object} option
     * @param {int} moreHeight
     * 
     * @returns {void}
     */
    displayElementsSelectedIntoInputFromBdd(response, field, dropdown, list, option, moreHeight) {
        if ('' !== response.data.elements && [] !== response.data.elements && undefined !== response.data.elements) {
            response.data.elements.forEach(element => {
                $('.multiSelect_option').each(function() {
                    if ($(this).attr('data-value') == element.id) {
                        let self = $(this);
                        self.addClass('-selected');
                        field.find('option:contains(' + element.name + ')').prop('selected', true);
                        dropdown.append(function(e) {
                            return $('<span class="multiSelect_choice">'+ element.name +'<div class="multiSelect_deselect -iconX"><i class="fas fa-times"></i></div></span>').click(function(e) {
                                let self = $(this);
                                e.stopPropagation();
                                self.remove();
                                list.find('.multiSelect_option:contains(' + element.name + ')').removeClass('-selected');
                                list.css('top', dropdown.height() + moreHeight).find('.multiSelect_noselections').remove();
                                field.find('option:contains(' + element.name + ')').prop('selected', false);
                                if (dropdown.children(':visible').length === 0) {
                                    dropdown.removeClass('-hasValue');
                                }
                            });
                        }).addClass('-hasValue');
                        
                        list.css('top', dropdown.height() + moreHeight);
                        if (!option.not('.-selected').length) {
                            list.append('<h5 class="multiSelect_noselections">No Selections</h5>');
                        }
                    }
                });
            });
        }
    }
    
    /**
     * Displays the elements in the multi select input on click
     * 
     * @param {object} field
     * @param {object} dropdown
     * @param {object} list
     * @param {object} option
     * @param {int} moreHeight
     * 
     * @returns {void}
     */
    displayElementsSelectedIntoInputOnClick(field, dropdown, list, option, moreHeight) {
        option.click(function(e) {
            let self = $(this);
            e.stopPropagation();
            self.addClass('-selected');
            field.find('option:contains(' + self.children().text() + ')').prop('selected', true);
    
            dropdown.append(function(e) {
              return $('<span class="multiSelect_choice">'+ self.children().text() +'<div class="multiSelect_deselect -iconX"><i class="fas fa-times"></i></div></span>').click(function(e) {
                  let self = $(this);
                  e.stopPropagation();
                  self.remove();
                  list.find('.multiSelect_option:contains(' + self.text() + ')').removeClass('-selected');
                  list.css('top', dropdown.height() + moreHeight).find('.multiSelect_noselections').remove();
                  field.find('option:contains(' + self.text() + ')').prop('selected', false);
                  if (dropdown.children(':visible').length === 0) {
                      dropdown.removeClass('-hasValue');
                  }
              });
          }).addClass('-hasValue');
              list.css('top', dropdown.height() + moreHeight);
              if (!option.not('.-selected').length) {
                  list.append('<h5 class="multiSelect_noselections">No Selections</h5>');
              }
        });
    }
    
    /**
     * Add or remove CSS classes, resetting the scroll position of the drop-down list and positioning the list item relative to the drop-down item.
     * 
     * @param {object} dropdown
     * @param {object} list
     * @param {int} moreHeight
     * 
     * @returns {void}
     */
    updateCSSForDropdownList(dropdown, list, moreHeight) {
        dropdown.click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            dropdown.toggleClass('-open');
            list.toggleClass('-open').scrollTop(0).css('top', dropdown.height() + moreHeight);
        });
    }
    
    /**
     * Close dropdown list on click or touch
     * 
     * @param {object} dropdown
     * @param {object} list
     * 
     * @returns {void}
     */
    closeDropdownList(dropdown, list) {
        $(document).on('click touch', function(e) {
            if (dropdown.hasClass('-open')) {
                dropdown.toggleClass('-open');
                list.removeClass('-open');
            }
        });
    }
}
```

#### Fichier product.js
```js
// product.js

import { MultiSelectFunction } from '../../select/multiple-select-function';

// Multi Select
$(function() {
    const multiSelectFunction = new MultiSelectFunction();

    // For form update
    let productId = $('#page-container').attr('data-product-id');
    multiSelectFunction.manageMultiSelectWithAjax('/backend/category/' + productId + '/product');

    // For form create
    multiSelectFunction.manageMultiSelect('.multiSelectCreated', 45, null);
});
```

## CSS fichier multiple-select.scss
```css
/* multiple-select.scss */

body {
    font-family: 'Quicksand', sans-serif;
    font-weight: 450;
    min-height: 100vh;
    color: #ADAFB6;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    transition: all .2s ease;
}

.multiSelect {
    width: 300px;
    position: relative;
}

.multiSelect *, .multiSelect *::before, .multiSelect *::after {
    box-sizing: border-box;
}

.multiSelect_dropdown {
    font-size: 14px;
    min-height: 35px;
    line-height: 35px;
    border-radius: 4px;
    box-shadow: none;
    outline: none;
    background-color: #fff;
    color: #444f5b;
    border: 1px solid #d9dbde;
    font-weight: 400;
    padding: 0.5px 13px;
    margin: 0;
    transition: .1s border-color ease-in-out;  
    cursor: pointer;
}

.multiSelect_dropdown.-hasValue {
    padding: 5px 30px 5px 5px;
    cursor: default;
}

.multiSelect_dropdown.-open {
    box-shadow: none;
    outline: none;
    padding: 4.5px 29.5px 4.5px 4.5px;
    border: 1.5px solid #4073FF;
}

.multiSelect_arrow::before,
.multiSelect_arrow::after {
    content: '';
    position: absolute;
    display: block;
    width: 2px;
    height: 8px;
    border-radius: 20px;
    border-bottom: 8px solid #99A3BA;
    top: 40%;
    transition: all .15s ease;
}

.multiSelect_arrow::before {
    right: 18px;
    -webkit-transform: rotate(-50deg);
    transform: rotate(-50deg);
}

.multiSelect_arrow::after {
    right: 13px;
    -webkit-transform: rotate(50deg);
    transform: rotate(50deg);
}

.multiSelect_list {
    margin: 0;
    margin-bottom: 25px;
    padding: 0;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    max-height: calc(10 * 31px);
    top: 28px;
    left: 0;
    z-index: 9999;
    right: 0;
    background: #fff;
    border-radius: 4px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    transition: opacity 0.1s ease, visibility 0.1s ease, -webkit-transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32);
    transition: opacity 0.1s ease, visibility 0.1s ease, transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32);
    transition: opacity 0.1s ease, visibility 0.1s ease, transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32), -webkit-transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32);
    -webkit-transform: scale(0.8) translate(0, 4px);
    transform: scale(0.8) translate(0, 4px);
    border: 1px solid #d9dbde;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
}

.multiSelect_option {
    margin: 0;
    padding: 0;
    opacity: 0;
    -webkit-transform: translate(6px, 0);
    transform: translate(6px, 0);
    transition: all .15s ease;
}

.multiSelect_option.-selected {
    display: none;
}

.multiSelect_option:hover .multiSelect_text {
    color: #fff;
    background: #4d84fe;
}

.multiSelect_text {
    cursor: pointer;
    display: block;
    padding: 5px 13px;
    color: #525c67;
    font-size: 14px;
    text-decoration: none;
    outline: none;
    position: relative;
    transition: all .15s ease;
}

.multiSelect_list.-open {
    opacity: 1;
    visibility: visible;
    -webkit-transform: scale(1) translate(0, 12px);
    transform: scale(1) translate(0, 12px);
    transition: opacity 0.15s ease, visibility 0.15s ease, -webkit-transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32);
    transition: opacity 0.15s ease, visibility 0.15s ease, transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32);
    transition: opacity 0.15s ease, visibility 0.15s ease, transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32), -webkit-transform 0.15s cubic-bezier(0.4, 0.6, 0.5, 1.32);
}

.multiSelect_list.-open + .multiSelect_arrow::before {
    -webkit-transform: rotate(-130deg);
    transform: rotate(-130deg);
}

.multiSelect_list.-open + .multiSelect_arrow::after {
    -webkit-transform: rotate(130deg);
    transform: rotate(130deg);
}

.multiSelect_list.-open .multiSelect_option {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

.multiSelect_list.-open .multiSelect_option:nth-child(1) {
  transition-delay: 10ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(2) {
  transition-delay: 20ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(3) {
  transition-delay: 30ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(4) {
  transition-delay: 40ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(5) {
  transition-delay: 50ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(6) {
  transition-delay: 60ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(7) {
  transition-delay: 70ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(8) {
  transition-delay: 80ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(9) {
  transition-delay: 90ms;
}

.multiSelect_list.-open .multiSelect_option:nth-child(10) {
  transition-delay: 100ms;
}

.multiSelect_choice {
    background: rgba(77, 132, 254, 0.1);
    color: #444f5b;
    padding: 4px 8px;
    line-height: 17px;
    margin: 5px;
    display: inline-block;
    font-size: 13px;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 500;
}

.multiSelect_deselect {
    width: 12px;
    height: 12px;
    display: inline-block;
    stroke: #b2bac3;
    stroke-width: 4px;
    margin-top: -1px;
    margin-left: 2px;
    vertical-align: middle;
}

.multiSelect_choice:hover .multiSelect_deselect {
    stroke: #a1a8b1;
}

.multiSelect_noselections {
    text-align: center;
    padding: 7px;
    color: #b2bac3;
    font-weight: 450;
    margin: 0;
}

.multiSelect_placeholder {
    position: absolute;
    left: 20px;
    font-size: 14px;
    top: 8px;
    padding: 0 4px;
    background-color: #fff;
    color: #b8bcbf;
    pointer-events: none;
    transition: all .1s ease;
}

.multiSelect_dropdown.-open + .multiSelect_placeholder,
.multiSelect_dropdown.-open.-hasValue + .multiSelect_placeholder {
    top: -11px;
    left: 17px;
    color: #4073FF;
    font-size: 13px;
}

.multiSelect_dropdown.-hasValue + .multiSelect_placeholder {
    top: -11px;
    left: 17px;
    color: #6e7277;
    font-size: 13px;
}
```
