import styled from 'styled-components'

export const getHeaders = () => {
  return ['Player', '1st', '1st%', '20+', '40+', 'Att',
          'Att/G', 'Avg', 'FUM', 'Lng', 'Pos', 'TD', 'Team',
          'Yds', 'Yds/G']
}

const rowsToSort = () => ['Yds', 'Lng', 'TD']

export const getColumns = () => 
  [
    {
      Header: 'NFL RUSHING',
      columns: getHeaders().map(header => {
        return {
          Header: header,
          accessor: header,
          disableSortBy: !rowsToSort().includes(header),
          width: header === 'Player' ? 150 : 85,
        }
      })
    },
  ]

export const tableStyle = () =>  styled.div`
    padding: 1rem;

    .table {
      display: inline-block;
      border-spacing: 0;
      border: 1px solid black;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;


      :last-child {
        border-right: 1px solid black;
      }
    }

    .th {
      border-right: 0px solid black;
    }
  }
`


export const inputStyle = () =>  styled.div`
    position: fixed;
    left: 0;
    padding-left: 1rem;
`

export const buttonStyle = () =>  styled.span`
    margin-left: 20px;
`