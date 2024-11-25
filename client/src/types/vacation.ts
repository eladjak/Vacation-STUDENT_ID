export interface Vacation {
    id: number;
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    image_url: string;
    followers_count: number;
    is_followed: boolean;
}

export interface VacationFormData {
    destination: string;
    description: string;
    image_url?: string | File;
    start_date: string;
    end_date: string;
    price: number;
}

export interface UpdateVacationRequest {
    id: number;
    data: VacationFormData;
}
