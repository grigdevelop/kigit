import {Command, CommanderStatic} from 'commander';
import {AbstractCommand} from './abstract.command';
import {Input} from "./command.input";

export class BranchCommand extends AbstractCommand {
    public load(program: CommanderStatic) {
        program
            .command('branch')
            .alias('b')
            .description('Branches')
            .option('-c, --copy [copy]', 'Copy name of selected branch.')
            .action(async (command: Command) => {

                const options: Input[] = [];
                options.push({ name: 'copy', value: command.copy });

                await this.action.handle([], options);
            });
    }
}
