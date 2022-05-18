import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SigninService } from 'src/app/modules/shared/services/signin.service';

@Component({
  selector: 'app-choose-rol',
  templateUrl: './choose-rol.component.html',
  styleUrls: ['./choose-rol.component.scss'],
})
export class ChooseRolComponent implements OnInit {
  roles: { code: number; name: string }[] = [];
  branches: { code: number; name: string }[] = [];
  openSelectRole: boolean = false;
  openSelectAgency: boolean = false;
  @ViewChild('inputRole') inputRole: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('inputAgency') inputAgency: ElementRef<HTMLDivElement> | undefined;
  formChoose: FormGroup;

  constructor(private _signInService: SigninService) {
    this.formChoose = new FormGroup({
      role: new FormControl('', [Validators.required]),
      agency: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.roles = this._signInService.roles;
    this.branches = this._signInService.branches;
    document.addEventListener('click', (e) => {
      if (!this.inputRole?.nativeElement?.contains(e.target as Node)) {
        this.openSelectRole = false;
      }
    });
    document.addEventListener('click', (e) => {
      if (!this.inputAgency?.nativeElement?.contains(e.target as Node)) {
        this.openSelectAgency = false;
      }
    });
  }

  openSelectAgencyMethod() {
    this.openSelectAgency = !this.openSelectAgency;
  }

  openSelectRoleMethod() {
    this.openSelectRole = !this.openSelectRole;
  }
  selectRole(role: { name: string; code: number }) {
    this.formChoose.get('role')?.setValue(role.name);
  }
  selectAgency(branch: { name: string; code: number }) {
    this.formChoose.get('agency')?.setValue(branch.name);
  }

  handleChange(field: string) {
    this.formChoose.get(field)?.setValue('');
  }
}
