import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor() {
    const firebaseConfig = {
     // Insérer votre propre config ici
    };
// Initialize Firebase
    initializeApp(firebaseConfig);
  }
}
