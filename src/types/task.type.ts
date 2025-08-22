export interface TaskDTO {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  deadline: string;
  isFavorite: boolean;
  categoryId?: string;
  category?: {
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
