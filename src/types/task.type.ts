export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  deadline: string;
  isFavorite: boolean;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
}
