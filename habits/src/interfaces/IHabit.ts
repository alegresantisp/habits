
export default interface Habit {
    id?: string; // Opcional, se genera después de crear el hábito
    name: string;
    startDate: string;
    endDate?: string | null;
    frequency: string;
    reminderTime?: string | null;
    userId: string;
    isCompleted?: boolean; // Inicialmente puede estar en false o no asignarse
    streakCount?: number;  // Se inicializa en 0 si se requiere después
  }