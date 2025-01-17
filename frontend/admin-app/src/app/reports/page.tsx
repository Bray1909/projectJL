'use client';

import React, { useEffect, useState } from 'react';

interface Report {
  processedAt: string;
  moneyWeek: number;
  id: number;
  name: string;
  rating: number;
  platform: string;
}

const ReportsPage = () => {
  const [data, setData] = useState<Report[]>([]);
  const [totalMoneyWeek, setTotalMoneyWeek] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          'https://chp7rfq8li.execute-api.us-east-2.amazonaws.com/dev/processed-data'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const reports = await response.json();
        const parsedData = JSON.parse(reports.body);
        setData(parsedData);

        const total = parsedData.reduce(
          (sum: number, report: Report) => sum + report.moneyWeek,
          0
        );
        setTotalMoneyWeek(total);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Weekly Reports</h1>
      <p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
        Total Money Generated This Week: ${totalMoneyWeek.toFixed(2)}
      </p>
      <table
        border={1}
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', color : 'black' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Platform</th>
            <th style={{ padding: '10px' }}>Rating</th>
            <th style={{ padding: '10px' }}>Money Week</th>
            <th style={{ padding: '10px' }}>Processed At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((report) => (
            <tr key={report.id}>
              <td style={{ padding: '10px' }}>{report.id}</td>
              <td style={{ padding: '10px' }}>{report.name}</td>
              <td style={{ padding: '10px' }}>{report.platform}</td>
              <td style={{ padding: '10px' }}>{report.rating}</td>
              <td style={{ padding: '10px' }}>${report.moneyWeek.toFixed(2)}</td>
              <td style={{ padding: '10px' }}>
                {new Date(report.processedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;