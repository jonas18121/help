# Angular cli

## creer un nouveau projet

    > ng new mon-projet-angular --style=scss --skip-tests=true

## Installer bootstrap

pour avoir une version précise : 
    
    > npm install bootstrap@3.3.7

sinon : 
    
    > npm install bootstrap

puis mettre `"node_modules/bootstrap/dist/css/` dans angular.json 

    ex:
    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "styles.scss"
    ]


## Lancer le serveur : 
        
        > ng serve 

ou

## Lancer le serveur en continue : 
        
        ng serve --open

## Lancer le serveur avec un autre port

        ng serve --port 4300

## Lancer le serveur en continue et avec un autre port : 
        
        ng serve --open --port 4300
 ## Avec ng generate on peut l'associer avec ces argument : 

        appShell
        application
        class
        component
        directive
        enum
        guard
        interceptor
        interface
        library
        module
        pipe
        service
        serviceWorker
        webWorker


### Créer un nouveau `Component` : 
        
        > ng generate component mon-premier 
        
        ou 
        
        > ng g c mon-premier

### Créer un nouveau `Component` en pointant vers le module app.module : 
        
        > ng generate component mon-premier --module=app.module 
        
        ou 
        
        >ng g c mon-premier

### Créer une `Directive` personaliser : 
        
        > ng generate directive nom_de_directive 
        
        ou 
        
        > ng g d nom_de_directive

### Créer une `Pipe` personaliser : 
        
        > ng generate pipe nom_de_pipe ou ng g p nom_de_pipe

### Créer un `Service` personaliser : 
        
        > ng generate service nom_de_service ou ng g s nom_de_service

### Créer une `Class` personaliser : 
        
        > ng generate class nom_de_class

### Créer un `Guard` personaliser : 
        
        > ng generate guard guard/nom_de_guard ou ng g g guard/nom_de_guard

### Créer une `Interface` personaliser : 
        
        > ng generate interface nom_de_interface ou ng g i nom_de_interface

### Créer un `Enum` personaliser : 
        
        > ng generate enum nom_de_enum

### Créer un `Module` personaliser : 
        
        > ng generate module nom_de_module



## Pour compiler le projet Angular avant le déploiment qui sera dans un répèrtoire dist et pas encore une complilation finale :
        
        > ng build

## Compiler en mode prod : 
        
        > ng build --prod