import { CommanderStatic } from 'commander';
import { AbstractCommand } from './abstract.command';

export class BranchCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command('branch')
      .alias('b')
      .description('Select branch')
      .action(async () => {
        await this.action.handle();
      });
  }
}
