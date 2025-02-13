import { NotFoundError } from "@Domain/errors/NotFoundError";
import { IMentorRepository, IMentorService, Mentor } from "../mentor.types";

export class MentorService implements IMentorService {
  constructor(private repository: IMentorRepository) {}

  async getMentors(): Promise<Mentor[]> {
    try {
      const mentors = await this.repository.getMentors();
      
      if (!mentors || mentors.length === 0) {
        throw new NotFoundError('No se encontraron mentores');
      }

      return mentors;
    } catch (error) {
      console.error("Error in MentorService.getMentors:", {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error(`Error getting mentors: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
