import { IMentorRepository, Mentor } from "../mentor.types";

export class MentorRepository implements IMentorRepository {
  async getMentors(): Promise<Mentor[]> {
    // Mock data
    return [
      {
        id: '1',
        wallet: '0x1234567890abcdef',
        skills: ['Solidity', 'Smart Contracts', 'DeFi'],
        schedule: ['Mon 9-17', 'Wed 9-17', 'Fri 9-17'],
        name: 'Alex Thompson',
        talentPassportScore: 95
      },
      {
        id: '2',
        wallet: '0xabcdef1234567890',
        skills: ['Web3.js', 'React', 'NFT Development'],
        schedule: ['Tue 10-18', 'Thu 10-18'],
        name: 'Sarah Chen',
        talentPassportScore: 88
      },
      {
        id: '3',
        wallet: '0x9876543210fedcba',
        skills: ['Ethereum', 'Blockchain Architecture', 'Security'],
        schedule: ['Mon 13-21', 'Wed 13-21', 'Fri 13-21'],
        name: 'Michael Rodriguez',
        talentPassportScore: 92
      }
    ];
  }
}
