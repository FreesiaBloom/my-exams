export const mockUsers = [
  {
    id: 1,
    username: "agataj",
    role: "student",
    passwordHash: "cc03e747a6afbbcbf8be7668acfebee5",
    status: 1,
  },
  {
    id: 3,
    username: "yairyoko",
    role: "student",
    passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
    status: 1,
  },
  {
    id: 6,
    role: "student",
    username: "nolvasergey",
    passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
    status: 1,
  },
  {
    id: 7,
    username: "karltheman",
    role: "student",
    passwordHash: "202cb962ac59075b964b07152d234b70",
    status: 1,
  },
  {
    id: 8,
    username: "testteste",
    role: "student",
    passwordHash: "202cb962ac59075b964b07152d234b70",
  },
  {
    id: 2,
    role: "admin",
    username: "admin",
    passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
    status: 2,
  },
];

export const mockUser = {
  id: 1,
  username: "agataj",
  role: "student",
  status: 1,
  password: "test123",
  passwordHash: "cc03e747a6afbbcbf8be7668acfebee5",
};

export const mockWrongCredentialsUser = {
  id: 1,
  username: "agata",
  role: "student",
  status: 1,
  password: "test123",
  passwordHash: "cc03e747a6afbbcbf8be7668acfebee5",
};

export const mockInvalidUser = {
  id: 8,
  username: "testteste",
  role: "student",
  password: "test123",
  passwordHash: "cc03e747a6afbbcbf8be7668acfebee5",
};

export const mockUpdatePasswordUser = {
  id: 1,
  username: "agataj",
  role: "student",
  status: 1,
  password: "test",
  retype_password: "test",
  passwordHash: "098f6bcd4621d373cade4e832627b4f6",
};

export const mockUpdatedUser = {
  id: 1,
  username: "agataj",
  role: "student",
  status: 1,
  passwordHash: "098f6bcd4621d373cade4e832627b4f6",
};
