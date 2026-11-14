import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  selectedVehiclePlate: string | null = null;

  constructor(private vehicleService: VehicleService) {
    this.vehicleService.selectedVehicle$.subscribe(vehicle => {
      this.selectedVehiclePlate = vehicle?.plate || null;
    });
  }
}
