import React, { useEffect, useState } from 'react'
import { Box, FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { RoutePermissionDto } from '@/services/model'

interface CheckboxRolesProps {
  permissions: Record<string, RoutePermissionDto[]>
  currentPermissions: {
    id: string
    name: string
  }[]
  onChange: (selectedIds: string[]) => void
}

export default function CheckboxRoles({ permissions, currentPermissions,onChange }: CheckboxRolesProps) {
  const [permissionsState, setPermissionsState] = useState<Record<string, boolean>>({})
  
  const permissionGroups = Object.keys(permissions)
  const firstColumns = permissionGroups.slice(0, 5)
  const secondColumns = permissionGroups.slice(5)
  const { t: translate } = useTranslation()

  useEffect(() => {
    const currentPermissionIds = currentPermissions.map((current) => current.id)
    const initialState: Record<string, boolean> = {};
    permissionGroups.forEach(group => {
      permissions[group].forEach(permission => {
        initialState[permission.id!] = currentPermissionIds.includes(permission.id!);
      });
    });
    setPermissionsState(initialState);
  }, [permissions, currentPermissions]);

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
        <Box display={'flex'}>
          {firstColumns.map((col) => (
            <Box>
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
            </Box>
          ))}
        </Box>

        <Box display={'flex'}>
          {secondColumns.map((col) => (
            <Box flex="1">
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
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}
