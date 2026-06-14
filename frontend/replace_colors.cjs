const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\antiGravityProjects\\\\Diabetes-Risk-Assessment-Platform\\\\src\\\\components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace secondary text
  content = content.replace(/text-gray-500 dark:text-gray-400/g, 'text-[#6B7280] dark:text-[#A1A1AA]');
  content = content.replace(/text-gray-400(?!\w)(?! dark:)/g, 'text-[#6B7280] dark:text-[#A1A1AA]');
  content = content.replace(/text-gray-500(?!\w)(?! dark:)/g, 'text-[#6B7280] dark:text-[#A1A1AA]');
  content = content.replace(/text-gray-600 dark:text-gray-300/g, 'text-[#6B7280] dark:text-[#A1A1AA]');

  // Replace headings vs primary text based on tags.
  // For h1, h2, h3, h4, h5, h6
  content = content.replace(/(<h[1-6][^>]*className="[^"]*)text-primary-dark dark:text-white/g, '$1text-[#1A1A1A] dark:text-white');
  content = content.replace(/(<h[1-6][^>]*className="[^"]*)text-white/g, '$1text-[#1A1A1A] dark:text-white');

  // For other tags (div, p, span), text-primary-dark dark:text-white becomes primary text
  content = content.replace(/(<(?:div|p|span|label)[^>]*className="[^"]*)text-primary-dark dark:text-white/g, '$1text-[#2A2A2A] dark:text-[#F5F5F5]');
  
  // Hardcoded text-white in div, p, span
  content = content.replace(/(<(?:div|p|span|label)[^>]*className="[^"]*)text-white(?!\w)(?! dark:)/g, '$1text-[#2A2A2A] dark:text-[#F5F5F5]');

  fs.writeFileSync(filePath, content);
});
console.log('Done replacements');
