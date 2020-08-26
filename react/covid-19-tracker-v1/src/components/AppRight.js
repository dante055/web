import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import Table from './Table';
import LineGraph from './LineGraph';

function AppRight({ tableData, getCountryData }) {
  return (
    <div className='appRight'>
      <Card>
        <CardContent>
          <Table countries={tableData} getCountryData={getCountryData} />
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default AppRight;
