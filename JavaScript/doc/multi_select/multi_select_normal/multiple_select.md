# Multiple select

## HTML
```html
<div class="multiSelect">
  <select multiple class="multiSelect_field" data-placeholder="Add Browsers">
    <option value="chrome">Chrome</option>
    <option value="firefox">Firefox</option>
    <option value="opera">Opera</option>
    <option value="safari">Safari</option>
    <option value="edge">Edge</option>
    <option value="vivaldi">Vivaldi</option>
  </select>
</div>



<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="iconX">
    <g stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </g>
  </symbol>
</svg>
```

## JQuery
```js
"use strict";

jQuery(function() {
  jQuery('.multiSelect').each(function(e) {
    var self = jQuery(this);
    var field = self.find('.multiSelect_field');
    var fieldOption = field.find('option');
    var placeholder = field.attr('data-placeholder');

    field.hide().after(`<div class="multiSelect_dropdown"></div>
                        <span class="multiSelect_placeholder">` + placeholder + `</span>
                        <ul class="multiSelect_list"></ul>
                        <span class="multiSelect_arrow"></span>`);
    
    fieldOption.each(function(e) {
      jQuery('.multiSelect_list').append(`<li class="multiSelect_option" data-value="`+jQuery(this).val()+`">
                                            <a class="multiSelect_text">`+jQuery(this).text()+`</a>
                                          </li>`);
    });
    
    var dropdown = self.find('.multiSelect_dropdown');
    var list = self.find('.multiSelect_list');
    var option = self.find('.multiSelect_option');
    var optionText = self.find('.multiSelect_text');
    
    dropdown.attr('data-multiple', 'true');
    list.css('top', dropdown.height() + 5);
    
    option.click(function(e) {
      var self = jQuery(this);
			e.stopPropagation();
	    self.addClass('-selected');
	    field.find('option:contains(' + self.children().text() + ')').prop('selected', true);
      dropdown.append(function(e) {
        return jQuery('<span class="multiSelect_choice">'+ self.children().text() +'<svg class="multiSelect_deselect -iconX"><use href="#iconX"></use></svg></span>').click(function(e) {
          var self = jQuery(this);
          e.stopPropagation();
          self.remove();
          list.find('.multiSelect_option:contains(' + self.text() + ')').removeClass('-selected');
          list.css('top', dropdown.height() + 5).find('.multiSelect_noselections').remove();
          field.find('option:contains(' + self.text() + ')').prop('selected', false);
          if (dropdown.children(':visible').length === 0) {
            dropdown.removeClass('-hasValue');
          }
        });
      }).addClass('-hasValue');
	    list.css('top', dropdown.height() + 5);
	    if (!option.not('.-selected').length) {
	      list.append('<h5 class="multiSelect_noselections">No Selections</h5>');
	    }
    });
    
    dropdown.click(function(e) {
      e.stopPropagation();
      e.preventDefault();
      dropdown.toggleClass('-open');
      list.toggleClass('-open').scrollTop(0).css('top', dropdown.height() + 5);
    });
    
    jQuery(document).on('click touch', function(e) {
        if (dropdown.hasClass('-open')) {
            dropdown.toggleClass('-open');
            list.removeClass('-open');
        }
    });
  });
});
```

## CSS
```css

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
