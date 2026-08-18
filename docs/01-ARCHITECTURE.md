# EDUNOVA
# Architecture Technique

Version : 1.0

---

# 1. Objectif

Cette documentation définit l'architecture officielle du projet Edunova.

Son objectif est de garantir :

- une structure claire
- un code maintenable
- une architecture évolutive
- une expérience développeur cohérente

Chaque nouvelle fonctionnalité devra respecter cette architecture.

---

# 2. Architecture Générale

Edunova est composé de plusieurs applications indépendantes partageant une base technique commune.

```
EDUNOVA

Website
│
Company Console
│
School Platform
│
Parent Portal
│
Applications Mobiles
```

Chaque application possède sa propre logique métier tout en réutilisant les composants communs.

---

# 3. Technologies

Frontend

- Next.js (App Router)
- React
- TypeScript

UI

- Tailwind CSS
- shadcn/ui
- Lucide Icons

Architecture

- Feature Driven
- Component Based
- Clean Architecture

---

# 4. Structure du projet

```
src/

app/

components/
    ui/
    shared/
    marketing/
    company/
    school/
    parent/

features/

services/

providers/

config/

lib/

types/
```

---

# 5. Responsabilité des dossiers

## app

Contient uniquement les routes Next.js.

Aucune logique métier importante.

---

## components

Tous les composants React.

Ils sont organisés par domaine.

---

### ui

Composants shadcn.

Ne jamais modifier directement leur logique sans raison.

---

### shared

Composants réutilisables dans toute la plateforme.

Exemples :

- Container
- Logo
- Section
- PageHeading

---

### marketing

Composants du site public.

---

### company

Composants réservés à la console d'administration.

---

### school

Composants utilisés par les établissements.

---

### parent

Composants du portail parent.

---

## features

Chaque fonctionnalité métier importante sera développée ici.

Exemple :

```
attendance

students

payments

messaging

grades

ai
```

---

## services

Toute communication externe.

Exemple :

API

Supabase

IA

Authentification

Paiement

Storage

---

## providers

Tous les Context Providers.

Exemple :

Theme

Session

React Query

---

## config

Configuration globale.

Exemple :

Navigation

Site

SEO

Metadata

---

## lib

Code partagé.

constants

utils

hooks

data

---

## types

Tous les types TypeScript globaux.

---

# 6. Principes d'architecture

Chaque dossier possède une responsabilité unique.

Chaque composant possède une responsabilité unique.

Chaque service possède une responsabilité unique.

---

# 7. Dépendances

Le flux doit toujours respecter :

```
Page

↓

Component

↓

Service

↓

API
```

Jamais l'inverse.

---

# 8. Réutilisation

Avant de créer un composant :

Toujours vérifier s'il existe déjà.

Objectif :

Limiter les duplications.

---

# 9. Évolutivité

L'architecture doit permettre :

- plusieurs développeurs
- plusieurs établissements
- plusieurs milliers d'utilisateurs
- plusieurs langues
- plusieurs applications

sans réécriture majeure.

---

# 10. Philosophie

Nous privilégions toujours :

la simplicité

la lisibilité

la performance

la sécurité

la qualité

avant la rapidité de développement.

---

# Conclusion

Cette architecture constitue la référence officielle du projet Edunova.

Toute évolution devra respecter ces principes afin de garantir la stabilité, la qualité et la pérennité de la plateforme.