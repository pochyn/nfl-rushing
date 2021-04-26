import { fetchRushing } from '../utils/apiUtils'
import { getHeaders } from '../utils/utilHelper'
import { Machine, assign } from 'xstate'


export const nflRushingMachine = Machine({
    id: "nflRushing",
    initial: "loadData",
    context: {
      rushingData: [],
      error: undefined,
      filteredData: [],
    },
    states: {
      loadData: {
        invoke: {
          id: 'getRushing',
          src: () => fetchRushing(),
          onDone: {
            target: 'success',
            actions: assign({ rushingData: (context, event) => event.data, error: undefined })
          },
          onError: {
            target: 'failure',
            actions: assign({ error: (context, event) => event.data })
          }
        }
      },
      success: {
        on: {
          DOWNLOAD_DATA: {
            actions: 'downloadCSV',
          },
        },
      },
      failure: {
        on: {
          RETRY: 'loadData'
        }
      }
    },
   },
   {
    actions: {
      downloadCSV: (context, event) => {
        let headers = getHeaders()
        let csv = headers.join(',') + '\n';
        event.data.forEach(row => {
          headers.forEach(header => {
            csv += row[header]
            csv += ','
          })
          csv = csv.substring(0, csv.length - 1);
          csv += "\n";
        });

        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'nfl-rushing.csv';
        hiddenElement.click();
      },
    }
  });
