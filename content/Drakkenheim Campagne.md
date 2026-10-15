---
type: index
tags:
  - drakkenheim
  - index
aliases:
  - Campagne Drakkenheim
  - Drakkenheim (campagne)
date_maj: 2026-06-22
---
# 🎲 Campagne Drakkenheim

> [!info] À propos
> Notes de **joueur** pour la campagne *Dungeons & Dragons* située à **Drakkenheim**.
> Groupe : **[[Les Hazebreakers]]**.
> Dernière séance consignée : **22/06/2026**.
> Notes brutes d'origine (import OneNote) : [[OneNote Imports/DnD - Royaume/Drakkenheim/Drakkenheim|Journal brut (OneNote)]].

> [!warning] Conventions
> Ce dossier réorganise le journal brut en notes catégorisées et reliées entre elles.
> Les faits proviennent **uniquement** du journal d'origine ; les rares points encore flous sont signalés par un callout.
> **Dates** : format `JJ/MM` → **2025** pour les séances de mars à décembre, puis **2026** (années réelles ; la campagne a commencé en 2025). Les mois « in-game » ne sont pas vraiment comptés.
> **Joueurs vs personnages** : le journal nomme parfois le **joueur** à la place de son personnage — « Alex » → **[[Kanye]]** (Kanye de l'Ouest) · « Xav » → **[[Salazar]]** · « Félix » → **[[Gardakonne]]** (Garda Von Konne, ♀) · « Laze » → **[[Olum]]** (Olum Arzum) · « Marin » → **[[Mike]]** (Mike Rizzowski) ; MJ : **[[Chris]]** (voir [[Personnages (Drakkenheim)]]).
> **Fiches de joueurs** : les personnes de la table (MJ et joueurs) ont leur fiche dans **[[Joueurs]]**, sous le dossier [[Méta|Méta]] → `Méta/Joueurs/` ; celles de [[Chris]], [[Xav]], [[Étienne (Laze)|Étienne « Laze »]] et [[Marin]] servent aussi à une autre campagne.
> **À ne pas confondre** : la reine **[[Lenore von Kessel]]** ≠ la **[[The Queen of Thieves|Queen of Thieves]]** (cheffe des [[Les Queensmen|Queensmen]]) ≠ **[[La Duchesse]]** (entité monstrueuse des égouts).

---

## 🗂️ Catégories

| Catégorie | Index | Contenu |
|---|---|---|
| 🧑 Personnages | [[Personnages (Drakkenheim)]] | PNJ, factions alliées/ennemies, membres du groupe |
| 🎲 Joueurs | [[Personnages (Drakkenheim)]] | Joueurs de la table (méta) |
| 📜 Quêtes | [[Quetes]] | Objectifs actifs, secondaires, terminés |
| 🎁 Objets | [[Objets]] | Objets magiques, artéfacts, trésors |
| 📖 Séances | [[Seances]] | Résumés séance par séance |
| 🗺️ Lieux | [[Lieux]] | Villes, donjons, quartiers de Drakkenheim |
| ⚔️ Factions | [[Factions]] | Silver Order, Hooded Lanterns, Académie, etc. |
| 📕 Règles | [[Contamination (règle)]] · [[Edicts of Lumen]] · [[Sending (sort)]] | Mécaniques et doctrine |

---

## 🧭 Où en est la campagne ?

- Le groupe se fait appeler les **Hazebreakers** ; il travaille principalement avec les **[[Hooded Lanterns]]** et l'**[[Amethyst Academy]]**.
- **[[Lenore von Kessel]]** (la reine) a été **capturée** à Queen's Park Garden et remise aux Hooded Lanterns (avril 2026).
- La **[[Inscrutable Tower]]** a été explorée ; **Oscar Yorin** y a été vaincu. L'Académie veut sécuriser la tour.
- La **cathédrale de Saint Virtuvio** a été prise puis **abandonnée** par le Silver Order au profit de Temple Gate ; le **Falling Fire** monte en puissance (anges invoqués).
- Nouveau fil : **[[Ryan Graymere]]** (la *Iron Banshee*) au **Rose Theatre** veut l'accès à la tour et un vrai changement à l'Académie.
- Objectif en cours : obtenir le **simulacrum** d'**[[Eldrich Runeweaver]]** au **[[Kleinberg Estate]]** (22/06/2026).

---

## 🎯 Le plan (note de stratégie)

> **Donner les objets à la [[The Queen of Thieves|Queen of Thieves]]** pour acheter du temps (retirer ses doppelgängers). Faire croire aux Hooded Lanterns qu'on a utilisé les objets *fireball* contre elle. **Unir les factions contre la Queen of Thieves.** On ne travaille plus pour elle : on veut la déloger et placer les Hooded Lanterns à la tête de l'extraction de délirium.
>
> En échange de la promesse d'un flux constant de délirium, on convainc l'**Académie** de rejoindre le groupe. Une fois la Queen hors jeu, on peut céder son territoire aux **nains** et récupérer notre **[[Stewart's Seal|seal]]**.

---

## 📊 Tableaux de bord

### Personnages
```dataview
TABLE faction AS "Faction", status AS "Statut"
FROM "Drakkenheim/Personnages (Drakkenheim)"
WHERE type = "personnage" AND status != "mineur"
SORT file.name ASC
```

### Quêtes en cours
```dataview
TABLE commanditaire AS "Commanditaire", status AS "Statut"
FROM "Drakkenheim/Quetes"
WHERE type = "quete" AND status = "en cours"
SORT file.name ASC
```

### Dernières séances
```dataview
TABLE date AS "Date", resume AS "Résumé"
FROM "Drakkenheim/Seances"
WHERE type = "seance"
SORT date DESC
LIMIT 8
```

---

## 🗺️ Carte & références

- Carte des relations : ![[Drakkenheim image d45893570e40b2dd.png]]
- Table de **contamination** : voir [[Contamination (règle)]].

---
*Hub de la campagne — mettre à jour `date_maj` à chaque nouvelle séance.*
