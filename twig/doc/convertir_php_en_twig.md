# Convertir le code PHP suivant en Twig.

### Boucle foreach

#### PHP
```php
foreach($products as $key => $value){
  //...
}
```

#### Twig
```twig
{% for key, value in products %}
    {# ... #}
{% endfor %}
```

### Boucle foreach 2

#### PHP
```php
<?php foreach ($images as $value): 
   if ($value.active) {?>  
      <img src="<?php echo $value.url; ?>"/>
<?php } endforeach;?>
```

#### Twig
```twig
{% for value in images if value.active %}
   <img src="{{ value.url }}"/>
{% endfor %}
```

### Boucle for

#### PHP
```php
for ($i=0; $i < count($products); $i++) {

}
```

#### Twig
```twig
{% for i in 0..products|length %}
    
{% endfor %}
```

### L’opérateur de concaténation dans PHP est le point (‘ . ‘) et dans Twig c’est le tilde (‘ ~ ‘)

#### PHP
```php
echo "Nom du produit:" . $product->getName();
```

#### Twig
```twig
{{ "Nom du produit:" ~ product.name }}
```

### Concaténation et définir une variable

#### PHP
```php
$myproduct = $product->getName() . strtolower($description);
echo  $myproduct;
```

#### Twig
```twig
{% set myproduct = product.name ~ description|lower %}
{{ myproduct }}
```

### Appeler la propriété d'un objet

#### PHP
```php
echo $product["name"];
```

#### Twig
```twig
{{ product["name"] }}
{# ou #}   
{{ product.name }}
```