import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";

<RadioButtons
  legend="Légende pour l’ensemble de champs"
  name="radio"
  options={[
    {
      label: 'Label radio',
      nativeInputProps: {
        value: 'value1'
      }
    },
    {
      label: 'Label radio 2',
      nativeInputProps: {
        value: 'value2'
      }
    },
    {
      label: 'Label radio 3',
      nativeInputProps: {
        value: 'value3'
      }
    }
  ]}
  orientation="horizontal"
/>