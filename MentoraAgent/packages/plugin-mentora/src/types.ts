export interface Mentor {
    id: string;
    wallet: string;
    skills: string[];
    schedule: string[];
    name: string;
    talentPassportScore: number;
}

export interface MentoraResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface IMentorService {
    getMentors(): Promise<MentoraResponse<Mentor[]>>;
}

export interface MentoraConfig {
    baseUrl: string;
}
