# Découverte de l'API Recherche d’entreprises de gouv.fr

- [Doc API Recherche d’entreprises](https://recherche-entreprises.api.gouv.fr/docs)
- [Doc API exemple recherche textuelle](https://recherche-entreprises.api.gouv.fr/docs/#tag/Recherche-textuelle/paths/~1search/get)
- [Doc API exemple recherche géographique](https://recherche-entreprises.api.gouv.fr/docs/#tag/Recherche-geographique/paths/~1near_point/get)

- [How to Create Friendly Configuration for a Bundle](https://symfony.com/doc/current/bundles/configuration.html)
- [GitHub symfony/recipes](https://github.com/symfony/recipes/tree/main)

Test de L'api dans un terminal avec cURL

```bash
curl "https://recherche-entreprises.api.gouv.fr/search?q=carrefour&page=1&per_page=1"

## OU

curl -X GET "https://recherche-entreprises.api.gouv.fr/search?q=carrefourpage=1&per_page=1" -H  "accept: application/json"
```

Cela retournera un contenu JSON qui n'est pas très lisible mais on peut installer un utilitaire nommé jq pour que le JSON soit plus lisible

```bash
# Installer jq
sudo apt  install jq

## 2 façons pour retourner le JSON en utilisant jq en complément jq
curl "https://recherche-entreprises.api.gouv.fr/search?q=carrefour&page=1&per_page=1" | jq

## OU

curl -X GET "https://recherche-entreprises.api.gouv.fr/search?q=carrefour&page=1&per_page=1" -H  "accept: application/json" | jq
```

Retourne  

```json
{
  "results": [
    {
      "siren": "510761505",
      "nom_complet": "CARREFOUR (CTIM)",
      "nom_raison_sociale": "CARREFOUR",
      "sigle": "CTIM",
      "nombre_etablissements": 1,
      "nombre_etablissements_ouverts": 1,
      "siege": {
        "activite_principale": "68.32A",
        "activite_principale_registre_metier": null,
        "annee_tranche_effectif_salarie": null,
        "adresse": "15 AVENUE DES ECOLES 06110 LE CANNET",
        "caractere_employeur": "N",
        "cedex": null,
        "code_pays_etranger": null,
        "code_postal": "06110",
        "commune": "06030",
        "complement_adresse": null,
        "coordonnees": "43.570079,7.005921",
        "date_creation": "2009-01-01",
        "date_debut_activite": "2009-01-01",
        "date_fermeture": null,
        "date_mise_a_jour": null,
        "date_mise_a_jour_insee": "2024-03-30T16:55:27",
        "departement": "06",
        "distribution_speciale": null,
        "epci": "200039915",
        "est_siege": true,
        "etat_administratif": "A",
        "geo_adresse": "15 Avenue des Ecoles 06110 Le Cannet",
        "geo_id": "06030_0515_00015",
        "indice_repetition": null,
        "latitude": "43.570079",
        "libelle_cedex": null,
        "libelle_commune": "LE CANNET",
        "libelle_commune_etranger": null,
        "libelle_pays_etranger": null,
        "libelle_voie": "DES ECOLES",
        "liste_enseignes": null,
        "liste_finess": null,
        "liste_id_bio": null,
        "liste_idcc": null,
        "liste_id_organisme_formation": null,
        "liste_rge": null,
        "liste_uai": null,
        "longitude": "7.005921",
        "nom_commercial": null,
        "numero_voie": "15",
        "region": "93",
        "siret": "51076150500013",
        "statut_diffusion_etablissement": "O",
        "tranche_effectif_salarie": "NN",
        "type_voie": "AVENUE"
      },
      "activite_principale": "68.32A",
      "categorie_entreprise": "PME",
      "caractere_employeur": null,
      "annee_categorie_entreprise": "2023",
      "date_creation": "2009-01-01",
      "date_fermeture": null,
      "date_mise_a_jour": "2025-11-16T08:34:38",
      "date_mise_a_jour_insee": "2024-03-22T14:26:06",
      "date_mise_a_jour_rne": null,
      "dirigeants": [],
      "etat_administratif": "A",
      "nature_juridique": "9900",
      "section_activite_principale": "L",
      "tranche_effectif_salarie": "NN",
      "annee_tranche_effectif_salarie": null,
      "statut_diffusion": "O",
      "matching_etablissements": [
        {
          "activite_principale": "68.32A",
          "ancien_siege": false,
          "annee_tranche_effectif_salarie": null,
          "adresse": "15 AVENUE DES ECOLES 06110 LE CANNET",
          "caractere_employeur": "N",
          "code_postal": "06110",
          "commune": "06030",
          "date_creation": "2009-01-01",
          "date_debut_activite": "2009-01-01",
          "date_fermeture": null,
          "epci": "200039915",
          "est_siege": true,
          "etat_administratif": "A",
          "geo_id": "06030_0515_00015",
          "latitude": "43.570079",
          "libelle_commune": "LE CANNET",
          "liste_enseignes": null,
          "liste_finess": null,
          "liste_id_bio": null,
          "liste_idcc": null,
          "liste_id_organisme_formation": null,
          "liste_rge": null,
          "liste_uai": null,
          "longitude": "7.005921",
          "nom_commercial": null,
          "region": "93",
          "siret": "51076150500013",
          "statut_diffusion_etablissement": "O",
          "tranche_effectif_salarie": "NN"
        }
      ],
      "finances": null,
      "complements": {
        "collectivite_territoriale": null,
        "convention_collective_renseignee": false,
        "liste_idcc": null,
        "egapro_renseignee": false,
        "est_achats_responsables": false,
        "est_alim_confiance": false,
        "est_association": false,
        "est_bio": false,
        "est_entrepreneur_individuel": false,
        "est_entrepreneur_spectacle": false,
        "est_ess": false,
        "est_finess": false,
        "est_organisme_formation": false,
        "est_qualiopi": false,
        "liste_id_organisme_formation": null,
        "est_rge": false,
        "est_service_public": false,
        "est_l100_3": false,
        "est_siae": false,
        "est_societe_mission": false,
        "est_uai": false,
        "est_patrimoine_vivant": false,
        "bilan_ges_renseigne": false,
        "identifiant_association": null,
        "statut_entrepreneur_spectacle": null,
        "type_siae": null
      }
    }
  ],
  "total_results": 10000,
  "page": 1,
  "per_page": 1,
  "total_pages": 10000
}
```

Structure de la réponse JSON :

- **results :** Tableau des entreprises trouvées

- **total_results :** Nombre total de résultats

- **page / per_page :** Pagination

- **siren :** Identifiant unique (9 chiffres)

- **siege :** Établissement principal