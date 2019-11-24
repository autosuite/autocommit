# Autocommit

![Autobadger Release Stability](https://img.shields.io/static/v1?label=stability&message=prerelease&style=flat-square&color=yellow)
![Autobadger Latest Release](https://img.shields.io/static/v1?label=latest&message=0.1.0&style=flat-square&color=purple)

[_What are these badges?_](https://github.com/teaminkling/autobadger/tree/master/BADGES.md)

## Introduction

GitHub Action that automatically adds some files and commits them in preparation of a push to a remote. This Action is designed for use with an Action such as [github-push-action](https://github.com/ad-m/github-push-action) as the step before.

## Usage

This is best added to a workflow on `push` to any branch.

```yaml
name: my-workflow

on: [push]

jobs:
  autocommit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: teaminkling/skip-commit@master
        with:
          commit-filter: skip-log, skip-ci, automated
       # Do something here, pre-stage.
      - uses: teaminkling/autocommit@master
        with:
          commit-message: Your custom commit message here.
          add-options: -A
      - uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Documentation

If you would like to contribute to this project, please read our [contributors documentation](CONTRIBUTING.md) and our [code of conduct](CODE_OF_CONDUCT.md).

The license we use for this project is defined in [the license file](LICENSE).

Thanks!
