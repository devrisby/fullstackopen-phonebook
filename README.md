# Fullstackopen Phonebook

This project is the solution for part 3 in [fullstackopen](https://fullstackopen.com/en/part3), done in TypeScript

It also will also be updated to incorporate lessons/concepts covered in the later parts

## Notes

### Setting up the project

1. `npm init --yes`
2. `npm install --save-dev typescript @types/node @types/express @tsconfig/recommended ts-node-dev rimraf eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier husky lint-staged`
3. `npx tsc --init --rootDir src --outDir build`
4. `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "rootDir": "src",                                    /* Specify the root folder within your source files. */
    "outDir": "build",                                   /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  },
  "extends": "@tsconfig/recommended/tsconfig.json"
}

```
5. `touch src/index.ts`
6. `npx eslint --init`
7. `.eslintrc.json`:
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["standard-with-typescript","prettier"],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "rules": {
    },
    "ignorePatterns": ["*.test.js"]
}
```
8. Create `.eslintignore`:
```
  node_modules
  build
```
9. Create `.prettierrc.json`:
```json
{
  "semi": false, // Specify if you want to print semicolons at the end of statements
  "singleQuote": true, // If you want to use single quotes
  "arrowParens": "avoid" // Include parenthesis around a sole arrow function parameter
}
```

10. Create `.prettierignore`:
```
  build
```

11. `npm set-script prepare "husky install"`
12. `npm run prepare`
13. `npx husky add .husky/pre-commit "npm run lint-staged"`
14. `npm i express dotenv cross-env`
15. `package.json` scripts & lint-staged objects:

```json
"scripts": {
    "start:prod": "cross-env NODE_ENV=prod node build/index.js",
    "start": "npm run build && cross-env NODE_ENV=prod node build/index.js",
    "start:dev": "cross-env NODE_ENV=dev ts-node-dev --respawn src/index.ts",
    "build": "rimraf ./build && tsc",
    "lint": "eslint --ignore-path .eslintignore --ext .ts .",
    "format": "prettier --ignore-path .prettierignore --check 'src/**/*.ts' 'test/**/*.ts'",
    "lint-staged": "lint-staged"
  },

  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  },
```