import * as inquirer from 'inquirer';

import { AbstractAction } from './abstract.action';
import {GitRunner} from "../lib/runners/git.runner";
import { join } from 'path';
import { Input} from '../commands';
import {Question, Answers} from "inquirer";
import { MESSAGES} from './../lib/ui/messages'
import {generateSelect} from "../lib/questions/questions";

export class BranchAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const runner = new GitRunner();
    const result = await runner.run('branch', true, join(process.cwd()));
    if(result){
      const branches =result.split('\n').filter(x => x.length > 0);
      await selectBranch(branches);
    }
    return Promise.resolve();
  }

}

const askForBranch = async (branches: string[]): Promise<Answers> => {
  const questions: Question[] = [
    generateSelect('branch')(MESSAGES.SELECT_BRANCH_MESSAGE)(branches),
  ];
  const prompt = inquirer.createPromptModule();
  return prompt(questions);
};

const selectBranch = async (branches: string[]): Promise<void> => {
  const answers: Answers = await askForBranch(branches);
  const selectedBranch = answers['branch'];
  if(selectedBranch.toString().startsWith('*')){
    return;
  }
  const runner = new GitRunner();
  await runner.run('checkout '+ selectedBranch, true, join(process.cwd()));
};
