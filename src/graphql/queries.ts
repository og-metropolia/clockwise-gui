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

const signup = `
mutation Login($input: UserInput!, $email: String!, $password: String!) {
  createUser(input: $input) {
    id
  }
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

const getCompanyEmails = `
query Company($companyId: ID!) {
  company(id: $companyId) {
    allowed_emails
  }
}
`;

const updateUserMutation = `
mutation UpdateUser($id: ID!, $input: UpdateUser!) {
  updateUser(id: $id, input: $input) {
    id
    email
    role
    first_name
    last_name
    job_title
    phone
    language
    profile_picture
    manager
    company
  }
}
`;

export {
  loginQuery,
  getUserQuery,
  signup,
  getCompanyEmails,
  updateUserMutation,
};
