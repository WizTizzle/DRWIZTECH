import React from 'react';

export function CommonIssues() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Common RAID Issues We Solve</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-3">Hardware Failures</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Multiple drive failures</li>
            <li>Controller card failures</li>
            <li>Power supply issues</li>
            <li>Backplane problems</li>
            <li>Physical drive damage</li>
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-3">Software/Configuration Issues</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Failed RAID rebuilds</li>
            <li>Accidental array deletion</li>
            <li>Corrupted RAID configuration</li>
            <li>Operating system failures</li>
            <li>Firmware problems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}