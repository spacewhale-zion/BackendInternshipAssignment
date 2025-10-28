export interface Entity {
  _id: string; // Typically provided by MongoDB
  title: string;
  description?: string; // Optional description
  createdBy: string; // ID of the user who created it
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}