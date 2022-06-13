import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  tabs: { select: boolean; label: string }[] = [
    {
      select: true,
      label: 'Revision',
    },
    {
      select: false,
      label: 'Evaluacion',
    },
    {
      select: false,
      label: 'Back office',
    },
  ];

  indices: { select: boolean; label: string }[] = [
    {
      label: '1',
      select: true,
    },
    {
      label: '2',
      select: false,
    },
    {
      label: '3',
      select: false,
    },
  ];

  groups: any[] = [
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
    {
      members: 6,
      title: 'Las chicas superpoderosas y bellas',
      totalMount: 12000,
      asesor: 'WUAGNER ANTONNY NAVARRO JUSTO',
      agency: 'HUACHIPA',
      devolutions: 1,
      sendDate: '23-05-22, 10:34',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
