```
└── 📁app
    └── 📁src
        └── 📁components
            └── 📁footer
                ├── footer.module.css
                ├── footer.tsx
            └── 📁header
                ├── header.module.css
                ├── header.tsx
            └── 📁modal
                ├── modal.module.css
                ├── modal.tsx
        └── 📁contexts
        └── 📁features
            └── 📁game
                └── 📁components
                    └── 📁cell
                        ├── cell.module.css
                        ├── cell.tsx
                    └── 📁counter
                        ├── counter.module.css
                        ├── index.tsx
                    └── 📁gameHeader
                        ├── gameHeader.module.css
                        ├── gameHeader.tsx
                    └── 📁grid
                        ├── grid.module.css
                        ├── grid.tsx
                    └── 📁levelSelector
                        ├── levelSelector.module.css
                        ├── levelSelector.tsx
                    └── 📁timer
                        ├── timer.module.css
                        ├── timer.tsx
                └── 📁constants
                    ├── config.ts
                └── 📁contexts
                    ├── gameContext.tsx
                └── 📁hooks
                    ├── useGame.tsx
                    ├── useTimer.tsx
                └── 📁types
                    ├── index.ts
                └── 📁utils
                    ├── index.ts
                ├── controller.ts
                ├── index.module.css
                ├── index.tsx
        └── 📁types
            ├── index.ts
    ├── favicon.ico
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```

## Architecture du jeu:

### gameContext.ts:

Fournit des fonctions et données propres au jeu:

- Nombre de lignes/colonnes.
- Nombre de mines.
- Plateau de jeu (grille avec disposition des mines et des chiffres).
- Statut du jeu (succès/échec).
- Définition du niveau.
- Chronomètre.

### controller.ts

Définit et gère les actions/règles du jeu, ses données ne sont appelées/fournies que par le hook useGame.
Fonctions exportées:

- fillGrid: Retourne un tableau de données représeantant le plateau de jeu, les mines, et les chiffres.
- getOpenedCells: après clic sur une cellule, calcule les cellules à ouvrir, puis retourne un plateau de jeu mis à jour et le statut du jeu.
- placeFlag: Après clic droit sur une cellule, renvoie une grille de jeu à jour avec la disposition des drapeaux.
- setMinesValues: Calcule les chiffres autour des mines et renvoie une grille de jeu à jour.

### useGame.ts

Orchestrateur du déroulement du jeu, fournit des données et des fonctions aux composants du jeu.
Appelle les fonctions du controller.
Fonctions exportées:

- openCell: Définit la liste des tâches à l'ouverture d'une cellule par le joueur => Mise à jour de la grille (getOpenedCells) puis du statut de jeu.
- toggleFlag: Définit la liste des tâches à au placement d'un drapeau sur une cellule puis renvoie une grille mise à jour.
- selectLevel: Définit la liste des tâches après la sélection d'un niveau par le joueur.

### useTimer.ts

Modifie la valeur du timer et le renvoie au contexte.
