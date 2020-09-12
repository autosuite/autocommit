import * as core from '@actions/core';
import * as exec from '@actions/exec';

// noinspection FunctionWithMoreThanThreeNegationsJS
/**
 * Validate that the given inputs are non-negative and set failed with reason if they are.
 *
 * Note that while these are marked required, this doesn't mean GitHub will check for empty strings.
 *
 * @param gitAddOptions The parameter for `gitAddOptions`.
 * @param inputMessage The parameter for `inputMessage`.
 * @param commitEmail The parameter for `commitEmail`.
 * @param commitName The parameter for `commitName`.
 */
async function validateInputs(gitAddOptions: string, inputMessage: string, commitEmail: string, commitName: string) {
    if (!gitAddOptions) {
        core.setFailed("You must provide git add options with 'add-options'! Try '-A'.");
    }

    if (!inputMessage) {
        core.setFailed("You must provide a commit message with the input 'commit-message'!");
    }

    if (!commitEmail) {
        core.setFailed("You must provide a commit email in input 'email'!");
    }

    if (!commitName) {
        core.setFailed("You must provide a commit name (like a full name) in input 'name'!");
    }
}

async function runAction() {
    /* Read some inputs from the Action configuration and validate them. */

    const gitAddOptions: string = core.getInput('add-options');
    const inputMessage: string = core.getInput('commit-message');
    const commitEmail: string = core.getInput('email');
    const commitName: string = core.getInput('name');

    /* Required might be set in the YAML but we need to check for empty too. */

    await validateInputs(gitAddOptions, inputMessage, commitEmail, commitName);

    try {
        await exec.exec(`git add ${gitAddOptions}`);
        await exec.exec(`git config --local user.email "${commitEmail}"`);
        await exec.exec(`git config --local user.name "${commitName}"`);
        await exec.exec(`git commit -m "${inputMessage}"`);
    } catch {
        core.warning("Cannot add and commit. This is probably fine (see log if not), continuing...");
    }
}

const actionRunner = runAction();

/* Handle promises. */

actionRunner.then(() => {});
