# FleetDesk – Vehicle Document Management

FleetDesk is a web application built with Angular for managing and reviewing vehicle documents and receipts.

The application allows users to select a vehicle, view its associated records and search through them using different filters. All data is stored locally in JSON files, so no backend or API is required.

## Features

- Vehicle selection through a sidebar.
- Display of records belonging to the selected vehicle.
- Search by serial number, driver, date range and approval status.
- Combination of multiple search filters.
- Angular Material data table with pagination.
- Visual distinction between approved and cancelled documents.
- Responsive layout for different screen sizes.

## Technologies

- Angular 18
- TypeScript
- Angular Material
- RxJS
- Reactive Forms
- HTML and CSS
- JSON local data files

## Project structure

The application is separated into components responsible for vehicle navigation, the toolbar and document search.
A shared VehicleService handles the selected vehicle and allows the relevant components to stay synchronized.
The search component handles the filters and displays the records associated with the currently selected vehicle.

## Data

The application uses three local JSON files:

- `vehicles.json` – available vehicles.
- `drivers.json` – available drivers.
- `records.json` – vehicle document records.

No backend connection is needed.

## Getting started

Requirements: Node.js and npm.

Clone the repository and run:

```bash
npm install
npm start
```

Open http://localhost:4200/ in your browser.

## Build

To create a production build:

```bash
npm run build
```

Production files are generated in the `dist/` directory.

## About

This project was developed as an Angular application to practice component-based architecture, services, data filtering, Angular Material and communication between components.