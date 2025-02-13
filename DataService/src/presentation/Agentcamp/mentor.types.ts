export interface Mentor {
  id: string;
  wallet: string;
  skills: string[];
  schedule: string[];
  name: string;
  talentPassportScore: number;
}

export interface IMentorRepository {
  getMentors(): Promise<Mentor[]>;
}

export interface IMentorService {
  getMentors(): Promise<Mentor[]>;
}
