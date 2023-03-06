import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/components/users/interface/users';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @ViewChild('modal', { static: true })
  modal!: ElementRef;
  @Input() title: string = '';
  @Output()
  save: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  update: EventEmitter<any> = new EventEmitter<any>();

  userForm!: FormGroup;
  isMayorEdad: boolean = true;
  isInscripcionMayor: boolean = true;
  data: User = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    fechaInscripcion: '',
    costo: 0,
    edad: 0,
  };
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.userForm = this.formBuilder.group({
      nombre: new FormControl(this.data.nombre || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      apellido: new FormControl(this.data.apellido || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      fechaNacimiento: new FormControl(this.data.fechaNacimiento || '', [
        Validators.required,
      ]),
      edad: new FormControl(this.data.edad || '', [Validators.required]),
      fechaInscripcion: new FormControl(this.data.fechaInscripcion || '', [
        Validators.required,
      ]),
      costo: new FormControl(this.data.costo || '', [Validators.required]),
    });
  }

  openModal(data: any) {
    this.data = data;
    if (data !== undefined) {
      this.form();
    }
    $(this.modal.nativeElement).modal('show');
  }
  closeModal() {
    $(this.modal.nativeElement).modal('hide');
  }
  submit() {
    if (this.title == 'Actualizar') {
      this.update.emit({ data: this.userForm.value, id: this.data.id });
    } else {
      this.save.emit(this.userForm.value);
    }
    this.closeModal();
  }
  calcularEdad() {
    const anio = this.userForm.value.fechaNacimiento.split('-');
    const edad = new Date().getFullYear() - anio[0];
    this.userForm.patchValue({
      edad: edad,
    });
    edad > 18 ? (this.isMayorEdad = true) : (this.isMayorEdad = false);
  }

  calcularCosto() {
    if (
      this.userForm.value.fechaInscripcion < this.userForm.value.fechaNacimiento
    ) {
      this.isInscripcionMayor = false;
    } else {
      this.isInscripcionMayor = true;
    }
    const anioInscripcion = this.userForm.value.fechaInscripcion.split('-');
    const costo = (new Date().getFullYear() - anioInscripcion[0]) * 100;
    this.userForm.patchValue({
      costo: costo,
    });
  }

  get nombre() {
    return this.userForm.get('nombre');
  }
  get apellido() {
    return this.userForm.get('apellido');
  }
}
