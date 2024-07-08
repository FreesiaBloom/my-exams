export const mockUsers = [
    {
        id: 1,
        username: "jackb",
        role: "student",
        passwordHash: "098f6bcd4621d373cade4e832627b4f6",
        status: 1
      },
      {
        id: 3,
        username: "yairyoko",
        role: "student",
        passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
        status: 1
      },
      {
        id: 6,
        role: "student",
        username: "nolvasergey",
        passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
        status: 1
      },
      {
        id: 7,
        username: "karltheman",
        role: "student",
        passwordHash: "202cb962ac59075b964b07152d234b70",
        status: 1
      },
      {
        id: 2,
        role: "admin",
        username: "admin",
        passwordHash: "5f4dcc3b5aa765d61d8327deb882cf99",
        status: 2
      }
]

export const mockUserData = {
    id: 1,
    username: "jackb",
    role: "student",
    status: 1,
    password: "password",
    passwordHash: "098f6bcd4621d373cade4e832627b4f6"
  }

export const mockUpdatePasswordUserData = {
    id: 1,
    username: "jackb",
    role: "student",
    status: 1,
    password: "test",
    retype_password: "test",
    passwordHash: "098f6bcd4621d373cade4e832627b4f6"
  }
  
export const mockUpdatedUserData = {
    id: 1,
    username: "jackb",
    role: "student",
    status: 1,
    passwordHash: "098f6bcd4621d373cade4e832627b4f6"
}