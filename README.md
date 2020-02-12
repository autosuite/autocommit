# Autocommit

| Summary           | Badge                                              |
| ----------------- | -------------------------------------------------- |
| Release Stability | ![Autobadger Release Stability][release-stability] |
| Latest Release    | ![Autobadger Latest Release][latest-release]       |
| Code Quality      | [![Maintainability][quality-image]][quality-link]  |
| Code Coverage     | [![Test Coverage][coverage-image]][coverage-link]  |

[release-stability]: https://img.shields.io/static/v1?label=latest&message=0.1.0&color=purple
[latest-release]: https://img.shields.io/static/v1?label=stability&message=prerelease&color=yellow
[quality-image]: https://api.codeclimate.com/v1/badges/2a5e3b36c9c7907dc13e/maintainability
[quality-link]: https://codeclimate.com/github/autosuite/autocommit/maintainability
[coverage-image]: https://api.codeclimate.com/v1/badges/2a5e3b36c9c7907dc13e/test_coverage
[coverage-link]: https://codeclimate.com/github/autosuite/autocommit/test_coverage

## Introduction

GitHub Action that automatically adds some files and commits them in preparation of a push to a remote. This Action is designed for use with an Action such as [github-push-action](https://github.com/ad-m/github-push-action) as the following step.

## Usage

Add this to your `main.yml` file (or whatever your workflow is called).

```yaml
name: my-workflow

on: [push]

jobs:
  autocommit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
       # Do something here, pre-stage.
      - uses: autosuite/autocommit@master
        with:
          commit-message: Your custom commit message here.
          add-options: -A
      - uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

## Configuration

> You can see all configuration in the [action.yml](action.yml) file.

| Variable       | Value     | Example           | Default                       | Required? |
| -------------- | --------- | ----------------- | ----------------------------- | --------- |
| add-options    | A string. | -A                | -A                            | Yes.      |
| commit-message | A string. | Here's a message. | See [action.yml](action.yml). | Yes.      |
| email          | A string. | my@email.com      | noreply@github.com            | Yes.      |
| name           | A string. | Some Person       | GitHub Action                 | Yes.      |

## Documentation

If you would like to contribute to this project, please read our [contributors documentation](CONTRIBUTING.md) and our [code of conduct](CODE_OF_CONDUCT.md).

The license we use for this project is defined in [the license file](LICENSE).
