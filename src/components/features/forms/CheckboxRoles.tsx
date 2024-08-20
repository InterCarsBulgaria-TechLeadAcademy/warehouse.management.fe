import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface CheckboxRolesProps {
  permissions: object
}

export default function CheckboxRoles({ permissions }: CheckboxRolesProps) {
  const permissionGroups = Object.keys(permissions)
  const firstColumns = permissionGroups.slice(0, 5)
  const secondColumns = permissionGroups.slice(5)
  console.log(firstColumns);
  console.log(secondColumns);


  const { t: translate } = useTranslation()

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" flexDirection={'column'}>
        <Box display={'flex'}>
          {firstColumns.map((col) =>
            <Box >
              <FormControl component="fieldset">
                <Typography variant="h6">{translate(col)}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="createZones"
                      checked={false}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={translate('Създаване на зони')}
                />
              </FormControl>
            </Box>
          )}
        </Box>

        <Box display={'flex'}>
          {secondColumns.map((col) =>
            <Box flex="1">
              <FormControl component="fieldset">
                <Typography variant="h6">{translate(col)}</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="createZones"
                      checked={false}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={translate('Създаване на зони')}
                />
              </FormControl>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
