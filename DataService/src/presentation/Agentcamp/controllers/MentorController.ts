import { Request, Response } from 'express';
import { NotFoundError } from '@Domain/errors/NotFoundError';
import { IMentorService } from '../mentor.types';

export class MentorController {
  constructor(private service: IMentorService) {}

  public getMentors = async (_req: Request, res: Response): Promise<void> => {
    try {
      const mentors = await this.service.getMentors();
      
      res.json({
        success: true,
        data: mentors
      });
    } catch (error) {
      console.error('Error in MentorController.getMentors:', error);

      if (error instanceof NotFoundError) {
        res.status(404).json({
          success: false,
          error: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  };
}
