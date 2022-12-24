# Astuces

### Afficher les valeurs d'une propriété de collection

`->getValues()` permet d'afficher les valeurs d'une propriété de collection

Exemple : Afficher les valeurs de la propriété de collection `Addresses`
```php
$user->getAddresses()->getValues()
```
Retourne un tableau d'addresses
```php
array:2 [▼
  0 => App\Entity\Address {#767 ▶}
  1 => App\Entity\Address {#774 ▶}
]
```

### Rediriger un formulaire vers un autre chemin

Si on veut rediriger le formulaire vers  un autre chemin que celui ou il est, on utilise action du coté de twig.

```twig
{{ form_start(form, { 'action': path('app_order_reacp'), 'method': 'POST' }) }}
{{ form_end(form) }}
```

On peut aussi le faire directement dans la création du formulaire dans le controller en PHP

```php
$form = $this->createForm(ProjectProposalValidationType::class, $project, [
    'action' => $this->generateUrl('app_order_reacp'),
    'method' => 'POST',
]);
```

### Plusieurs façon de récupéré des données précise depuis le submit d'un form

```php
$carriers = $form['carriers']->getData();
```

```php
$carriers = $form->getData()['carriers'];
```

```php
$carriers = $form->get('carriers')->getData();
```

C'est le même retour pour les 3 codes ci-dessus
```php
App\Entity\Carrier {#1179 ▼
  -id: 1
  -name: "Colissimo"
  -description: "Votre colis est livrer en 72h"
  -price: 9.9
}
```

Si on veut afficher le name :
```php
$carrierName = $form->getData()['carriers']->getName();
```

Retourne :
```php
"Colissimo"
```

### Obtenir une variable qui est définit dans le fichier .env et l'utiliser dans un controller, Symfony 5.

Dans le fichier `.env`, on définit la variable `APP_PARAM`.
```bash
APP_PARAM=param_value_here
```

Dans le fichier `config/services.yaml`, on appel la variable `APP_PARAM` en valeur d'un paramètre `app.paramname` qui représentera `APP_PARAM`.
```yaml
parameters:
    app.paramname: '%env(APP_PARAM)%'
```

Dans le controller, on appel `app.paramname` via `$this->getParameter()`.

(S'assurer que le controller hérite de `AbstractController` pour utiliser `$this->getParameter()`)
```php
$this->getParameter('app.paramname');
```
