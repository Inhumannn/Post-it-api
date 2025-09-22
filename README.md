# Notes Rapides (Post-it virtuels)

- **Concept :** L'application web la plus classique pour débuter.
- **Données :** Tâche (id, title, text).
- **Opérations CRUD :**
  - _CREATE_ : Ajouter une nouvelle note.
  - _READ_ : Afficher toutes les notes.
  - _UPDATE_ : Modifier une note.
  - _DELETE_ : Supprimer une note.

## Les endpoints

- _GET_ `/todo` -- Pour récupérer toutes les note
- _POST_ `/todo` -- Créer une note
- _PATCH_ `/todo/:id` -- Modifier une note
- _DELETE_ `/todo/:id` -- Supprime une note

## Schema de données

- _ID_ : Identifiant unique de la note (String)
- _title_ : Titre de la note (String, require)
- _text_ : Contenu textuel de la note (String, require)
- _creationDate_ : Quand la note à été créée (Date, Require)
- _completedDate_ : Quand la note à été marqué comme validé (Data)
