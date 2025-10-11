import type { WispTask } from '../types';

/**
 * This service handles the logic for tasks assigned to the aFiREFLY Wisp.
 * Currently, it provides mock responses to simulate task execution.
 */

export async function executeTask(task: WispTask): Promise<string> {
  // Simulate network delay and work
  await new Promise(resolve => setTimeout(resolve, 1500));

  switch (task.type) {
    case 'FORMAT_FILE':
      if (task.payload.fileId) {
        return `Task complete: File ID ${task.payload.fileId} has been formatted.`;
      } else {
        return `Task failed: No file is currently active.`;
      }
    case 'CREATE_BOILERPLATE':
      return `Task complete: Boilerplate for ${task.payload.name} (${task.payload.fileType}) has been generated.`;
    default:
      return `Task failed: Unknown task type.`;
  }
}