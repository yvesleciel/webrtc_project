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
      apiKey: "AIzaSyBA70uNF3MAl8yFrju8_BVyaxnectKgY8E",
      authDomain: "genius-d108d.firebaseapp.com",
      databaseURL: "https://genius-d108d.firebaseio.com",
      projectId: "genius-d108d",
      storageBucket: "genius-d108d.appspot.com",
      messagingSenderId: "758350542860",
      appId: "1:758350542860:web:00904e0081f504738f5629"
    };
// Initialize Firebase
    initializeApp(firebaseConfig);
  }
}
