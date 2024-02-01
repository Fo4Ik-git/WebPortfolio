import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {

  private currentMatchIndex: number = 0;
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

  findCommandArgument(partialCommand: string,
                      argumentCommands: string,
                      availableCommands: {
                        command: string;
                        arguments?: any[]
                      }[]): string | null {
    if (!partialCommand || partialCommand.trim() === '') {
      return null; // If the partial command is empty, return null
    }

    availableCommands = availableCommands
      .filter(command => command.arguments && command.arguments.length > 0) // Оставляем только команды с аргументами
      .map(command => {

        // Check if command has arguments before filtering
        const filteredArguments = command.arguments?.filter(argument =>
          command.command.toLowerCase() === partialCommand.toLowerCase()
        ) || [];

        return {
          ...command,
          arguments: filteredArguments
        };
      })
      .filter(command => command.arguments.length > 0);


    const argumentsOnly = availableCommands
      .filter(command => command.arguments && command.arguments.length > 0) // Оставляем только команды с аргументами
      .map(command => command.arguments)
      .flat();

    const matches = argumentsOnly
      .map(argument => argument.command)
      .filter(argument =>
        argument.toLowerCase().startsWith(argumentCommands.toLowerCase())
      );

    if (matches.length === 0) {
      return null; // If no matches found, return null
    }

    // Sort matches by length and return the currently selected match
    const sortedMatches = matches.sort((a, b) => a.length - b.length);
    const selectedMatch = sortedMatches[this.currentMatchIndex];

    // Add index of selected match for next call
    this.currentMatchIndex = (this.currentMatchIndex + 1) % sortedMatches.length;

    return selectedMatch;
  }


}
