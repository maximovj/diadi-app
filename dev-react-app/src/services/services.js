//Trabajar temporalmente de manera local

const getUsers = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
  };
  
  const addUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const findUserByUsername = (username) => {
    const users = getUsers();
    return users.find(user => user.username === username);
  };

  export { getUsers, addUser, findUserByUsername };