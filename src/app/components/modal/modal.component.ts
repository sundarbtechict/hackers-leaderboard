import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../shared.service';
import { Overlay } from '@angular/cdk/overlay';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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
  teams = {};
  myControl = new FormControl();
  options;
  filteredOptions: Observable<string[]>;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    public dialogRef: MatDialogRef<ModalComponent>,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {
    if (this.data['mode'] == 'addMatch') {
      this.sharedService.getData("teams?pageNo=1&pageSize=500").subscribe((response: any) => {
        this.options = response;
        this.TeamName2 = this.TeamName1 = response[0]._id;
        console.log(response);
      });
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  setWinner(data) {
    if (data == 'team1') {
      this.teams = {
        team1: {
          id: this.TeamName1,
          result: 'win'
        },
        team2: {
          id: this.TeamName2,
          result: 'loss'
        }
      }
    }
    else if (data == 'team2') {
      this.teams = {
        team1: {
          id: this.TeamName1,
          result: 'loss'
        },
        team2: {
          id: this.TeamName2,
          result: 'win'
        }
      }
    }
    else {
      this.teams = {
        team1: {
          id: this.TeamName1,
          result: 'tie'
        },
        team2: {
          id: this.TeamName2,
          result: 'tie'
        }
      }
    }

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
          data: { ...this.teams, matchName: this.matchName }
        });
    else
      this.dialogRef.close();
  }




}
