import { Component, OnInit, Optional, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { RxFormBuilder, RxwebValidators } from '@rxweb/reactive-form-validators';
import { getErrorForParticularField } from './form.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'reactive-form';

  submittedForm = false;
  reactiveFormGroup!: FormGroup;
  getErrorForParticularField = getErrorForParticularField;

  get reactiveFormControl() {
    return this.reactiveFormGroup.controls;
  }

  constructor(private rxfb: RxFormBuilder,private dialogService: NbDialogService, @Optional() private dialogRef: NbDialogRef<any>) { }


  ngOnInit() {
    this.reactiveFormGroup = this.rxfb.group({
      fullName: ['', [
        RxwebValidators.required({ message: 'Full name is required' }),
        // RxwebValidators.maxLength({ value: 50, message: 'Full name limit is 50 character' })
      ]],
      email: ['', [
        RxwebValidators.required({ message: 'Email ID field is required' }),
        RxwebValidators.email({ message: "Email ID format invalid" }),
        RxwebValidators.maxLength({ value: 50, message: "Email ID limit is 50 character" })
      ]],
      mobileNo: ['', [
        RxwebValidators.required({ message: 'Mobile number is required' }),
        RxwebValidators.digit({ message: "Mobile number must be a digit" }),
        RxwebValidators.minNumber({ value: 7000000000, message: "Invalid Mobile number (accepted value : 7XXXXXXXXX)" }),
        RxwebValidators.maxNumber({ value: 9999999999, message: "Invalid Mobile number (accepted value : 9XXXXXXXXX)" })
      ]],
      zipCode: ['', [
        RxwebValidators.required({ message: 'Zip code is required' }),
        RxwebValidators.digit({ message: "Zip code must be 5 digit" }),
        RxwebValidators.minNumber({ value: 10000, message: "Invalid Zip code (accepted value : 1XXXX - 9XXXX)" }),
        RxwebValidators.maxNumber({ value: 99999, message: "Invalid Zip code (accepted value : 1XXXX - 9XXXX)" })
      ]],
      age: ['', [
        RxwebValidators.required({ message: 'Age is required' }),
        RxwebValidators.minNumber({ value: 18, message: "Age must be in range 18 - 99" }),
        RxwebValidators.maxNumber({ value: 99, message: "Age must be in range 18 - 99" })
      ]],
      address: ['', [
        RxwebValidators.required({ message: 'Address is required' }),
        RxwebValidators.maxLength({ value: 100, message: "Address limit is 100 character" })
      ]]
    })
  }
  // onSubmit(){
  //   console.log(this.reactiveFormGroup.value);
  // }

  open(dialog: TemplateRef<any>, data:any) {
    const dialogRef = this.dialogService.open(dialog, { context: data });
  }

}