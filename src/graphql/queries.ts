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

const getUserQuery = `
query User($userId: ID!) {
  user(id: $userId) {
    id
    email
    password
    role
    first_name
    last_name
    language
    job_title
    phone
    profile_picture
    manager {
      id
    }
    company {
      id
    }
  }
}
`;

export { loginQuery, getUserQuery };
