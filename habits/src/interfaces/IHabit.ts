
export default interface Habit {
    id?: string; 
    name: string;
    startDate: string;
    endDate?: string | null;
    frequency: string;
    reminderTime?: string | null;
    userId: string;
    isCompleted?: boolean[]; 
    streakCount?: number;  
  }
