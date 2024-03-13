import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ManagerDashboard.module.css';
import ProfileCard from '@/components/ProfileCard';
import ROUTES from '@/constants/routes';
import { fetchGraphql } from '@/graphql/fetch';
import { getUsersByCompany } from '@/graphql/queries';
import { useUser } from '@/components/UserContext';
import { LoginUser } from '@/types/user';
import Footer from '@/components/Footer';
import { List, ListItem, Box } from '@mui/material';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { getUser } = useUser();
  const user = getUser();

  const [employees, setEmployees] = useState<LoginUser[]>([]);

  useEffect(() => {
    fetchGraphql(getUsersByCompany, {
      companyId: user?.company?.id,
      roles: ['EMPLOYEE'],
    }).then((data: any) => {
      const employees = (data?.usersByCompany ?? []) as LoginUser[];
      setEmployees(employees);
    });
  }, [user?.company?.id]);

  const viewEmployeeReport = (employeeId: string) => {
    navigate(ROUTES.visit + `/${employeeId}`);
  };

  return (
    <div className={styles.basePage}>
      <h1 className={styles.title}>Management</h1>
      <div className={styles.employeeListContainer}>
        <List className={styles.employeeList}>
          {employees.map((employee) => (
            <ListItem
              key={employee.id}
              className={styles.employeeListItem}
              onClick={() => viewEmployeeReport(employee.id)}
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <ProfileCard user={employee} />
              </Box>
            </ListItem>
          ))}
        </List>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerDashboard;
