import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from "@angular/forms";
import { ModalComponent } from '../components/modal/modal.component';

export interface team {
  team_name: string;
  matches: number;
  wins: number;
  losses: number;
  ties: number;
  score: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  floatLabelControl = new FormControl("1");

  pageNo = 1;
  pageSize = "10";

  keyColumns: string[] = ['team_name', 'matches', 'wins', 'losses', 'ties', 'score'];
  displayedColumns: string[] = ['Teams', 'Matches', 'Wins', 'Losses', 'Ties', 'Scores'];
  dataSource = [];
  searchBy = '';
  sortBy = '';
  searchValue = '';

  constructor(private sharedService: SharedService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.sortBy = 'Score';
    this.searchBy = 'Name';
    this.searchValue = '';
    this.getTeamList();
  }

  getTeamList() {
    this.sharedService.getData("teams?pageNo=" + this.pageNo + "&pageSize=" + this.pageSize).subscribe((response: any) => {
      this.dataSource = response;
      console.log(response);
    });
  }



  search() {
    let query = '';
    this.openDialog('hi');
    if (this.searchValue == 'Score')
      query = '?score=' + this.searchBy;
    else if (this.searchValue == 'Name')
      query = '?name=' + this.searchBy
    this.sharedService.getData("teams" + query).subscribe((response: any) => {
      this.dataSource = response;
      console.log(response);
    });
  }

  getNext() {
    ++this.pageNo;
    this.getTeamList();
  }

  getPrevious() {
    if ((this.pageNo - 1) > 0) {
      --this.pageNo;
      this.getTeamList();
    }
  }

  openDialog(Msg): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '180px',
      data: {
        value: '',
        mode: 'message'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      dialogRef.afterClosed().subscribe(result => {
        result.action == 'addTeam' && this.addMatch(result.data);
      });
    });
  }
  openAddTeamDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '200px',
      data: {
        value: '',
        mode: 'addTeam'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result.action == 'addTeam' && this.addTeam(result.data);
    });
  }
  openAddMatchDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '400px',
      data: {
        value: '',
        mode: 'addMatch'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      result.action == 'addMatch' && this.addMatch(result.data);
    });
  }

  addTeam(data) {
    let input = data;
    this.sharedService.postData("team", input).subscribe(
      (response: any) => {
        console.log(response);
        this.getTeamList();
      });
  }
  addMatch(data) {
    let input = data;
    this.sharedService.patchData("pairteam", input).subscribe(
      (response: any) => {
        console.log(response);
        this.getTeamList();
      });
  }
  sort(value) {
    this.sortBy = value;
    if (value == 'Name')
      this.dataSource = [...this.dataSource.sort((a, b) => (a.team_name > b.team_name) ? 1 : ((b.team_name > a.team_name) ? -1 : 0))];
    else
      this.getTeamList();
  }

}
