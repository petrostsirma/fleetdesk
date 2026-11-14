import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import vehiclesData from '../assets/vehicles.json';

export interface Vehicle { id: number; plate: string; }

@Injectable({ providedIn: 'root' })
export class VehicleService {
  readonly vehicles: Vehicle[] = vehiclesData;
  private readonly selectedVehicleSubject = new BehaviorSubject<Vehicle | null>(this.vehicles[0] ?? null);
  readonly selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  selectVehicle(vehicle: Vehicle): void { this.selectedVehicleSubject.next(vehicle); }
}
