import { useState } from "react";
import { Select } from "@codegouvfr/react-dsfr/Select";

function MyComponent(){

    const [ value, setValue ] = useState("");

    return (
        <Select
            label="Label"
            nativeSelectProps={{
                onChange: (event : any) => setValue(event.target.value),
                value
            }}
        >
            <option value="" disabled hidden>Selectionnez une option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
        </Select>
    );

}