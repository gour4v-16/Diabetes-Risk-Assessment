const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\antiGravityProjects\\\\Diabetes-Risk-Assessment-Platform\\\\src\\\\components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace hardcoded fills for chart labels
  // tick={{ fontSize: 12, fill: '#888' }} -> tick={{ fontSize: 12, fill: !darkMode ? '#6B7280' : '#A1A1AA' }}
  // We need to match variations of tick={{ ... fill: '#888' }}
  content = content.replace(/fill:\s*'#888'/g, "fill: !darkMode ? '#6B7280' : '#A1A1AA'");
  
  // also check stroke="#333" for CartesianGrid
  content = content.replace(/stroke="#333"/g, 'stroke={!darkMode ? "#E5E7EB" : "#333"}');

  fs.writeFileSync(filePath, content);
});
console.log('Charts fixed');
