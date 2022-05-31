# ut-help

Generate help files for UT implementations

## Setup

1. Add these to `.gitignore`:

    ```ignore
    .docusaurus
    help
    ```

2. Modify package.json to include:

    ```json
    {
        "scripts":{
            "build": "other build commands && npm run help",
            "help": "ut-help build --out-dir dist/help"
        },
        "devDependencies":{
            "ut-help": "^1.0.0"
        }
    }
    ```

3. Create `docusaurus.config.js`:

    ```js
    module.exports = require('ut-help')({
        include: [
            'ut-help',
            'ut-core',
            // include other modules here
        ]
    });
    ```

4. Follow the
  [ut-microservice](https://github.com/softwaregroup-bg/ut-microservice#front-end)
  front end folder structure to include help files in each module.
