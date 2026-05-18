const urlSCB =
  'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/BE/BE0101/BE0101A/BefolkningNy';

const querySCB = {
  query: [
    {
      code: 'Region',
      selection: {
        filter: 'vs:RegionLän07',
        values: [
          '01', '03', '04', '05', '06', '07', '08',
          '09', '10', '12', '13', '14', '17', '18',
          '19', '20', '21', '22', '23', '24', '25'
        ]
      }
    },
    {
      code: 'ContentsCode',
      selection: {
        filter: 'item',
        values: ['BE0101N1']
      }
    },
    {
      code: 'Tid',
      selection: {
        filter: 'item',
        values: ['2018', '2019', '2020', '2021', '2022', '2023', '2024']
      }
    }
  ],
  response: {
    format: 'JSON'
  }
};

const requestSCB = new Request(urlSCB, {
  method: 'POST',
  body: JSON.stringify(querySCB)
});

fetch(requestSCB)
  .then((response) => response.json())
  .then((data) => printSCBChart(data))
  .catch((error) => console.log(error));

function printSCBChart(dataSCB) {
  console.log(dataSCB);
  console.log('script fungerar');

  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const countyNames = {
    '01': 'Stockholms län',
    '03': 'Uppsala län',
    '04': 'Södermanlands län',
    '05': 'Östergötlands län',
    '06': 'Jönköpings län',
    '07': 'Kronobergs län',
    '08': 'Kalmar län',
    '09': 'Gotlands län',
    '10': 'Blekinge län',
    '12': 'Skåne län',
    '13': 'Hallands län',
    '14': 'Västra Götalands län',
    '17': 'Värmlands län',
    '18': 'Örebro län',
    '19': 'Västmanlands län',
    '20': 'Dalarnas län',
    '21': 'Gävleborgs län',
    '22': 'Västernorrlands län',
    '23': 'Jämtlands län',
    '24': 'Västerbottens län',
    '25': 'Norrbottens län'
  };
 

  const countyCodes = Object.keys(countyNames);

  const datasets = countyCodes.map((countyCode) => {
    const countyData = dataSCB.data.filter(
      (object) => object.key[0] === countyCode
    );

    return {
      label: countyNames[countyCode],
      data: countyData.map((object) => Number(object.values[0])),
    };
  });

  new Chart(document.getElementById('scb'), {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Befolkningsutveckling per län 2018–2024'
        },
        legend: {
          position: 'right'
        }
      },
    }
  });
}
const urlSJV =
  'https://statistik.sjv.se/PXWeb/api/v1/sv/Jordbruksverkets%20statistikdatabas/Arealer/1%20Riket%20l%C3%A4n%20kommun/JO0104B1.px';

const querySJV = {
  query: [
    {
      code: 'Län',
      selection: {
        filter: 'item',
        values: [
          '1', '2', '3', '4', '5', '6', '7',
          '8', '9', '11', '13', '14', '18',
          '19', '20', '21', '22', '23', '24',
          '25'
        ]
      }
    },
    {
      code: 'Gröda',
      selection: {
        filter: 'item',
        values: ['0']
      }
    },
    {
      code: 'Variabel',
      selection: {
        filter: 'item',
        values: ['0']
      }
    },
    {
      code: 'År',
      selection: {
        filter: 'item',
        values: ['37', '38', '39', '40', '41', '42', '43']
      }
    }
  ],
  response: {
    format: 'JSON'
  }
};

const requestSJV = new Request(urlSJV, {
  method: 'POST',
  body: JSON.stringify(querySJV)
});

fetch(requestSJV)
  .then((response) => response.json())
  .then((data) => printSJVChart(data))
  .catch((error) => console.log(error));

function printSJVChart(dataSJV) {
  console.log(dataSJV);

  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const countyNames = {
    '1': 'Stockholms län',
    '2': 'Uppsala län',
    '3': 'Södermanlands län',
    '4': 'Östergötlands län',
    '5': 'Jönköpings län',
    '6': 'Kronobergs län',
    '7': 'Kalmar län',
    '8': 'Gotlands län',
    '9': 'Blekinge län',
    '11': 'Skåne län',
    '13': 'Hallands län',
    '14': 'Västra Götalands län',
    '17': 'Värmlands län',
    '18': 'Örebro län',
    '19': 'Västmanlands län',
    '20': 'Dalarnas län',
    '21': 'Gävleborgs län',
    '22': 'Västernorrlands län',
    '23': 'Jämtlands län',
    '24': 'Västerbottens län',
    '25': 'Norrbottens län'
  };

  const countyCodes = Object.keys(countyNames);

  const datasets = countyCodes.map((countyCode) => {
    const countyData = dataSJV.data.filter(
      (object) => object.key[0] === countyCode
    );

    return {
      label: countyNames[countyCode],
      data: countyData.map((object) => Number(object.values[0]))
    };
  });

  new Chart(document.getElementById('sjv'), {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Jordbruksareal per län 2018–2024'
        },
        legend: {
          position: 'right'
        }
      }
    }
  });
}
const urlSkord =
  'https://statistik.sjv.se/PXWeb/api/v1/sv/Jordbruksverkets%20statistikdatabas/Skordar/JO0601J01.px';

const querySkord = {
  query: [
    {
      code: 'Län',
      selection: {
        filter: 'item',
        values: [
          '1', '2', '3', '4', '5', '6', '7',
          '8', '9', '11', '13', '14','17', '18',
          '19', '20', '21', '22', '23', '24',
          '25', '26'
        ]
      }
    },
    {
      code: 'Gröda',
      selection: {
        filter: 'item',
        values: ['11']
      }
    },
    {
      code: 'Variabel',
      selection: {
        filter: 'item',
        values: ['3']
      }
    },
    {
      code: 'Tabelluppgift',
      selection: {
        filter: 'item',
        values: ['0']
      }
    },
    {
      code: 'År',
      selection: {
        filter: 'item',
        values: ['53', '54', '55', '56', '57', '58', '59']
      }
    }
  ],
  response: {
    format: 'JSON'
  }
};

const requestSkord = new Request(urlSkord, {
  method: 'POST',
  body: JSON.stringify(querySkord)
});

fetch(requestSkord)
  .then((response) => response.json())
  .then((data) => printSkordChart(data))
  .catch((error) => console.log(error));

function printSkordChart(dataSkord) {
  console.log(dataSkord);

  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const countyNames = {
    '1': 'Stockholms län',
    '2': 'Uppsala län',
    '3': 'Södermanlands län',
    '4': 'Östergötlands län',
    '5': 'Jönköpings län',
    '6': 'Kronobergs län',
    '7': 'Kalmar län',
    '8': 'Gotlands län',
    '9': 'Blekinge län',
    '11': 'Skåne län',
    '13': 'Hallands län',
    '14': 'Västra Götalands län',
    '17': 'Värmlands län',
    '18': 'Örebro län',
    '19': 'Västmanlands län',
    '20': 'Dalarnas län',
    '21': 'Gävleborgs län',
    '22': 'Västernorrlands län',
    '23': 'Jämtlands län',
    '24': 'Västerbottens län',
    '25': 'Norrbottens län'
  };

  const countyCodes = Object.keys(countyNames);

  const datasets = countyCodes.map((countyCode) => {
    const countyData = dataSkord.data.filter(
      (object) => object.key[0] === countyCode
    );

    return {
      label: countyNames[countyCode],
      data: countyData.map((object) => Number(object.values[0]))
    };
  });

  new Chart(document.getElementById('skord'), {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Skörd per län 2018–2024'
        },
        legend: {
          position: 'right'
        }
      }
    }
  });
}
const urlSlakt =
  'https://statistik.sjv.se/PXWeb/api/v1/sv/Jordbruksverkets%20statistikdatabas/Animalieproduktion/Slakt/JO0604B1.px';

const querySlakt = {
  query: [
    {
      code: 'Län',
      selection: {
        filter: 'item',
        values: [
          '1', '2', '3', '4', '5', '6', '7',
          '8', '9', '10', '11', '12', '13',
          '14', '15', '16', '17', '18', '19',
          '20', '21'
        ]
      }
    },
    {
      code: 'Djurslag',
      selection: {
        filter: 'item',
        values: ['10', '11', '12', '18', '22']
      }
    },
    {
      code: 'Variabel',
      selection: {
        filter: 'item',
        values: ['1']
      }
    },
    {
      code: 'År',
      selection: {
        filter: 'item',
        values: ['2', '3', '4', '5', '6', '7', '8']
      }
    }
  ],
  response: {
    format: 'JSON'
  }
};

const requestSlakt = new Request(urlSlakt, {
  method: 'POST',
  body: JSON.stringify(querySlakt)
});

fetch(requestSlakt)
  .then((response) => response.json())
  .then((data) => printSlaktChart(data))
  .catch((error) => console.log(error));

function printSlaktChart(dataSlakt) {
  console.log(dataSlakt);

  const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];

  const yearCodes = ['2', '3', '4', '5', '6', '7', '8'];

    const countyNames = {
        '1': 'Stockholms län',
        '2': 'Uppsala län',
        '3': 'Södermanlands län',
        '4': 'Östergötlands län',
        '5': 'Jönköpings län',
        '6': 'Kronobergs län',
        '7': 'Kalmar län',
        '8': 'Gotlands län',
        '9': 'Blekinge län',
        '10': 'Skåne län',
        '11': 'Hallands län',
        '12': 'Västra Götalands län',
        '13': 'Värmlands län',
        '14': 'Örebro län',
        '15': 'Västmanlands län',
        '16': 'Dalarnas län',
        '17': 'Gävleborgs län',
        '18': 'Västernorrlands län',
        '19': 'Jämtlands län',
        '20': 'Västerbottens län',
        '21': 'Norrbottens län'
    };

  const countyCodes = Object.keys(countyNames);

  const datasets = countyCodes.map((countyCode) => {
    const totalPerYear = yearCodes.map((yearCode) => {
      const rowsForCountyAndYear = dataSlakt.data.filter(
        (object) =>
          object.key[0] === countyCode &&
          object.key[2] === yearCode
      );

      const total = rowsForCountyAndYear.reduce((sum, object) => {
        return sum + Number(object.values[0]);
      }, 0);

      return total;
    });

    return {
      label: countyNames[countyCode],
      data: totalPerYear
    };
  });

  new Chart(document.getElementById('slakt'), {
    type: 'line',
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Totalt antal slaktade djur per län 2018–2024'
        },
        legend: {
          position: 'right'
        }
      }
    }
  });
}
