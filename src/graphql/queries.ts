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

const getUsersByCompany = `
query UsersByCompany($companyId: ID! $roles: [Role]) {
  usersByCompany(companyId: $companyId roles: $roles) {
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

const getEntriesByType = `
query EntriesByType($input: InputEntryByTypeAndTimestamp) {
  entriesByType(input: $input) {
    id
    user_id
    type
    start_timestamp
    end_timestamp
  }
}
`;

const createEntryMutation = `
mutation CreateEntry($input: InputEntry) {
  createEntry(input: $input) {
    id
  }
}
`;

const updateEntryMutation = `
mutation UpdateEntry($id: ID!, $input: UpdateEntry) {
  updateEntry(id: $id, input: $input) {
    id
  }
}
`;

const getLatestModifiedEntry = `
query EntryLatestModified($input: InputEntryTypeOnly) {
  entryLatestModified(input: $input) {
    id
    type
    start_timestamp
    end_timestamp
  }
}
`;

const getCompanies = `
query Companies {
  companies {
    id
    name
    business_identity_code
    allowed_emails
    employees {
      id
      first_name
      last_name
      job_title
      profile_picture
      manager {
        id
      }
    }
    managers {
      id
      first_name
      last_name
      job_title
      profile_picture
    }
  }
}
`;

const createCompany = `
mutation CreateCompany($input: InputCompany) {
  createCompany(input: $input) { id }
}
`;

const createManager = `
mutation CreateManager($input: InputUser) {
  createUser(input: $input) { id }
}
`;

export {
  loginQuery,
  getUserQuery,
  signup,
  getCompanyEmails,
  updateUserMutation,
  getUsersByCompany,
  getEntriesByType,
  createEntryMutation,
  updateEntryMutation,
  getLatestModifiedEntry,
  getCompanies,
  createCompany,
  createManager,
};
