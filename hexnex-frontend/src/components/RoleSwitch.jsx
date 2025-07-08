import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const RoleSwitch = ({ role, setRole }) => {
  return (
    <ToggleButtonGroup
      value={role}
      exclusive
      onChange={(e, newRole) => newRole && setRole(newRole)}
      color="primary"
      sx={{ mb: 3 }}
    >
      <ToggleButton value="student">Student</ToggleButton>
      <ToggleButton value="admin">Admin</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default RoleSwitch;