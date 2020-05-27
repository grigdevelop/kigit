import * as inquirer from 'inquirer';

import {GitRunner} from "../runners/git.runner";
import {join} from "path";
import {Answers, Question} from "inquirer";
import {generateSelect} from "../questions/questions";
import {MESSAGES} from "../ui";

async function getGitBranches() {
    const runner = new GitRunner();
    try{
        const result = await runner.run('branch', true, join(process.cwd()));
        if(!result){
            throw new Error('No branches found');
        }

        const branches = result.split('\n').filter(x => x.length > 0);
        if(branches.length > 1){
            const currentIndex = branches.findIndex(b => b.startsWith('*'));
            if(currentIndex > 0){
                const temp = branches[0];
                branches[0] = branches[currentIndex];
                branches[currentIndex] = temp;
            }
        }
        return branches;

    }catch (e) {
        throw e;
    }
}

export async function askForBranch(): Promise<Answers>{
    const branches = await getGitBranches();
    const questions: Question[] = [
        generateSelect('branch')(MESSAGES.SELECT_BRANCH_MESSAGE)(branches),
    ];
    const prompt = inquirer.createPromptModule();
    return prompt(questions);
}

export async function selectBranch(): Promise<string> {
    const answers: Answers = await askForBranch();
    return answers['branch'];
}
