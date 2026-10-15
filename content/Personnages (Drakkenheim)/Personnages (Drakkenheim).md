---
type: index
tags:
  - drakkenheim
  - index
  - personnage
aliases:
  - Personnages de Drakkenheim
---
# 🧑 Personnages

Index de tous les personnages (PJ et PNJ) de la campagne. Voir aussi les [[Factions]].

> [!tip] Légende
> `faction` = allégeance connue · `status` = vivant / mort / inconnu / mineur.
> `joueur` = joueur de la table qui incarne le PJ ; `type: joueur` = **fiche de joueur** (méta, pas un personnage).

## 🛡️ Le groupe — [[Les Hazebreakers]]

```dataview
TABLE role AS "Rôle", joueur AS "Joueur"
FROM "Drakkenheim/Personnages (Drakkenheim)"
WHERE type = "personnage" AND classe = "PJ"
SORT file.name ASC
```

## 🎲 Joueurs (méta)

Les **joueurs** de la table — leurs fiches sont regroupées dans `Méta/Joueurs/` (voir **[[Joueurs]]**) : une seule fiche par personne, même si elle joue ailleurs. Le journal d'origine emploie parfois leur nom à la place de celui de leur personnage.

```dataview
TABLE drakkenheim_role AS "Rôle", drakkenheim_personnage AS "Personnage joué"
FROM "Méta/Joueurs"
WHERE type = "joueur" AND drakkenheim_role
SORT file.name ASC
```

- [[Chris]] — **MJ**
- [[Alex]] — joue [[Kanye]] (Kanye de l'Ouest)
- [[Xav]] — joue [[Salazar]]
- [[Félix]] — joue [[Gardakonne]] (Garda Von Konne)
- [[Étienne (Laze)|Laze]] — joue [[Olum]] (Olum Arzum)
- [[Marin]] — joue [[Mike]] (Mike Rizzowski)

> [!info] Une seule fiche par personne
> Les fiches de joueurs vivent dans **[[Joueurs]]** (`Méta/Joueurs/`), pas dans ce dossier : chaque personne n'a qu'une fiche, même si elle joue à plusieurs tables ([[Chris]], [[Xav]], [[Étienne (Laze)|Laze]] et [[Marin]]).

## 🧑 PNJ

```dataview
TABLE faction AS "Faction", status AS "Statut"
FROM "Drakkenheim/Personnages (Drakkenheim)"
WHERE type = "personnage" AND (classe = "PNJ" OR !classe)
SORT faction ASC, file.name ASC
```

## Notes individuelles — PJ

- [[Les Hazebreakers]]
- [[Mike]] (joueur : [[Marin]])
- [[Salazar]] (joueur : [[Xav]])
- [[Gardakonne]] (joueur : [[Félix]])
- [[Olum]] (joueur : [[Étienne (Laze)|Laze]])
- [[Kanye]] (joueur : [[Alex]])
