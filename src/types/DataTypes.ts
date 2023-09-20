export type GetBoardType = {
  id?: number;
  created_date?: string;
  modified_date?: string;
  title: string;
  description: string;
};

export type GetStatusType = {
  id?: number;
  created_date?: string;
  modified_date?: string;
  title: string;
  description: string;
};

export type GetTaskType = {
  id?: number;
  title: string;
  description: string;
  priority: string;
  due_date: string;
  completed: boolean;
};
