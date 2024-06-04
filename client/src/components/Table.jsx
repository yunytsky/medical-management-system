import React, { useEffect, useState } from 'react';

const Table = ({ data }) => {
    const [headers, setHeaders] = useState(null);
    const [rows, setRows] = useState(null);

  useEffect(() => {
    if(!data || data.length == 0 ){
        return
    }else{
        //Headers and rows
        const h = Object.keys(data[0]);
        const r = data.map(item => Object.values(item));

        setHeaders(h);
        setRows(r);

    }
  }, [data])
  return (
    <>
      {data && data.length > 0 && headers && rows && (
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;