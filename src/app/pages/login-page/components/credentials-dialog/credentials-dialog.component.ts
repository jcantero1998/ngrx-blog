import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-credentials-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatIconModule],
  templateUrl: './credentials-dialog.component.html',
  styleUrl: './credentials-dialog.component.scss'
})
export class CredentialsDialogComponent {

  private snackBar = inject(MatSnackBar);

  email = 'admin@mail.com';
  password = 'password123';

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.snackBar.open('Copied to clipboard', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
    });
  }

}
