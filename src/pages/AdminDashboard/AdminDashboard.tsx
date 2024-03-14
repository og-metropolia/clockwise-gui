import { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { fetchGraphql } from '@/graphql/fetch';
import { getCompanies } from '@/graphql/queries';
import { List, ListItem, Box, Typography } from '@mui/material';
import { Company } from '@/types/company';
import Footer from '@/components/Footer';
import { useUser } from '@/components/UserContext';
import ProfileCard from '@/components/ProfileCard';

const AdminDashboard = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const { getUser } = useUser();
  const user = getUser();

  useEffect(() => {
    fetchGraphql(getCompanies, {}).then((data) => {
      setCompanies(data.companies);
    });
  }, []);

  const handleToggleExpand = (companyId: string) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  return (
    <div className={styles.basePage}>
      <ProfileCard user={user} />
      <h2 className={styles.baseTitle}>Companies</h2>
      <Box>
        <List className={styles.companyList}>
          {companies.map((company) => (
            <Box key={company.id} mb={2}>
              <button className={styles.baseSecondaryButton} onClick={() => handleToggleExpand(company.id)}>
                {company.name}
              </button>
              {expandedCompany === company.id && (
                <Box pl={2} className={styles.expandableSection}>
                  {' '}
                  <Typography variant="subtitle1" className={styles.peopleTitle}>Managers</Typography>
                  <List className={styles.peopleList}>
                    {company.managers.map((manager) => (
                        <ListItem key={manager.id}>
                          <Typography variant="subtitle1">
                            {manager.first_name + ' ' + manager.last_name} -
                            Manager
                          </Typography>
                        </ListItem>
                    ))}
                  </List>
                  <Typography variant="subtitle1" className={styles.peopleTitle}>Employees</Typography>
                  <List className={styles.peopleList}>
                    {company.employees.map((employee) => (
                      <ListItem key={employee.id}>
                        <Typography variant="body2">
                          {employee.first_name + ' ' + employee.last_name} -{' '}
                          {employee.job_title}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          ))}
        </List>
      </Box>
      <Footer />
    </div>
  );
};
export default AdminDashboard;
