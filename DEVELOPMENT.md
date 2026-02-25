## Develop requirements

- Install the latest `Rust`
- Install `Node.js@16+` which fully supported `Node-API`
- pnpm

## Test in local

- pnpm
- pnpm build
- pnpm test

## Release package

Ensure you have set your **NPM_TOKEN** in the `GitHub` project setting.

In `Settings -> Secrets`, add **NPM_TOKEN** into it.

When you want to release the package:

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

git push
```

GitHub actions will do the rest job for you.
