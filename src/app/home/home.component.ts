import { Component, OnInit } from '@angular/core';
import { ApiService } from '../digimon.service';

const BASE_URL = 'https://digi-api.com';

interface Digimon {
  name: string;
  images: { href: string }[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  digimons: Digimon[] = [];
  legendaryDigimon?: Digimon;
  adventureDigimon?: Digimon;
  trainerDigimon?: Digimon;

  constructor(private digimonService: DigimonService) {}

  ngOnInit(): void {
    this.loadDigimons();
    this.getLegendaryDigimon();
    this.getAdventureDigimon();
    this.getTrainerDigimon();
  }

  loadDigimons(): void {
    this.digimonService.getDigimons().subscribe((data: Digimon[]) => {
      this.digimons = data.map((d: Digimon) => ({
        ...d,
        images: d.images?.length ? d.images.map((img: { href: string }) => ({ href: BASE_URL + img.href })) : []
      }));
      console.log('Digimons cargados:', this.digimons);
    });
  }

  getLegendaryDigimon(): void {
    this.digimonService.getDigimonByName('Omnimon').subscribe((data: Digimon) => {
      this.legendaryDigimon = this.processDigimonImage(data);
    });
  }

  getAdventureDigimon(): void {
    this.digimonService.getDigimonByName('WarGreymon').subscribe((data: Digimon) => {
      this.adventureDigimon = this.processDigimonImage(data);
    });
  }

  getTrainerDigimon(): void {
    this.digimonService.getDigimonByName('MetalGarurumon').subscribe((data: Digimon) => {
      this.trainerDigimon = this.processDigimonImage(data);
    });
  }

  private processDigimonImage(digimon: Digimon): Digimon {
    return {
      ...digimon,
      images: digimon.images?.length ? digimon.images.map((img: { href: string }) => ({ href: BASE_URL + img.href })) : []
    };
  }
}
