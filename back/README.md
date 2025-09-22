# Notes Rapides (Post-it virtuels)

- **Concept :** L'application web la plus classique pour débuter.
- **Données :** Tâche (id, texte).
- **Opérations CRUD :**
  - `CREATE` : Ajouter une nouvelle notes.
  - `READ` : Afficher toutes les notes.
  - `UPDATE` : Modifier une notes.
  - `DELETE` : Supprimer une notes.

## Les endpoints

GET /todo -- Pour récupérer toutes les notes
POST /todo -- Créer une notes
PATCH /todo/:id -- Modifier une notes
DELETE /todo:/id -- Supprime une notes

## Schema de données

- ID : Identifiant unique de l'élément de liste (String)
- title : Titre de l'élément de liste (String, require)
- text : Contenu textuel de l'élément de liste (String, require)
- creationDate : Quand l'élément de liste à été créée (Date, Require)
- completedDate : Quand l'élément à été marqué comme validé (Data)
