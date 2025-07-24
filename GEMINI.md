# Build a web app to show bus arrival time

## Introduction

To build a web app to show bus arrival time of the stops around a location picked by a user on a map.
Use with HTML 5, pure JS and CSS with minimal use of external library.

Project name is "Bus ETA Test", and version number is "v0.1".

## Open Data Source

- Stop List Data:
  https://data.gov.hk/en-data/dataset/hk-td-tis_21-etakmb/resource/3d6ded6c-ee36-40a0-a6fe-8f40966dff67
- Stop ETA Data:
  https://data.gov.hk/en-data/dataset/hk-td-tis_21-etakmb/resource/12185102-718d-4d03-bfd7-b9ecf760aee2

## User Interface

### Layout Description

- a map, displayed in 16:9, at the top
- a list of bus arrival time under the map

### Map

- Use the current location from the browser
- Zoom in a suitable scale that can see 2km area from the location
- User can click on the map to pick a new location
- Show the location of stops within 2km, each with marker
- User can click a marker representing a stop, to see the bus arrival time information

### Bus Arrival Time

- Show data only when a marker is chosen
- Display name, code, latitude, longtitude of the stop
- Display a list of routes with estimated arrival time


## Prepare Stop Data

1. Examine the web page of "Stop List Data"
2. Download the data through the "URL" on the web page as a file `stop-data.json`
3. Analyze the data structure of the JSON
2. Record the data structure in a file `stop-data.md` for your future reference

## Build Web App

- Create separate HTML, CSS and JS files; Each file name is "my-bus-test" with a suitable extension
- Use modern blueish style for the whole page
- Use the project name with version numebr as page title
- Implement the logic as described in the "User Interface" section


- 
