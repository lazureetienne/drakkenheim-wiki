---
type: index
tags:
  - drakkenheim
  - index
  - quete
aliases:
  - Quêtes de Drakkenheim
---
# 📜 Quêtes

Toutes les quêtes et objectifs suivis par le groupe. Voir aussi le [[Drakkenheim Campagne#🎯 Le plan|plan de campagne]].

## À faire / en cours
```dataview
TABLE commanditaire AS "Commanditaire", status AS "Statut"
FROM "Drakkenheim/Quetes"
WHERE type = "quete" AND status = "en cours"
SORT file.name ASC
```

## Terminées
```dataview
TABLE commanditaire AS "Commanditaire"
FROM "Drakkenheim/Quetes"
WHERE type = "quete" AND status = "terminée"
SORT file.name ASC
```

## Autres
```dataview
TABLE status AS "Statut", commanditaire AS "Commanditaire"
FROM "Drakkenheim/Quetes"
WHERE type = "quete" AND status != "en cours" AND status != "terminée"
SORT file.name ASC
```

## Notes individuelles

- [[Récupérer les 6 artefacts de la couronne]]
- [[Éliminer Oscar]]
- [[Retrouver la Reine Lenore von Kessel]]
- [[Explorer le cratère]]
- [[Investiguer la Duchesse]]
- [[Reprendre Temple Gate et Saint Virtuvio]]
- [[Allumer la grande flamme de la cathédrale]]
- [[Le vault des Von Kessel]]
- [[Déloger la Queen of Thieves]]
- [[Sécuriser l'Inscrutable Tower]]
- [[Monter un partenariat Académie - Hooded Lanterns]]
- [[Les reliques de Saint Virtuvio]]
- [[Les nains et Smithy on the Scar]]
- [[Le passage secret de King's Gate]]
- [[La Iron Banshee et le Rose Theatre]]
- [[Réparer la Clock Tower]]
- [[Ramener un successeur au trône]]
- [[Vaincre le Far Dweller]]
- [[Parler à Drexel des troupes d'Éloïse]]
- [[Obtenir le simulacrum d'Eldrich]]
