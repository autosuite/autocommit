import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
    /* Read some inputs from the Action configuration and validate them. */

    const gitAddOptions: string = core.getInput('add-options');
    const inputMessage: string = core.getInput('commit-message');
    const commitEmail: string = core.getInput('email');
    const commitName: string = core.getInput('name');

    if (!gitAddOptions || gitAddOptions == '') {
        core.setFailed("You must provide git add options with 'add-options'! Try '-A'.");
    } else if (!inputMessage || inputMessage == '') {
        core.setFailed("You must provide a commit message with the input 'commit-message'!");
    } else if (!commitEmail || commitEmail == '') {
        core.setFailed("You must provide a commit email in input 'email'!");
    } else if (!commitName || commitName == '') {
        core.setFailed("You must provide a commit name (like a full name) in input 'name'!");
    }

    try {
        await exec.exec(`git add ${gitAddOptions}`);
        await exec.exec(`git config --local user.email "${commitEmail}"`);
        await exec.exec(`git config --local user.name "${commitName}"`);
        await exec.exec(`git commit -m "${inputMessage}"`);
    } catch {
        core.warning("Cannot add and commit. This is probably fine (see log if not), continuing...");
    }
}

run();
