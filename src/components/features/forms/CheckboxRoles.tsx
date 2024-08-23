import React, { useEffect, useState } from 'react'
import { Box, FormControl, FormControlLabel, Checkbox, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RoutePermissionDto } from '@/services/model'

interface CheckboxRolesProps {
  permissions: Record<string, RoutePermissionDto[]>
  initialPermissions: {
    id: string
    name: string
  }[] | null
  onChange: (selectedIds: string[]) => void
}

export default function CheckboxRoles({ permissions, initialPermissions, onChange }: CheckboxRolesProps) {
  const [permissionsState, setPermissionsState] = useState<Record<string, boolean>>({})
  console.log(initialPermissions);
  
  const permissionGroups = Object.keys(permissions)
  const { t: translate } = useTranslation()
  
  useEffect(() => {
    if (initialPermissions) {
      const currentPermissionIds = initialPermissions.map((current) => current.id)
      const initialState: Record<string, boolean> = {};
      permissionGroups.forEach(group => {
        permissions[group].forEach(permission => {
          initialState[permission.id!] = currentPermissionIds.includes(permission.id!);
        });
      });
      
      setPermissionsState(initialState);
    }
  }, [initialPermissions]);
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    const updatedPermissionsState = {
      ...permissionsState,
      [name]: checked
    }
  
    setPermissionsState(updatedPermissionsState)

    const selectedIds = Object.keys(updatedPermissionsState).filter(
      (key) => updatedPermissionsState[key]
    )
    onChange(selectedIds)
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" flexDirection={'column'}>
        <Grid container spacing={2}>
          {permissionGroups.map((col) => (
            <Grid item xs={3}>
              <FormControl component="fieldset">
                <Typography variant="h6">{translate(col)}</Typography>
                {permissions[col].map((permission: RoutePermissionDto) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={permission.id!}
                        checked={permissionsState[permission.id!] || false}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={translate(permission.name!)}
                  />
                ))}
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
