import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Vehicle, VehicleService } from '../vehicle.service';

@Component({ selector: 'app-sidenav', standalone: true, imports: [CommonModule, MatSidenavModule, MatListModule], templateUrl: './sidenav.component.html', styleUrls: ['./sidenav.component.css'] })
export class SidenavComponent {
  readonly vehicles = this.vehicleService.vehicles;
  selectedVehicle: Vehicle | null = null;
  constructor(private readonly vehicleService: VehicleService) { this.vehicleService.selectedVehicle$.subscribe(vehicle => this.selectedVehicle = vehicle); }
  select(vehicle: Vehicle): void { this.vehicleService.selectVehicle(vehicle); }
}


