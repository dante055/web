import React from 'react';
import Person from './Person';

function NameList() {
  const names = ['dante', 'vergil', 'darth vader', 'dark prince'];
  const persons = [
    {
      id: 1,
      name: 'Dante',
      skill: 'Sord Master',
    },
    {
      id: 2,
      name: 'Darth Vader',
      skill: 'Taunt Master',
    },
    {
      id: 3,
      name: 'Dark Prince',
      skill: 'Sniper',
    },
    {
      id: 4,
      name: 'Thanos',
      skill: 'Snake',
    },
  ];

  //   return (
  //     <div>
  //       {names.map((name) => (
  //         <div>
  //           <h1>{name}</h1>
  //           <p>hi {name}</p>
  //         </div>
  //       ))}
  //     </div>
  //   );

  //   const nameList = names.map((name) => (
  //     <div>
  //       <h1>{name}</h1>
  //       <p>hi {name}</p>
  //     </div>
  //   ));
  const nameList = names.map((name, index) => (
    <div key={index}>
      <p>hi {name}</p>
    </div>
  ));

  const personList = persons.map((person) => (
    <Person key={person.id} person={person} />
  ));

  return <div>{nameList}</div>;
  //   return <div>{personList}</div>;
}

export default NameList;
