import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import ProfileCard from '@/components/ProfileCard';
import ROUTES from '@/constants/routes';
import { fetchGraphql } from '@/graphql/fetch';
import { getCompanies, getUsersByCompany } from '@/graphql/queries';
import { useUser } from '@/components/UserContext';
import { LoginUser } from '@/types/user';
import Footer from '@/components/Footer';
import { List, ListItem, Box, Button, Typography } from '@mui/material';
import { Company } from '@/types/company';

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const { getUser } = useUser();
//   const user = getUser();

//   const [employees, setEmployees] = useState<LoginUser[]>([]);

//   useEffect(() => {
//     fetchGraphql(getEmployeesByCompany, {
//       companyId: user?.company?.id,
//       role: ['EMPLOYEE', 'MANAGER'],
//     }).then((data: any) => {
//       const employees = (data?.usersByCompany ?? []) as LoginUser[];
//       setEmployees(employees);
//     });
//   }, [user?.company?.id]);

//   const viewEmployeeReport = (employeeId: string) => {
//     navigate(ROUTES.visit + `/${employeeId}`);
//   };

//   return (
//     <div className={styles.basePage}>
//       <h1 className={styles.title}>Management</h1>
//       <div className={styles.companyListContainer}>
//         <List className={styles.companyList}>
//           {employees.map((employee) => (
//             <ListItem
//               key={employee.id}
//               className={styles.companyListItem}
//               onClick={() => viewEmployeeReport(employee.id)}
//             >
//               <Box
//                 display="flex"
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 width="100%"
//               >
//                 <ProfileCard user={employee} />
//               </Box>
//             </ListItem>
//           ))}
//         </List>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;

{
  /* <Box>
{companies.map((company) => (
  <Box key={company.id} mb={2}>
    <Typography variant="h6">{company.name}</Typography>
    <List>
      {company.managers.map((manager) => (
        <ListItem key={manager.id}>
          <Typography variant="subtitle1">{manager.name} - Manager</Typography>
          <List>
            {manager.employees.map((employee) => (
              <ListItem key={employee.id}>
                <Typography variant="body2">{employee.name} - {employee.position}</Typography>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  </Box>
))}
</Box> */
}

const AdminDashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  useEffect(() => {
    fetchGraphql(getCompanies, {}).then((data) => {
      console.log('data', data);
      setCompanies(data.companies);
    });
  }, []);

  const handleToggleExpand = (companyId: string) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  return (
    <Box>
      {companies.map((company) => (
        <Box key={company.id} mb={2}>
          <Button onClick={() => handleToggleExpand(company.id)}>
            {company.name}
          </Button>
          {expandedCompany === company.id && (
            <Box pl={2} className={styles.expandableSection}>
              {' '}
              {/* Käytetään määriteltyä tyyliä */}
              <Typography variant="subtitle1">
                Managers and Employees
              </Typography>
              <List>
                {company.managers.map((manager) => (
                  <ListItem key={manager.id}>
                    <Typography variant="subtitle1">
                      {manager.first_name + ' ' + manager.last_name} - Manager
                    </Typography>
                    {/* Tässä voisi olla tarve filtteröidä työntekijät kunkin managerin alle, jos data-rakenne sen vaatii */}
                    <List>
                      {company.employees.map((employee) => (
                        <ListItem key={employee.id}>
                          <Typography variant="body2">
                            {employee.first_name + ' ' + employee.last_name} -{' '}
                            {employee.job_title}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
export default AdminDashboard;
