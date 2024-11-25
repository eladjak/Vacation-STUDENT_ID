import { Vacation } from '../types/vacation';

export interface VacationFormData {
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: number;
  image_url: string;
}

export const vacationService = {
  async addVacation(data: VacationFormData): Promise<Vacation> {
    const response = await fetch('/api/vacations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add vacation');
    }
    
    return response.json();
  },

  async updateVacation(id: number, data: VacationFormData): Promise<Vacation> {
    const response = await fetch(`/api/vacations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update vacation');
    }
    
    return response.json();
  }
}; 