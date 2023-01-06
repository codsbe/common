# Common frontend library of components and modules
This library is for common reusable code, which you can use in both(web&mobile) platforms

## How to use it
Download package from npm:
#### `npm i @codsbe/common`

Import modules you need in your code:
#### `import { makeFormData } from '@codsbe/common/lib/utils';`

## Development guide
### For developers
Note that we have a clear hierarchy in repo and if you have a 'developer' role - you can
not merge directly, you have to create merge request and `assign it to one of maintainers!!`.

Before you start, don't forget to switch the directory you want to work in.
Then run 'npm i' in this directory.

If you are creating a new module/function/component etc., do not forget to make export in index.ts of
its folder:
#### `export * from './useSearchParams';`

If you need to create new module, do not forget to add index.ts with exports.

#### `!!! Do not change config files if you don't have clear explanation why you want to do it. In case you have, please contact any maintainer, otherwise it would be rejected. !!!`

### For maintainers
It is required to change version before publish:
#### go to package folder and run `npm version [<newversion> | major | minor | patch ]`
*For more information about versioning visit https://docs.npmjs.com/cli/v7/commands/npm-version*

The next step is just publish new version:
#### `npm publish`
IMPORTANT!! Don't forget to push&merge into git repo to keep it up-to-date.
