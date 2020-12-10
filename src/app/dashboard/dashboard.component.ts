import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { MatDialog } from '@angular/material/dialog';
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

  pageNo = 1;
  pageSize = "10";

  keyColumns: string[] = ['team_name', 'matches', 'wins', 'losses', 'ties', 'score'];
  displayedColumns: string[] = ['Teams', 'Matches', 'Wins', 'Losses', 'Ties', 'Scores'];
  dataSource = [];
  searchInput = '';
  sortBy = [
    { value: 'name', viewValue: 'Teams' },
    { value: 'score', viewValue: 'Scores' }
  ];
  sortValue = '';
  searchBy = [
    { value: 'name', viewValue: 'Team' },
    { value: 'score', viewValue: 'Score' }
  ];
  searchValue = '';

  constructor(private sharedService: SharedService, private dialog: MatDialog,) { }


  ngOnInit(): void {
    this.sortValue = 'score';
    this.searchValue = 'name';
    this.searchInput = '';
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
    if (this.searchValue == 'score')
      query = '?score=' + this.searchInput;
    else if (this.searchValue == 'name')
      query = '?name=' + this.searchInput
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
    if ((this.pageNo - 1) > 1) {
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
      //if (result.action == 'addMatch')
    });
  }

  addTeam(data) {
    let input = data;
    this.sharedService.postData("team", input).subscribe(
      (response: any) => {
        console.log(response);
      });
  }
  addMatch(data) {
    let input = data;
    this.sharedService.patchData("pairteam", input).subscribe(
      (response: any) => {
        console.log(response);
      });
  }

}
