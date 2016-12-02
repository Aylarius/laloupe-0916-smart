WhatiWatch
==========
Projet Symfony2 (version 2.8) et AngularJS (version 1.5) créée pour la mise en place d'un site de suivi des séries TV.

## Pré-requis

Composer ==> https://getcomposer.org/  
Symfony 2.8 ==> https://symfony.com/download

## Bundles

AppBundle  
SerieBundle  

## Procédure d'installation  
  
1. Pour cloner le projet, saisir dans le terminal :  
`git clone https://github.com/WildCodeSchool/laloupe-0916-smart.git`  
  
2. Entrer dans le dossier :  
`cd laloupe-0916-smart` 

3. Installer composer en saisissant dans le terminal :  
`composer install`  
  
4. A la fin du composer install, configurer la base de donnée  
`database_name (symfony):`  
`database_user (root):`   
`database_password (null):`
  
5. Créer votre base de données via le terminal :  
`php app/console doctrine:database:create`  
  
6. Mettre à jour votre base de données via le terminal :  
`php app/console doctrine:schema:update --force`  
  
7. Enfin mettre les droits sur le projet en saisissant dans le terminal :  
`sudo chmod -R 777 web/images/ app/cache/ app/logs/`  

8. Vous pouvez désormais afficher le site via votre localhost de cette façon :  
`localhost/laloupe-0916-smart/web/` 
