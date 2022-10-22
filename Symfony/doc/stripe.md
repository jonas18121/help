# stripe dans Symfony

- [Initialiser stripe](https://stripe.com/docs/checkout/quickstart)

- [Créer un client](https://stripe.com/docs/api/customers/create)

- [Créer un produit](https://stripe.com/docs/api/products/create)

- [Définir une taxe au type de produit](https://stripe.com/docs/api/products/create#create_product-tax_code)

- [Créer un prix](https://stripe.com/docs/api/prices/create)

- [Créer une session](https://stripe.com/docs/api/checkout/sessions)

- [Créer une facture](https://stripe.com/docs/api/invoices)


Exemple de configuration
```php
// initialisation de stripe version 9.6
Stripe::setApiKey('sk_test_key');

//quand on passera en production stripe ira chercher les images dans la vrai adresse
// https:www/domain.com
$YOUR_DOMAIN = 'http://127.0.0.1:8000';

// création du client
$stripe = new StripeClient(
    'sk_test_key'
);

// configuration du client
$customer = Customer::create([
    'name' => $user->getFullname(),
    'email' => $user->getEmail(),
    'phone' => $delivery->getPhone(),
    'description' => 'Cette utilisateur a commandé des produits',
]);

// création du produit
$stripe_product = Product::create([
    'name' => $product['product']->getName(),
    'tax_code' => 'txcd_99999999',
    'images' => [$YOUR_DOMAIN  . '/uploads/images/' . $product['product']->getIllustration()]
]);

// création du prix
$stripe_price =  Price::create([
    'unit_amount' => $orderDetails->getPrice(),
    'currency' => 'eur',
    //'recurring' => ['interval' => 'month'],
    'product' => $stripe_product->id,
    ]);

// afficher les infos qu'on veut montrer à l'user
// création de la session
$checkout_session = Session::create([
    'client_reference_id' => $customer->id,
    'customer' => $customer->id,
    'line_items' => [[
        # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        'price' => $stripe_price->id,
        'quantity' => $orderDetails->getQuantity(),
    ]],
    'mode' => 'payment',
    'currency' => 'eur',
    'payment_method_types' => ['card'],
    'success_url' => $YOUR_DOMAIN . '/commande/success/stripeSessionId={CHECKOUT_SESSION_ID}',
    'cancel_url' => $YOUR_DOMAIN . '/commande/erreur/{CHECKOUT_SESSION_ID}',
]);
    
header("HTTP/1.1 303 See Other");
header("Location: " . $checkout_session->url);
```