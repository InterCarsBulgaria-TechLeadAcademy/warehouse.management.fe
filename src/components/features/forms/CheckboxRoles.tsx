import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CheckboxRoles() {
  // State to manage each checkbox
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    createZones: false,
    readZones: false,
    editZones: false,
    deleteZones: false,

    createDeliveries: false,
    readDeliveries: false,
    editDeliveries: false,
    deleteDeliveries: false,

    createDifferences: false,
    readDifferences: false,
    editDifferences: false,
    deleteDifferences: false,
    changeStatus: false,
  });

  const { t: translate } = useTranslation()

  // Handler to update state when a checkbox is toggled
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  // Create an array of selected checkboxes
  const selectedItems = Object.keys(checkedItems).filter(
    (key) => checkedItems[key]
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        {/* Column 1 */}
        <Box flex="1">
          <FormControl component="fieldset">
            <Typography variant="h6">{translate('Зони')}</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="createZones"
                  checked={checkedItems.createZones}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Създаване на зони')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="readZones"
                  checked={checkedItems.readZones}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Четене на зони')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="editZones"
                  checked={checkedItems.editZones}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Редактиране на зони')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="deleteZones"
                  checked={checkedItems.deleteZones}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Триене на зони')}
            />
          </FormControl>
        </Box>

        {/* Column 2 */}
        <Box flex="1">
          <FormControl component="fieldset">
            <Typography variant="h6">{translate('Доставки')}</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="createDeliveries"
                  checked={checkedItems.createDeliveries}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Създаване на доставки')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="readDeliveries"
                  checked={checkedItems.readDeliveries}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Четене на доставки')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="editDeliveries"
                  checked={checkedItems.editDeliveries}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Редактиране на доставки')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="deleteDeliveries"
                  checked={checkedItems.deleteDeliveries}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Триене на доставки')}
            />
          </FormControl>
        </Box>

        {/* Column 3 */}
        <Box flex="1">
          <FormControl component="fieldset">
            <Typography variant="h6">{translate('Разлики')}</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="createDifferences"
                  checked={checkedItems.createDifferences}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Създаване на разлики')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="readDifferences"
                  checked={checkedItems.readDifferences}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Четене на разлики')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="editDifferences"
                  checked={checkedItems.editDifferences}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Редактиране на разлики')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="deleteDifferences"
                  checked={checkedItems.deleteDifferences}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Триене на разлики')}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="changeStatus"
                  checked={checkedItems.changeStatus}
                  onChange={handleCheckboxChange}
                />
              }
              label={translate('Смяна на статус')}
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
