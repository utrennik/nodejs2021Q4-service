import Column from './columns-model';

export interface IBoardData {
  title: string;
  columns: Column[];
}

export interface IGetBoardByIDRequest {
  Params: {
    id: string;
  };
}

export interface IPostBoardRequest {
  Body: IBoardData;
}

export interface IUpdateBoardRequest {
  Params: {
    id: string;
  };
  Body: IBoardData;
}

export interface IDeleteBoardRequest {
  Params: {
    id: string;
  };
}
