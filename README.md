# Monitoring et diagnostic de nœuds IoT — Industrie 4.0

Application web de supervision à distance de nœuds **ESP32** et **Raspberry Pi**. Elle permet la consultation des mesures matérielles et réseau, la détection d'anomalies, la prévision à court terme et le suivi des alertes.

## Technologies

- **Frontend :** React, Vite, JavaScript
- **Backend :** Node.js, Express, MySQL
- **Analyse :** Python, Flask, scikit-learn (Isolation Forest et régression linéaire)
- **IoT :** ESP32 (Arduino) et Raspberry Pi (agent Python)

## Structure du projet

| Dossier ou fichier | Utilité |
| --- | --- |
| `front_end/` | Interface React / Vite |
| `back_end/` | API Node.js, service d'analyse Python et agent Raspberry Pi |
| `arduinoIDE/` | Firmware ESP32 |
| `data_base/` | Scripts SQL |
| `diagnostic/` | Outils de diagnostic à distance |
| `flash_esp32.bat` | Compilation et téléversement ESP32 |
| `start.bat` | Démarrage des services en local sous Windows |

## Installation locale

Prérequis : Node.js, npm, Python et MySQL. Pour l'ESP32 : Arduino CLI avec le cœur ESP32 et les bibliothèques nécessaires.

1. Créer `back_end/.env` à partir de `back_end/.env.example`. Renseigner les valeurs privées (`DB_*` et un `JWT_SECRET` fort). **Ne jamais publier ce fichier.**
2. Préparer la base MySQL en utilisant les scripts de `data_base/` et, si nécessaire, leurs migrations.
3. Installer les dépendances backend :
   ```powershell
   cd back_end
   npm install
   py -m pip install flask mysql-connector-python pandas scikit-learn python-dotenv
   ```
4. Installer les dépendances frontend :
   ```powershell
   cd ../front_end
   npm install
   ```
5. Depuis la racine du dépôt, exécuter `start.bat` pour lancer **Node.js**, le **service IA Python** et **Vite** dans trois terminaux.

L'interface Vite s'ouvre normalement sur `http://localhost:5173`. L'API utilise par défaut `http://localhost:3000`. Les appels frontend existants ciblent des services locaux.

### Création du compte administrateur

Si nécessaire, définir `ADMIN_USERNAME` et `ADMIN_PASSWORD` dans `back_end/.env`, puis exécuter :

```powershell
cd back_end
node seed_admin.js
```

Le script refuse désormais de créer un compte à partir d'identifiants admin codés en dur. Choisir un mot de passe fort.

### Flash ESP32

Le flash **n'est pas automatique** au lancement des services. Utiliser `flash_esp32.bat` séparément, en sélectionnant le port série détecté. Pour une nouvelle carte, configurer ensuite le point d'accès `ESP32-SETUP` via `http://192.168.4.1`.

## Sécurité

- Les dépendances `node_modules` et les secrets `.env` sont exclus du suivi Git via `.gitignore`.
- Les identifiants et secrets déjà publiés dans l'historique Git doivent être **renouvelés** ; les retirer d'un commit récent ne suffit pas à les rendre secrets.
- Le projet est conçu pour une utilisation locale de démonstration ; revoir la sécurité et la configuration des URLs avant un déploiement public.
