export interface Vacation {
  id: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageUrl: string;
  followersCount: number;
  isFollowing?: boolean;
}

export interface User {
  id: number;
  username: string;
  role: string;
  isAdmin: boolean;
} 