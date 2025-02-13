import axios from 'axios';

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

export interface IMentoraService {
    getMentors(): Promise<MentoraResponse<Mentor[]>>;
}

export class MentoraService implements IMentoraService {
    constructor(private baseUrl: string) {}

    async getMentors(): Promise<MentoraResponse<Mentor[]>> {
        try {
            const response = await axios.get<MentoraResponse<Mentor[]>>(`${this.baseUrl}/mentors`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    success: false,
                    error: error.response?.data?.error || error.message
                };
            }
            return {
                success: false,
                error: 'Unknown error occurred'
            };
        }
    }
}

export const createMentoraService = (baseUrl: string): IMentoraService => {
    return new MentoraService(baseUrl);
};
