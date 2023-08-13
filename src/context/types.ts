export type ErrCallbackType = (err: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type UserDataType = {
  id: number;
  // role: string
  email: string;
  // fullName: string
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
  createdDate: string;
  lastLogin: string;
  lastLogout: string;
  lastModified: string;

  // avatar?: string | null
};

export type AuthValuesType = {
  logout: () => void;
  user: UserDataType | null;
  setUser: (value: UserDataType | null) => void;
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void;
};
