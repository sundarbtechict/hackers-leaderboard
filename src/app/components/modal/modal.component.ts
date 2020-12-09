import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../shared.service';
import { Overlay } from '@angular/cdk/overlay';


export interface DialogData { }

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  teamName;
  matchName;
  TeamName1;
  TeamName2;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    public dialogRef: MatDialogRef<ModalComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit(): void {
  }

  onNoClick(): void {
    if (this.data['mode'] == 'addTeam')
      this.dialogRef.close(
        {
          action: 'addTeam',
          data: { team_name: this.teamName }
        });
    else if (this.data['mode'] == 'addMatch')
      this.dialogRef.close(
        {
          action: 'addMatch',
          data: {
            matchName: this.matchName,
            teamName1: this.TeamName1,
            teamName2: this.TeamName2
          }
        });
    else
      this.dialogRef.close();
  }




}
