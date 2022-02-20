export class CreateRoomDTO {
  host_user_id: string;
  host_nickname: string;
  title: string;
  content: string;
  location_latitude: string;
  location_longitude: string;
  rating_score: number;
  rating_count: number;
  host_role: number;
}
