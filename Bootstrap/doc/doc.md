

## Mettre deux block cote à cote en screen desktop et l'un sous autre en screen phone

```html
<div class='row'>
      <div class='col-lg-6 col-md-12 col-sm-12'> Block 1</div>
      <div class='col-lg-6 col-md-12 col-sm-12'> Block 2</div>
</div>
```

## Ecrire le nom du fichier dans le label du fichier

### Dans le twig on utilise custom-file-label et custom-file-input
```twig
<div class="col-sm-12 col-lg-6">
      <div id='form-13' class="form-group">
            {{ form_label(form.user.identityCard, null, {label_attr: {class: 'custom-file-label'}}) }}
            <br>
            {{ form_widget(form.user.identityCard, {attr: {class: 'custom-file-input'}}) }}

            <div class="form-error" id="identityCard-error">
            {{ form_errors(form.user.identityCard) }}
            </div>
      </div>
</div>
```

### Dans le Js on récupère le nom du fichier pour l'écrire dans le label
```js
// write the file's name into label of file
$('input[type="file"]').change(function(e){
      var fileName = e.target.files[0].name;
      $('.custom-file-label').html(fileName);
});
```