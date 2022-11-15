import { FormControl, ValidationErrors } from "@angular/forms";

export class DTShopValidators {

        // whitespace validation
        static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        
            // check if string only contains whitespace
            if ((control.value != null) && (control.value.trim().length === 0)) {
    
                // invalid, return error object
                return { 'notOnlyWhitespace': true };
            }
            else {
                // valid, return null
                return null as any;
            }
        }
        static comfirm_password(password: FormControl,confirm_password: FormControl): ValidationErrors {
        
            // check if string only contains whitespace
            if ((confirm_password.value != null) && (confirm_password.value.trim().length === 0) && (confirm_password.value != password.value)) {
    
                // invalid, return error object
                return { 'comfirm_password': true };
            }
            else {
                // valid, return null
                return null as any;
            }
        }
    }
