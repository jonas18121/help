# stripe dans Symfony

Version : 9.6

- [Initialiser stripe](https://stripe.com/docs/checkout/quickstart)

- [Créer un client](https://stripe.com/docs/api/customers/create)

- [Créer un produit](https://stripe.com/docs/api/products/create)

- [Définir une taxe au type de produit](https://stripe.com/docs/api/products/create#create_product-tax_code)

- [Créer un prix](https://stripe.com/docs/api/prices/create)

- [Créer une session](https://stripe.com/docs/api/checkout/sessions)

- [Créer une facture](https://stripe.com/docs/api/invoices)


Exemple de configuration
```php
// Initialisation de stripe version 9.6
Stripe::setApiKey('sk_test_key');

// Quand on passera en production stripe ira chercher les images dans la vrai adresse
// https://www.example_domain.com
// Stripe ne peut pas récupéré les images depuis le local 'http://127.0.0.1:8000'
// Il faut que le site soit en production
$YOUR_DOMAIN = 'http://127.0.0.1:8000';

// Création du client
$stripe = new StripeClient(
    'sk_test_key'
);

// Configuration du client
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

## Exemple dans un projet symfony

Dans `add.html.twig`

- On import le script de Stripe `<script src="https://js.stripe.com/v3/"></script>` dans un block `{% block javascript %}`
- On peut utiliser soit la balise `<form>` soit la balise `<a>`,

    mais il faut absolument `id="checkout-button"` et le chemin `{{ path('app_stripe_create_session') }}` qui initialise stripe 

    et redirige vers l'api de stripe.

```twig
{# add.html.twig #}

{% extends 'base.html.twig' %}

{% block title %}Mon récapitulatif {% endblock %}

{% block javascript %}
    <script src="https://js.stripe.com/v3/"></script>
{% endblock %}

{% block content %}
    <h2>Mon récapitulatif</h2>

    <p>Vérifiez vos information avant de payer</p>

    <hr>

    <div class="row">
        <div class="col-md-6">
            <strong>Mon adresse de livraison</strong>
            <div class="form-check mt-4">
                {{ delivery|raw }}
            </div>

            <hr>

            <strong>Mon Transporteur</strong>
            <div class="form-check">
                {{ carrier.name }}<br>
                {{ carrier.description }}<br>
                {{ carrier.price|number_format(2, ',', '.') }} €
            </div>
        </div>
        <div class="col-md-6">
            <div class="text-center">
                <b>Ma commande</b><br>
            </div>

            <div class="order-summary">
            {% set total = 0 %}
                {% for key, product in cart %}
                    <div class="row {% if key > 0 %}mt-2{% endif %}">
                        <div class="col-2"><img src="/uploads/images/{{ product.product.illustration }}" alt="{{ product.product.name }}" height="75px"></div>
                        <div class="col-8 my-auto">
                            {{ product.product.name }}
                                <br>
                                <small>
                                    {{ product.product.subtitle }}
                                    <br>
                                    X {{ product.quantity }}
                                </small>
                        </div>
                        <div class="col-2 my-auto">
                            {{ ((product.product.price * product.quantity) / 100)|number_format(2, ',', '.') }}€
                        </div>
                    </div>
                    {% set total = total + (product.product.price * product.quantity) %}
                {% endfor %}
            </div>
            <hr>
            <strong>Sous-Total : </strong>{{ (total / 100)|number_format(2, ',', '.') }} € <br>
            <strong>Livraison : </strong> {{ carrier.price|number_format(2, ',', '.') }} €
            <hr>
            <strong>Sous-Total : </strong> {{ ((total / 100) + carrier.price)|number_format(2, ',', '.') }} €
            <a href="{{ path('app_stripe_create_session', { 'reference' : reference }) }}" id="checkout-button" class="btn btn-success btn-block mt-3">Payer | {{ ((total / 100) + carrier.price)|number_format(2, ',', '.') }} €</a>
            {# 
                On peut utiliser soit la balise <form> soit la balise <a> ci-dessus, 
                mais il faut absolument id="checkout-button" et le chemin {{ path('app_stripe_create_session') }} qui initialise stripe 
                et redirige vers l'api de stripe.
            
                <form action="{{ path('app_stripe_create_session', { 'reference' : reference }) }}" method="POST">
                    <button 
                        class="btn btn-success btn-block mt-3" 
                        type="submit" 
                        id="checkout-button"
                    >
                        Payer | {{ ((total / 100) + carrier.price)|number_format(2, ',', '.') }} €
                    </button>
                </form> 
            #}
        </div>
    </div>
{% endblock %}
```

Dans `base.html.twig`

- On crée le block `{% block javascript %}{% endblock %}`
```twig
{# base.html.twig #}

<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="description">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Jekyll v4.1.1">
    <title> {% block title %} La Boutique Française - 100% France {% endblock %}</title>

    {% block javascript %}{% endblock %}

    <!-- Bootstrap core CSS -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet">
</head>
<body>
<header>
    <!-- contenu ... -->
</header>

<main role="main">
    <!-- contenu ... -->
</main>
<footer class="footer-custom-footer">
     <!-- contenu ... -->
</footer>
<script src="{{ asset('assets/js/jquery-3.5.1.slim.min.js') }}"></script>
<script src="{{ asset('assets/js/bootstrap.bundle.js') }}"></script>
</body>
</html>
```

Dans `StripeController`

- `app_stripe_create_session` est utiliser par `add.html.twig` via le boutton `Payer`
- On initialise Stripe
- On fait les configurations qu'il faut
- On fait la redirection vers l'api de Stripe

```php
# StripeController.php

namespace App\Controller;

use Stripe\Stripe;
use App\Classe\Cart;
use App\Entity\Order;
use Stripe\Customer;
use Stripe\Checkout\Session;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class StripeController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }
    
    /**
     * @Route("/commande/create-session/{reference}", name="app_stripe_create_session")
     */
    public function index(Cart $cart, string $reference): Response
    {
        $user = $this->getUser();

        $order = $this->em->getRepository(Order::class)->findOneByReference($reference);

        if (!$order) {
            $this->addFlash('alert', 'Une Erreur c\'est produite');
            return $this->redirectToRoute('app_order');
        }

        // Quand on passera en production stripe ira chercher les images dans la vrai adresse
        // https://www.example_domain.com
        // Stripe ne peut pas récupéré les images depuis le local 'http://127.0.0.1:8000'
        // Il faut que le site soit en production
        if ('dev' === $_ENV['APP_ENV']) {
            $YOUR_DOMAIN = 'http://127.0.0.1:8000';
        } elseif ('staging' === $_ENV['APP_ENV']){
            $YOUR_DOMAIN = 'https://staging.example_domain.com';
        } else {
            $YOUR_DOMAIN = 'https://www.example_domain.com';
        }

        // $storage_for_subscription ira dans line_items qui est dans Session::create
        $product_for_subscription = [];

        foreach ($order->getOrderDetails()->getValues() as $key => $orderDetail) {

            // Ajout de produit
            $product_for_subscription[] = [
                'price_data' => [ // création du prix
                    'currency' => 'eur',
                    'unit_amount' => $orderDetail->getPrice(),
                    'product_data' => [ // création du produit
                        'name' => $orderDetail->getProduct(),
                        'images' => [$YOUR_DOMAIN  . '/uploads/images/' . $orderDetail->getImage()]
                    ]
                ],
                'quantity' => $orderDetail->getQuantity(),
            ];
        }

        // Ajout du Transporteur
        $product_for_subscription[] = [
            'price_data' => [ // création du prix
                'currency' => 'eur',
                'unit_amount' => $order->getCarrierPrice() * 100,
                'product_data' => [ // création du produit
                    'name' => $order->getCarrierName(),
                    // 'images' => [$YOUR_DOMAIN  . '/uploads/carrier/img.png']
                ]
            ],
            'quantity' => 1,
        ];

        // initialisation de stripe version 9.6
        Stripe::setApiKey('sk_test_51Lr0JGEIYZpSxSYQKxrBBaYuc1aEZjhoHKZiM54oUaU8IuxZmYDa5IQJCDaHn3NSjiZ2pKcyQLQK45CIXyLrg5mI00LzAh8spq');

        // creation du client
        $customer = Customer::create([
            'name' => $user->getFullname(),
            'email' => $user->getEmail(),
            // 'phone' => $delivery->getPhone(),
            'description' => 'Cette utilisateur a commandé des produits',
        ]);

        // création du produit
        // $stripe_product = Product::create([
        //     'name' => $product['product']->getName(),
        //     'tax_code' => 'txcd_99999999',
        //     'images' => [$YOUR_DOMAIN  . 'uploads/images/' . $product['product']->getIllustration()]
        // ]);

        // création du prix
        // $stripe_price =  Price::create([
        //     'unit_amount' => $orderDetails->getPrice(),
        //     'currency' => 'eur',
        //     //'recurring' => ['interval' => 'month'],
        //     'product' => $stripe_product->id,
        // ]);

        // afficher les infos qu'on veut montrer à l'user
        // création de la session
        $checkout_session = Session::create([
            // 'client_reference_id' => $customer->id,
            // 'customer' => $customer->id,
            'line_items' => [[
                $product_for_subscription
            ]],
            'mode' => 'payment',
            'payment_method_types' => ['card'],
            'success_url' => $YOUR_DOMAIN . '/commande/success/stripeSessionId={CHECKOUT_SESSION_ID}',
            'cancel_url' => $YOUR_DOMAIN . '/commande/erreur/{CHECKOUT_SESSION_ID}',
        ]);

        // header();die; fonctionne bien aussi
        // header("HTTP/1.1 303 See Other");
        // header("Location: " . $checkout_session->url);die;

        // redirection vers Stripe
        return $this->redirect($checkout_session->url, 301);
    }
}
```