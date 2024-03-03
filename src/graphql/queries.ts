const loginQuery = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
        role
      }
    }
  }
`;

export { loginQuery };
