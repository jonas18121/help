

```js
let isInvalid = false;
  // const cardNumberInput = document.getElementById('page_product_update_category');
  // const cardForm = document.getElementById('page_product_update');

  // const errorDiv = document.getElementById('invalid-category');


  // categoryId = cardNumberInput.value;
  // categoryName = cardNumberInput.options[cardNumberInput.selectedIndex].text;

  // isInvalid = categoryName.split(' ').some(function(word){return word === 'supprimé'});


  // console.log(errorDiv);
  // console.log(cardNumberInput.selectedIndex);


  
  
  
  
  
  // console.log(categoryName);
  
    // get form
    const cardForm = $('#page_product_update');
  
    // event on submit
    cardForm.on('submit', e => {

        // get the selected category
        const categorySelected = $('#page_product_update_category option:selected');

        // get div tag for error 
        const errorDiv = $('#invalid-category');
        
        let categoryId = categorySelected.val();
        let categoryName = categorySelected.text();

        // search the word supprimé in the text
        isInvalid = categoryName.split(' ').some(function(word){return word === 'supprimé'});

        if (isInvalid == true) {
            e.preventDefault(); // stop submit
            
            errorDiv.html('<p class="mt-2 mb-0">Cette Categorie a été supprimé. Veuillez choisir une autre catégorie.</p>');
            errorDiv.css("color", "red");

            // back to top
            $('html,body').animate({scrollTop: 0}, 'slow');
        }
    })
```