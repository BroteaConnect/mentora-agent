import { Router } from 'express';
import { MentorController } from '../controllers/MentorController';
import { MentorService } from '../services/MentorService';
import { MentorRepository } from '../repositories/MentorRepository';

export class MentorRoutes {
  public routes: Router;
  public name: string;

  constructor() {
    this.routes = Router();
    this.name = 'Mentor';
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const repository = new MentorRepository();
    const service = new MentorService(repository);
    const controller = new MentorController(service);

    this.routes.get('/mentors', controller.getMentors);
  }
}
