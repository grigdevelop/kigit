import * as clipboardy from 'clipboardy';

import { AbstractAction } from './abstract.action';
import {GitRunner} from "../lib/runners/git.runner";
import { join } from 'path';
import { Input} from '../commands';
import {selectBranch} from "../lib/utils/git-utils";

export class BranchAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {

    let branch = await selectBranch();

    if(options.find(o => o.name === 'copy' && o.value)){

      if(branch.startsWith('*')){
        branch = branch.substr(1);
      }
      branch = branch.trim();

      await clipboardy.write(branch);
      console.log(`Branch name '${branch}' copied to clipboard`);
      return;
    }

    await switchToBranch(branch);
  }

}

const switchToBranch = async (branch: string) : Promise<void> => {
  if(branch.startsWith('*')){
    return;
  }
  const runner = new GitRunner();
  await runner.run('checkout '+ branch, true, join(process.cwd()));
};
