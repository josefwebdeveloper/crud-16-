import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MainComponent} from "../../pages/main/main.component";
import {DataModel, DialogData} from "../../models/data.model";
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit{
  form = this.fb.group({
    name: [this.data.name,[Validators.required, Validators.minLength(3)]],
    description: [this.data.description,[Validators.required, Validators.minLength(3)]],
  })
  constructor(
    public dialogRef: MatDialogRef<MainComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private fb: FormBuilder,
  ) {
  }
  ngOnInit() {
    console.log(this.data)
  }

  getErrorMessage(control: AbstractControl | null): string {
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length 3`;
    }
    return '';
  }
  onSubmit(e: Event) {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;

    }
    const item={
      ...this.form.value,
      id: this.data.id
    }
   this.dialogRef.close(item)
  }

}
