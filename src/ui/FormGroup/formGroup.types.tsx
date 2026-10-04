import { LabelProps } from "../Label/label.types";

export interface FormGroupProps {
    labelObject?: LabelProps;
    fieldObject: {
        type?: string;
        placeholder?: string;
        autoComplete?: string;
        ariaLabel?: string;
    };
    name: string;
}
