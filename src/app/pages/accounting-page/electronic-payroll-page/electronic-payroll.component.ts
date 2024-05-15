import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../general/sidebar/sidebar.component';

@Component({
  selector: 'app-electronic-payroll',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './electronic-payroll.component.html',
  styleUrl: './electronic-payroll.component.css'
})
export class ElectronicPayrollComponent {

  fileUploaded = false;

  onUploadButtonClick() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected() {
    this.fileUploaded = true;
  }

  downloadPDF() {
    const pdfBlob = new Blob([' '], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carta_de_exoneracion.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
