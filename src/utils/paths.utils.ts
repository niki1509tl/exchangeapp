import { join } from 'path';

export function getProjectPath(...filePath: string[]) {
    return join(process.cwd(), ...filePath);
}
