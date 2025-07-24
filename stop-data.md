
# Stop Data Structure

The `stop-data.json` file contains a JSON object with the following structure:

```json
{
  "type": "StopList",
  "version": "1.0",
  "generated_timestamp": "2025-07-24T12:31:07+08:00",
  "data": [
    {
      "stop": "18492910339410B1",
      "name_en": "CHUK YUEN ESTATE BUS TERMINUS (WT916)",
      "name_tc": "竹園邨總站 (WT916)",
      "name_sc": "竹园邨总站 (WT916)",
      "lat": "22.345415",
      "long": "114.192640"
    }
  ]
}
```

The `data` property is an array of stop objects, each with the following properties:

- `stop`: A unique identifier for the stop.
- `name_en`: The English name of the stop.
- `name_tc`: The Traditional Chinese name of the stop.
- `name_sc`: The Simplified Chinese name of the stop.
- `lat`: The latitude of the stop.
- `long`: The longitude of the stop.
