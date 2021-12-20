import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ValidationForm {
    myform:FormGroup = new FormGroup({
        uname:new FormControl("",[Validators.required]),
        pwd:new FormControl("",[Validators.required])
    })
}
