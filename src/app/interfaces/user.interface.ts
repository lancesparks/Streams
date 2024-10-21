export interface UserResponse {
  //the response from the get user endpoint
  expiresIn: number;
  href: string;
  id: string;
  name: string;
  owner: {
    href: string;
    id: number;
  };
  role: string;
  scope: {
    baseScope: any[];
    cameraScopes: any[];
  };
  type: string;
  userId: string;
}

export interface User {
  username: string;
  password: string;
}
