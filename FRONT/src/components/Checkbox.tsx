import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";

<Checkbox
  legend="Légende pour l’ensemble des champs"
  options={[
    {
      label: 'Label checkbox',
      nativeInputProps: {
        name: 'checkboxes-1',
        value: 'value1'
      }
    },
    {
      label: 'Label checkbox 2',
      nativeInputProps: {
        name: 'checkboxes-1',
        value: 'value2'
      }
    },
    {
      label: 'Label checkbox 3',
      nativeInputProps: {
        name: 'checkboxes-1',
        value: 'value3'
      }
    }
  ]}
  orientation="horizontal"
/>