WhatiWatch
==========
Projet Symfony2 (version 2.8) et AngularJS (version 1.5) créée pour la mise en place d'un site de suivi des séries TV.

## Pré-requis

Composer ==> https://getcomposer.org/  
Symfony 2.8 ==> https://symfony.com/download

## Bundles

LexikJWTAuthenticationBundle ==> https://github.com/lexik/LexikJWTAuthenticationBundle    
NelmioCORS ==> https://github.com/nelmio/NelmioCorsBundle    
AppBundle  
SerieBundle  

## Procédure d'installation  
  
1 - Pour cloner le projet, saisir dans le terminal :  
`git clone https://github.com/WildCodeSchool/laloupe-0916-smart.git`  
  
2 - Entrer dans le dossier :  
`cd laloupe-0916-smart` 

3 - Installer composer en saisissant dans le terminal :  
`composer install`  

Attention, si vous n'avez pas composer installé sur votre machine : 
``` bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"   
php -r "if (hash_file('SHA384', 'composer-setup.php') === 'aa96f26c2b67226a324c27919f1eb05f21c248b987e6195cad9690d5c1ff713d53020a02ac8c217dbf90a7eacc9d141d') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"    
php composer-setup.php     
php -r "unlink('composer-setup.php');"  
mv composer.phar /usr/local/bin/composer
```

4 - Générer la clé SSH nécessaire au bundle LexikJWTAuthenticationBundle :  
``` bash
$ mkdir -p var/jwt # For Symfony3+, no need of the -p option
$ openssl genrsa -out var/jwt/private.pem -aes256 4096
$ openssl rsa -pubout -in var/jwt/private.pem -out var/jwt/public.pem
```

5 - A la fin du composer install, configurer la base de donnée  
``` bash
database_name (symfony):  
database_user (root):   
database_password (null):
```
  
6 - Créer votre base de données via le terminal :  
`php app/console doctrine:database:create`  
  
7 - Mettre à jour votre base de données via le terminal :  
`php app/console doctrine:schema:update --force`  

8 - Ajouter les clés SSH au fichier parameters.yml.dist :  
``` yaml
jwt_private_key_path: '%kernel.root_dir%/../var/jwt/private.pem' # ssh private key path
jwt_public_key_path:  '%kernel.root_dir%/../var/jwt/public.pem'  # ssh public key path
jwt_key_pass_phrase:  ''                                         # ssh key pass phrase
jwt_token_ttl:        3600
```

9 - Enfin mettre les droits sur le projet en saisissant dans le terminal :  
`sudo chmod -R 777 app/cache/ app/logs/`  

10 - Ajouter et lier les assets (le dossier Resources/public)    
`php app/console assets:install --symlink`   

11 - Vous pouvez désormais afficher le site via votre localhost de cette façon :  
`localhost/laloupe-0916-smart/web/` 
