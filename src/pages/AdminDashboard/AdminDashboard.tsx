import { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { fetchGraphql } from '@/graphql/fetch';
import { getCompanies } from '@/graphql/queries';
import { List, ListItem, Box, Button, Typography } from '@mui/material';
import { Company } from '@/types/company';


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
