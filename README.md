# ut-help

Generate help files for UT implementations, by including content
from all the relevant modules.

## Setup

1. Install `ut-help` globally.
2. Add `.docusaurus` in `.gitignore`.
3. Modify package.json to call `ut-help` in the appropriate places:

    ```json
    {
        "scripts":{
            "help": "ut-help build --out-dir dist/help",
            "help:start": "ut-help start --no-open",
            "release": "ut-webpack --mode production && ut-help build --out-dir dist/help && ut-release",
        }
    }
    ```

4. Create `utHelp.js` in the root of your project:

    ```js
    module.exports = {
        resolve: require.resolve,
        include: [
            'ut-core',
            'ut-customer',
            // include other packages here
        ]
    };
    ```

5. Follow the
  [ut-microservice](https://github.com/softwaregroup-bg/ut-microservice#front-end)
  front end folder structure to include help files in each module.
