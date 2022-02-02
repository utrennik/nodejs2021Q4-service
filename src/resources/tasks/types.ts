export interface ITaskData {
  title: string;
  order: number;
  description: string | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface IGetTasksByBoardIdRequest {
  Params: {
    boardId: string;
  };
}

export interface IGetTaskRequest {
  Params: {
    taskId: string;
    boardId: string;
  };
}

export interface IPostTaskRequest {
  Params: {
    boardId: string;
  };
  Body: ITaskData;
}

export interface IUpdateTaskRequest {
  Params: {
    boardId: string;
    taskId: string;
  };
  Body: ITaskData;
}

export interface IDeleteTaskRequest {
  Params: {
    boardId: string;
    taskId: string;
  };
}
