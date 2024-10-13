import { RowDataPacket } from 'mysql2';

interface Vacation extends RowDataPacket {
  id: number;
  description: string;
  destination: string;
  image: string;
  startDate: Date;
  endDate: Date;
  price: number;
  followersCount: number;
}

export default Vacation;
