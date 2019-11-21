const { execSync } = require('child_process');
const core = require('@actions/core');

/* Read some inputs from the Action configuration. */

const gitAddOptions = core.getInput('add-options');
const inputMessage = core.getInput('commit-message');
const commitEmail = core.getInput('email');
const commitName = core.getInput('name');

if (!gitAddOptions || gitAddOptions == '') {
    console.error("You must provide git add options with 'add-options'! Try '-A'.");

    process.exit(1);
} else if (!inputMessage || inputMessage == '') {
    console.error("You must provide a commit message with the input 'commit-message'!");

    process.exit(1);
} else if (!commitEmail || commitEmail == '') {
    console.error("You must provide a commit email in input 'email'!");

    process.exit(1);
} else if (!commitName || commitName == '') {
    console.error("You must provide a commit name (like a full name) in input 'name'!");

    process.exit(1);
}

try {
    execSync('git add ' + gitAddOptions);
    execSync('git config --local user.email "' + commitEmail + '"');
    execSync('git config --local user.name "' + commitName + '"');
    execSync('git commit -m "' + inputMessage + '"');
} catch {
    console.log("Cannot add and commit. This is probably fine (see log if not), continuing...");
}
