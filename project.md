# Stack Technique

- Backend : Adonisjs
    - Tunel de paiement : Lemon Squeezy
    - BDD : Postgres
- Frontend : Nuxt

# RoadMap

## Phase 1 MVP

### Auth & structure

- Inscription / connexion
- Gestion d’organisation
- 1 utilisateur = 1 organisation (au début)
- JWT / session
- Middleware de protection API

### Multi-tenant (obligatoire dès le début)

Base de données avec :

- organisations
- users
- projects
- feedbacks
- votes

### Création de projet

- Génération lien public unique
- Formulaire :
    - Titre
    - Description
    - Type (bug / feature / suggestion)
- Enregistrement anonyme possible

### Dashboard

- Liste feedback
- Filtre par statut
- Statut :
    - Ouvert
    - En cours
    - Terminé
- Compteur de votes
- Suppression / modération

### Paiement (fin de phase 1)

Intégration Lemon Squeezy :
- Plan gratuit
- Plan payant
- Webhooks
- Blocage fonctionnalités premium

## PHASE 2 — Version SaaS sérieuse

### Système de vote avancé

- 1 vote par utilisateur
- Tri par popularité
- Classement

### Commentaires

- Commentaires sur feedback
- Réponse admin
- Fil de discussion

### Roadmap publique

- Vue publique des features en cours
- “Planned / In Progress / Done”

### Notifications

- Email quand :
    - Nouveau feedback
    - Statut changé
- Résumé hebdomadaire

## PHASE 3 — Différenciation Premium

### Widget embeddable

Script à coller sur site :

```javascript
<script src="https://tonapp.com/widget.js"></script>
```

### Rôles

- Owner
- Admin
- Collaborateur
- Viewer

### SSO / OAuth

- Google
- GitHub

# PLAN DE MONÉTISATION

## Plan Gratuit

- 1 projet
- 100 feedback max
- Pas de personnalisation
- Badge “Powered by”

## Plan Starter (19€/mois)

- 3 projets
- Feedback illimité
- Roadmap publique
- Pas de badge
- Personnalisation simple

## Plan Pro (39–49€/mois)

- Projets illimités
- Analytics
- Widget
- Intégrations
- Rôles
- Priorité support

## Plan Entreprise

- Prix sur devis
- SSO
- SLA
- API avancée (Par exemple envoi de retours pour landing page)

# Comment rendre ça rentable ?

Landing page optimisée SEO

Article blog :

- “Pourquoi vos clients ne donnent pas de feedback”
- “Comment prioriser les demandes clients”

Publier sur :
- Indie Hackers
- Product Hunt
- Reddit SaaS