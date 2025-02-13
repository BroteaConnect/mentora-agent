import axios from 'axios';
import { Mentor, MentoraResponse, IMentorService } from './types';

export class MentoraService implements IMentorService {
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

export const createMentoraService = (baseUrl: string): IMentorService => {
    return new MentoraService(baseUrl);
};
