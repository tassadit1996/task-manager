## Cloner le Répertoire

Pour commencer, clonez le répertoire du projet depuis GitHub :

```bash
git clone -b task-manager https://github.com/tassadit1996/task-manager.git
cd task-manager
```
## Configuration des Variables d'Environnement

#### Côté Client 
Créez un fichier ```.env.local``` à la racine du dossier client et ajoutez-y les variables d'environnement nécessaires.

```js
NEXT_PUBLIC_API_URL=http://localhost:3001/api
API_URL=http://localhost:3001/api
```


#### Côté server 
1-Créez un fichier ```.env``` à la racine du dossier server et ajoutez-y les variables d'environnement nécessaires. 

```js
MONGO_URI="mongodb://127.0.0.1:27017/task-manager"
PORT=3001
CLIENT_URL="http://localhost:3000"
JWT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
```
## Installation des Dépendances
#### Côté client
```bash
cd client
npm install
```

#### Côté server
```bash
cd ../server
npm install
```

## Démarrer l'Application dans deux terminal
#### Côté client
```bash
cd client
npm run dev
```
L'application sera disponible sur http://localhost:3000

#### Côté server
```bash
cd server
npm start
```
Le serveur sera disponible sur http://localhost:3001



