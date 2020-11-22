
// columns for admin table
export const columns = [
    { field: 'renterFirstName', headerName: 'First name', width: 150 },
    { field: 'renterLastName', headerName: 'Last name', width: 150 },
    {
      field: 'renterEmail',
      headerName: 'Email',
      width: 140,
    },
    {
      field: 'rentStart',
      headerName: 'Rent Start',
      width: 140,
    },
    {
      field: 'returnDate',
      headerName: 'Return Date',
      width: 140,
    },
    {
        field: 'returned',
        headerName: 'Return Status',
        type: 'boolean',
        width: 140
    }
  ];

  export const sortModel = [
    {
      field: 'rentStart',
      sort: 'asc',
    },
  ];

  const sortingOrder = ['asc', 'desc', null];
