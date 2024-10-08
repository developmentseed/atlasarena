import {
  FormControl,
  FormLabel,
  Stack,
  Radio,
  RadioGroup,
  Checkbox,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { DEFAULT_TIME } from '@/config/constants';
import FormLabelFlex from '@/components/custom/FormLabelFlex';

const FormControlRadioTime = ({
  label,
  options,
  handleAction,
  info = '',
  isDisabled = false,
}) => {
  const [selectRadio, setSelectRadio] = useState(DEFAULT_TIME);
  const [selectCheck, setSelectCheck] = useState(false);

  if (!options.length) return null;

  // filter
  const renderOptions = options
    .filter((i) => !`${i.name}`.toLowerCase().includes('delta'))
    .map((item) => {
      return (
        <Radio
          isChecked={selectRadio === item.name}
          key={item.key}
          value={item.key}
        >
          {item.name}
        </Radio>
      );
    });
  const deltaOptions = options
    .filter((i) => `${i.name}`.toLowerCase().includes('delta'))
    .map((item) => item.name);

  // action
  const sendAction = (radioVal, checkVal) => {
    let newVal = [];
    if (radioVal) {
      newVal.push(radioVal);
    }
    if (checkVal && deltaOptions.length) {
      newVal = newVal.concat(deltaOptions);
    }
    handleAction([...newVal]);
  };
  const handleChangeRadio = (val) => {
    setSelectRadio(val);
    sendAction(val, selectCheck);
  };
  const handleChangeCheck = () => {
    setSelectCheck(!selectCheck);
    sendAction(selectRadio, !selectCheck);
  };

  return (
    <FormControl my={4} isDisabled={isDisabled}>
      <FormLabelFlex label={label} info={info} isDisabled={isDisabled} />
      <RadioGroup
        defaultValue={selectRadio}
        onChange={handleChangeRadio}
        isDisabled={isDisabled}
      >
        <Stack pl={0} py={1} spacing={1}>
          {renderOptions}
        </Stack>
      </RadioGroup>
      <Stack pl={0} pt={2} spacing={1}>
        <Checkbox
          onChange={handleChangeCheck}
          isChecked={selectCheck}
          isDisabled={isDisabled || deltaOptions.length === 0}
        >
          Show Delta
        </Checkbox>
      </Stack>
    </FormControl>
  );
};
export default FormControlRadioTime;
