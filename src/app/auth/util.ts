import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // if(control.errors && Object.keys(control.errors).filter(errorName => errorName !== 'email').length > 0) {
    //     return null;
    // }

    if(!value) {
        return null;
    }

    if(!/.{6,}@gmail\.(bg|com)/.test(value)) {
        return {
            email: true
        }
    }

    return null;
}

export function passwordsMatch(passwordFormControl: AbstractControl) {

    const validatorFn: ValidatorFn =  (repasswordFormControl: AbstractControl) => {
        if(passwordFormControl.value !== repasswordFormControl.value) {
            return {
                passwordMatch: true
            };
        }
        return null;
    }

    return validatorFn;
}

export function passwordsMatch2(repasswordFormControl: AbstractControl): ValidationErrors | null {
    const passwordGroup = repasswordFormControl.parent as FormGroup;

    if(!passwordGroup) {
        return null;
    }

    const { password, repassword } = passwordGroup.controls;
    if(password.value !== repassword.value) {
        return {
            passwordsMatch2: true
        };
    }

    return null;
}