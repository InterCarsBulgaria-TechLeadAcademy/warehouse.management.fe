import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Checkbox, Typography } from '@mui/material';

export default function CheckboxRoles() {
  // State to manage each checkbox
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
  });

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
            <Typography variant="h6">Column 1</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox1"
                  checked={checkedItems.checkbox1}
                  onChange={handleCheckboxChange}
                />
              }
              label="Checkbox 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox2"
                  checked={checkedItems.checkbox2}
                  onChange={handleCheckboxChange}
                />
              }
              label="Checkbox 2"
            />
          </FormControl>
        </Box>

        {/* Column 2 */}
        <Box flex="1">
          <FormControl component="fieldset">
            <Typography variant="h6">Column 2</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox3"
                  checked={checkedItems.checkbox3}
                  onChange={handleCheckboxChange}
                />
              }
              label="Checkbox 3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox4"
                  checked={checkedItems.checkbox4}
                  onChange={handleCheckboxChange}
                />
              }
              label="Checkbox 4"
            />
          </FormControl>
        </Box>

        {/* Column 3 */}
        <Box flex="1">
          <FormControl component="fieldset">
            <Typography variant="h6">Column 3</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox5"
                  checked={checkedItems.checkbox5}
                  onChange={handleCheckboxChange}
                />
              }
              label="Checkbox 5"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkbox6"
                  checked={checkedItems.checkbox6}
                  onChange={handleCheckboxChange}
                />
              }
              label="Checkbox 6"
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
