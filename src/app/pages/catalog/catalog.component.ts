import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UNB_TV_CHANNEL_ID } from 'src/app/app.constant';
import { VideoService } from 'src/app/services/video.service';
import { Catalog } from 'src/shared/model/catalog.model';
import { IVideo } from 'src/shared/model/video.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  unbTvChannelId = UNB_TV_CHANNEL_ID;
  videosEduplay: IVideo[] = [];
  unbTvVideos: IVideo[] = [];
  catalog: Catalog = new Catalog();

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.videoService.findAll().subscribe({
      next: (data) => {
        this.videosEduplay = data.body?.videoList ?? [];
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.filterVideosByChannel(this.videosEduplay);
        this.videosCatalog(this.unbTvVideos);
      },
    });
  }

  filterVideosByChannel(videos: IVideo[]): void {
    videos.forEach((video) => {
      const channel = video?.channels;

      if (channel)
        if (channel[0].id === this.unbTvChannelId) this.unbTvVideos.push(video);
    });
  }

  videosCatalog(videos: IVideo[]): void {
    const keywordsCategories = [
      {
        keywords: ['fala, jovem'],
        category: this.catalog.journalism.falaJovem,
      },
      {
        keywords: ['informe unb'],
        category: this.catalog.journalism.informeUnB,
      },
      { keywords: ['zapping'], category: this.catalog.journalism.zapping },
      {
        keywords: ['brasil em questão'],
        category: this.catalog.interviews.brasilEmQuestao,
      },
      { keywords: ['diálogos'], category: this.catalog.interviews.dialogos },
      {
        keywords: ['tirando de letra'],
        category: this.catalog.interviews.tirandoDeLetra,
      },
      {
        keywords: ['entrevista'],
        category: this.catalog.interviews.entrevistas,
      },
      {
        keywords: ['vasto mundo'],
        category: this.catalog.interviews.vastoMundo,
      },
      {
        keywords: ['vozes diplomáticas'],
        category: this.catalog.interviews.vozesDiplomaticas,
      },
      {
        keywords: ['explique sua tese'],
        category: this.catalog.researchAndScience.expliqueSuaTese,
      },
      {
        keywords: ['fazendo ciência'],
        category: this.catalog.researchAndScience.fazendoCiencia,
      },
      {
        keywords: ['radar da extensão'],
        category: this.catalog.researchAndScience.radarDaExtencao,
      },
      {
        keywords: ['se liga no pas'],
        category: this.catalog.researchAndScience.seLigaNoPAS,
      },
      {
        keywords: ['unbtv ciência'],
        category: this.catalog.researchAndScience.unbTvCiencia,
      },
      {
        keywords: ['universidade pra quê?', 'universidade para quê?'],
        category: this.catalog.researchAndScience.universidadeParaQue,
      },
      {
        keywords: ['[em]cantos'],
        category: this.catalog.artAndCulture.emCantos,
      },
      {
        keywords: ['casa do som'],
        category: this.catalog.artAndCulture.casaDoSom,
      },
      { keywords: ['esboços'], category: this.catalog.artAndCulture.esbocos },
      {
        keywords: ['exclusiva'],
        category: this.catalog.artAndCulture.exclusiva,
      },
      {
        keywords: ['floresta de gente'],
        category: this.catalog.specialSeries.florestaDeGente,
      },
      {
        keywords: ['guia do calouro'],
        category: this.catalog.specialSeries.guiaDoCalouro,
      },
      {
        keywords: ['memórias sobre paulo freire'],
        category: this.catalog.specialSeries.memoriasPauloFreire,
      },
      {
        keywords: ['desafios das eleições'],
        category: this.catalog.specialSeries.desafiosDasEleicoes,
      },
      {
        keywords: ['vida de estudante'],
        category: this.catalog.specialSeries.vidaDeEstudante,
      },
      {
        keywords: ['arquitetura'],
        category: this.catalog.specialSeries.arquiteturaICC,
      },
      {
        keywords: [
          'mini doc',
          'cerrado de volta',
          'construção tradicional kalunga',
          'o muro',
          'um lugar para onde voltar',
          'vidas no cárcere',
        ],
        category: this.catalog.documentaries.miniDoc,
      },
      {
        keywords: [
          'documentários',
          'documentário',
          'quanto vale um terço?',
          'refazendo os caminhos de george gardner',
          'sem hora para chegar',
          'todas podem ser vitímas',
        ],
        category: this.catalog.documentaries.documentaries,
      },
      {
        keywords: ['pitadas do cerrado'],
        category: this.catalog.varieties.pitadasDoCerrado,
      },
    ];

    videos.forEach((video) => {
      const keywordsTitle = video?.title?.toLowerCase() ?? '';

      if (keywordsTitle) {
        const category = keywordsCategories.find((config) =>
          config.keywords.some((keyword) => keywordsTitle.includes(keyword))
        );

        if (category) {
          category.category.push(video);
        } else {
          this.catalog.unbtv.push(video);
        }
      }
    });
  }

  onProgramClick(videos: IVideo[]) {
    this.videoService.setVideosCatalog(videos);
    this.router.navigate(['/videos']);
  }
}
