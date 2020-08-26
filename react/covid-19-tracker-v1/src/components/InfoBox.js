import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@material-ui/core';
import { CaseTypeContext } from '../App';
import { ActiveContext } from './Stats';
import numeral from 'numeral';

const activeColor = {
  cases: {
    hex: '#0000FF',
    rgba: 'rgba(0,0,255, 0.5)',
  },
  recovered: {
    hex: '#7dd71d',
    rgba: 'rgba(125, 215, 29, 0.5)',
  },
  deaths: {
    hex: '#CC1034',
    rgba: 'rgba(204, 16, 52, 0.5)',
  },
};

function InfoBox({ title, cases, total, caseType }) {
  const { caseTypeDispatch } = useContext(CaseTypeContext);
  const { active, activeDispatch } = useContext(ActiveContext);

  return (
    <Card
      className={`infoBox ${active && 'infoBox--selected'}`}
      style={{
        borderTop: `${
          caseType === active ? `10px solid ${activeColor[caseType].hex}` : 0
        }`,
      }}
    >
      <CardActionArea
        onClick={() => {
          caseTypeDispatch({ type: 'SET_CASETYPE', value: caseType });
          activeDispatch({ type: 'SET_ACTIVE', value: caseType });
        }}
      >
        <CardContent>
          <Typography className='infoBox__title' color='textSecondary'>
            {title}
          </Typography>
          <Typography
            className='infoBox__cases'
            color='textSecondary'
            style={{ color: `${activeColor[caseType].hex}` }}
          >
            {cases ? `+${numeral(cases).format('0.0a')}` : '+0'}
          </Typography>
          <Typography className='infoBox__total' color='textSecondary'>
            {numeral(total).format('0,0')} Total
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default InfoBox;
