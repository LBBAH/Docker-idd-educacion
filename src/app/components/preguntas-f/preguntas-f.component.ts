import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-preguntas-f',
  templateUrl: './preguntas-f.component.html',
  styleUrls: ['./preguntas-f.component.css'],
  
})
export class PreguntasFComponent implements OnInit {

  constructor() { }


panelOpenState = false;

  ngOnInit(): void {
  }

}




