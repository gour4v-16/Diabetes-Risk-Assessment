const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\antiGravityProjects\\\\Diabetes-Risk-Assessment-Platform\\\\src\\\\components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We have things like: text-[#1A1A1A] dark:text-[#1A1A1A] dark:text-white
  // Just use simple replaceAll
  content = content.replaceAll('text-[#1A1A1A] dark:text-[#1A1A1A] dark:text-white', 'text-[#1A1A1A] dark:text-white');
  content = content.replaceAll('text-[#2A2A2A] dark:text-[#2A2A2A] dark:text-[#F5F5F5]', 'text-[#2A2A2A] dark:text-[#F5F5F5]');
  content = content.replaceAll('text-[#2A2A2A] dark:text-[#F5F5F5] dark:text-white', 'text-[#2A2A2A] dark:text-[#F5F5F5]');
  content = content.replaceAll('text-[#1A1A1A] dark:text-[#2A2A2A] dark:text-[#F5F5F5]', 'text-[#1A1A1A] dark:text-[#F5F5F5]');

  fs.writeFileSync(filePath, content);
});
console.log('Cleanup done');
