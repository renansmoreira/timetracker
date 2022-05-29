export interface TimerPersistenceModel {
  id: string;
  description?: string;
  billable: boolean;
  projectId?: string;
  startDate?: number;
  endDate?: number;
}
