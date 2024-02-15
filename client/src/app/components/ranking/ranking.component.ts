import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { CommonModule } from '@angular/common';
//imports angular materials
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnInit {
  rankingData: { userName: string; correctAnswersCount: number }[] = [];

  constructor(private rankingService: RankingService) {}

  ngOnInit(): void {
    this.rankingData = this.rankingService.getRanking();
  }
}
