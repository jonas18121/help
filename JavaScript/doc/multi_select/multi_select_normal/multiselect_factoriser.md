
```js
$(function() {
    // For form update
    manageMultiSelectForFormUpdate();
    // For form create
    manageMultiSelect('.multiSelectCreated', 45, null);
});

// FUNCTIONS

function manageMultiSelectForFormUpdate() {
    let productId = $('#page-container').attr('data-product-id');
    let baseUrl = window.location.origin;
    $.ajax({
        url: baseUrl + '/backend/eshop/product/' + productId + '/zodiac',
        data: {},
        success: function(response) {
            manageMultiSelect('.multiSelectUpdated', 80, response);
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
function manageMultiSelect(elementDomId, moreHeight, response = null) {
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
            displayElementsSelectedIntoInputFromBdd(response, field, dropdown, list, option, moreHeight);
        }

        displayElementsSelectedIntoInputOnClick(field, dropdown, list, option, moreHeight);

        updateCSSForDropdownList(dropdown, list, moreHeight);

        closeDropdownList(dropdown, list);
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
function displayElementsSelectedIntoInputFromBdd(response, field, dropdown, list, option, moreHeight) {
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
function displayElementsSelectedIntoInputOnClick(field, dropdown, list, option, moreHeight) {
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
function updateCSSForDropdownList(dropdown, list, moreHeight) {
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
function closeDropdownList(dropdown, list) {
    $(document).on('click touch', function(e) {
        if (dropdown.hasClass('-open')) {
            dropdown.toggleClass('-open');
            list.removeClass('-open');
        }
    });
}
```