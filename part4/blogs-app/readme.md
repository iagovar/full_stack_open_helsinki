## Blog app for FSO part 4

### Remember

- `npm init` for initializing nodejs projects.
- `npx eslint --init` for configuring eslint rules (`.eslintignore` can be placed to ignore folders/files).
- `npm run devBlogsPart4` for running the dev environment with nodemon.

## Testing

This testing lines provides an environment variable "test", and the option `--runInBand` forces the test to run sequentially instead of in parallel.

`"testBlogsPart4": "NODE_ENV=test jest --verbose  --runInBand"`



