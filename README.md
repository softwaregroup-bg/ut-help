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
            "help": "ut-help build --out-dir help"
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
