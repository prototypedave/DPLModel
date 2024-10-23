const data = [
    {
      name: 'Brandenburg A',
      N: 52.61,
      S: 52.33, 
      E: 13.91, 
      W: 14.33,
      coordinates : [
        { lat: 52.878, lng: 13.939 },
        { lat: 52.878, lng: 14.356 },
        { lat: 52.594, lng: 14.356 }, 
        { lat: 52.594, lng: 13.939 }, 
      ],
      file: "brandenburg1.tif",
      areas: [
        { name: "Area 1", file:"B1D.tif", sub: "52.60° N, 52.54° S, 14.26° E, 14.18° W", coords: [{ lat: 52.60, lng: 14.18 }, { lat: 52.60, lng: 14.263 }, { lat: 52.543, lng: 14.263 }, { lat: 52.543, lng: 14.18 },]},
        { name: "Area 2", file:"B2A.tif", sub: "52.56° N, 52.50° S, 13.99° E, 13.91° W", coords: [{ lat: 52.555, lng: 13.91 }, { lat: 52.555, lng: 13.993 }, { lat: 52.499, lng: 13.993 }, { lat: 52.499, lng: 13.91 }] },
        { name: "Area 3", file:"B5C.tif", sub: "52.39° N, 52.33° S, 14.15° E, 14.07° W", coords: [{ lat: 52.388, lng: 14.071 }, { lat: 52.388, lng: 14.154 }, { lat: 52.331, lng: 14.154 }, { lat: 52.331, lng: 14.071 }] },
        { name: "Area 4", file:"B4E.tif", sub: "52.44° N, 52.38° S, 14.34° E, 14.25° W", coords: [{ lat: 52.436, lng: 14.253 }, { lat: 52.436, lng: 14.335 }, { lat: 52.379, lng:  14.335 }, { lat: 52.379, lng: 14.253 }] },
        { name: "Area 5", file:"B3B.tif", sub: "52.50° N, 52.44° S, 14.08° E, 13.99° W", coords: [{ lat: 52.499, lng: 13.993 }, { lat: 52.499, lng: 14.076 }, { lat: 52.442, lng: 14.076 }, { lat: 52.442, lng: 13.993 }] },
      ]
    },
    {
        name: 'Brandenburg B',
        N: 52.88,
        S: 52.59, 
        E: 13.94, 
        W: 14.36,
        coordinates : [
          { lat: 52.878, lng: 13.939 },
          { lat: 52.878, lng: 14.356 },
          { lat: 52.594, lng: 14.356 }, 
          { lat: 52.594, lng: 13.939 }, 
        ],
        file: "brandenburg2.tif",
        areas: [
          { name: "Area 2", file:"B2A.tif", sub: "52.81° N, 52.76° S, 14.37° E, 14.29° W", coords: [{ lat: 52.812, lng: 14.289 }, { lat: 52.812, lng: 14.372 }, { lat: 52.755, lng: 14.372 }, { lat: 52.755, lng: 14.289 }] },
          { name: "Area 3", file:"B5C.tif", sub: "52.76° N, 52.71° S, 14.28° E, 14.2° W", coords: [{ lat: 52.762, lng: 14.195 }, { lat: 52.762, lng: 14.278 }, { lat: 52.705, lng: 14.278 }, { lat: 52.705, lng: 14.195 }] },
          { name: "Area 4", file:"B4E.tif", sub: "52.71° N, 52.66° S, 14.10° E, 14.01° W", coords: [{ lat: 52.714, lng: 14.013 }, { lat: 52.714, lng: 14.096 }, { lat: 52.657, lng:  14.096 }, { lat: 52.657, lng: 14.013 }] },
          { name: "Area 5", file:"B3B.tif", sub: "52.66° N, 52.61° S, 14.00° E, 13.92° W", coords: [{ lat: 52.663, lng: 13.919 }, { lat: 52.663, lng: 14.003 }, { lat: 52.606, lng: 14.003 }, { lat: 52.606, lng: 13.919 }] },
        ]
    },
    {
      name: 'Altona',
      N: 53.755,
      S: 9.925,
      E: 53.478,
      W: 10.377,
      coordinates : [
        { lat: 53.755, lng: 9.925 },
        { lat: 53.755, lng: 10.377 },
        { lat: 53.478, lng: 10.377 }, 
        { lat: 53.478, lng: 9.925 }, 
      ],
      file: "altona.tif",
      areas: [
        { name: "Area 1", file:"A4A.tif", sub: "53.59° N, 53.54° S, 10.01° E, 9.92° W", coords: [{ lat: 53.591, lng: 9.920 }, { lat: 53.591, lng: 10.013 }, { lat: 53.537, lng: 10.013 }, { lat: 53.537, lng: 9.920 },]},
        { name: "Area 2", file:"A3C.tif", sub: "53.64° N, 53.59° S, 10.20° E, 10.11° W", coords: [{ lat: 53.644, lng: 10.105 }, { lat: 53.644, lng: 10.198 }, { lat: 53.59, lng: 10.198 }, { lat: 53.59, lng: 10.105 }] },
        { name: "Area 3", file:"A5D.tif", sub: "53.53° N, 53.48° S, 10.29° E, 10.19° W", coords: [{ lat: 53.534, lng: 10.194 }, { lat: 53.534, lng: 10.287 }, { lat: 53.480, lng: 10.287 }, { lat: 53.480, lng: 10.194 }] },
      ]
    },
];

export default data;