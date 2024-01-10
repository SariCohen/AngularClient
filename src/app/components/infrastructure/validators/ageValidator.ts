import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function AgeValidator(age: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        let today: Date = new Date();
        if (control.value) {
            let dt = new Date(control.value.toString())
            if (dt && today.getFullYear() - dt.getFullYear() < age)
                return { AgeNotMatch: { value: control.value } }
        }
        return null;
    };
}