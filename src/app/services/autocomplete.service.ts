import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  findBestMatch(partialCommand: string, availableCommands: string[]): string | null {
    if (!partialCommand || partialCommand.trim() === '') {
      return null; // If the partial command is empty, return null
    }

    const lowerPartialCommand = partialCommand.toLowerCase();

    const matches = availableCommands.filter(command =>
      command.toLowerCase().startsWith(lowerPartialCommand)
    );

    if (matches.length === 0) {
      return null; // If no matches found, return null
    }

    return matches[0];
  }
}
