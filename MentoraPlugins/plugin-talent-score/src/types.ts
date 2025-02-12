export interface PassportSocial {
    id: number;
    source: string;
    profile_name: string;
    profile_url: string;
    profile_bio?: string;
    profile_image_url?: string;
    follower_count?: number;
    following_count?: number;
    disconnected: boolean;
    created_at: string;
    updated_at: string;
}

export interface PassportProfile {
    id: number;
    display_name: string;
    bio?: string;
    location?: string;
    image_url?: string;
    tags: string[];
    data_sources: string[];
    created_at: string;
    updated_at: string;
}

export interface PassportUser {
    id: number;
    name: string;
    email: string;
    admin: boolean;
    profile_picture_url?: string;
}

export interface Passport {
    id: number;
    passport_id: string;
    main_wallet: string;
    verified_wallets: string[];
    score: number;
    activity_score: number;
    identity_score: number;
    skills_score: number;
    human_checkmark: boolean;
    verified: boolean;
    pending_kyc: boolean;
    onchain: boolean;
    nominations_received_count: number;
    last_calculated_at: string;
    socials_calculated_at: string;
    created_at: string;
    updated_at: string;
    passport_profile: PassportProfile;
    passport_socials: PassportSocial[];
    user: PassportUser;
}

export interface PassportResponse {
    passport: Passport;
}

export interface FormattedPassportInfo {
    scores: {
        total: number;
        activity: number;
        identity: number;
        skills: number;
    };
    profile: {
        name: string;
        bio?: string;
        location?: string;
        interests: string[];
        imageUrl?: string;
        dataSources: string[];
    };
    verification: {
        isHuman: boolean;
        isVerified: boolean;
        verifiedWallets: string[];
        mainWallet: string;
        passportId: string;
        pendingKyc: boolean;
        onchain: boolean;
    };
    socialAccounts: {
        platform: string;
        username: string;
        followers: number;
        following: number;
        url: string;
        bio?: string;
        avatarUrl?: string;
    }[];
    stats: {
        nominationsReceived: number;
        lastUpdated: string;
        createdAt: string;
        socialsCalculatedAt: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
        isAdmin: boolean;
        profilePicture?: string;
    };
}
