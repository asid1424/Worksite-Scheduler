export interface Shift {
    id: number;
    date: string;
    time_range_start: string;
    time_range_end: string;
    position: string;
    taken_by: string | null;
  }