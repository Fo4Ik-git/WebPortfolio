import {Injectable} from '@angular/core';

interface Command {
  command: string;
  description: string;
  arguments?: Argument[];
}

interface Argument {
  command: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  findBestMatch(partialCommand: string, availableCommands: { command: string }[]): string | null {
    if (!partialCommand || partialCommand.trim() === '') {
      return null; // If the partial command is empty, return null
    }

    const lowerPartialCommand = partialCommand.toLowerCase();

    const commandNames = availableCommands.map(commandObject => commandObject.command);
    const matches = commandNames.filter(command =>
      command.toLowerCase().startsWith(lowerPartialCommand)
    );

    if (matches.length === 0) {
      return null; // If no matches found, return null
    }

    if (matches.length === 1) {
      return matches[0]; // If only one match found, return it immediately
    }

    // If more than one match found, return the common prefix
    const commonPrefix = this.findCommonPrefix(matches);
    return commonPrefix.length > lowerPartialCommand.length ? commonPrefix : null;
  }

  findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) {
      return '';
    }

    const sortedStrings = strings.sort(); // Sort to bring similar strings together
    const first = sortedStrings[0];
    const last = sortedStrings[sortedStrings.length - 1];

    let i = 0;
    while (i < first.length && first.charAt(i) === last.charAt(i)) {
      i++;
    }

    return first.substring(0, i);
  }


}
