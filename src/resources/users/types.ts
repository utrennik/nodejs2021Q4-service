export interface IUserData {
  id?: string;

  name: string;

  login?: string;

  password?: string;
}

export interface ILoginData {
  login: string;
  password: string;
}

export interface ILoginRequest {
  Body: ILoginData;
}

export interface IGetUserByIdRequest {
  Params: {
    id: string;
  };
}

export interface IPostUserRequest {
  Body: IUserData;
}

export interface IUpdateUserRequest {
  Params: {
    id: string;
  };
  Body: IUserData;
}

export interface IDeleteUserRequest {
  Params: {
    id: string;
  };
}
