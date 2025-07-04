document.addEventListener('DOMContentLoaded', function() {
  const codeSnippets = [
    'function transformBusiness() {',
    'const innovation = new DigitalSolution();',
    'class EnterpriseSystem extends React.Component {',
    'import { MachineLearning } from "@dom/core";',
    'export default function optimizeProcesses() {',
    'interface CloudArchitecture {',
    '// Digital transformation pipeline',
    'AI.train(dataset, { epochs: 100 });',
    'while(innovation) { deploySolution(); }',
    'var blockchain = new SecureNetwork();',
    'async function analyzeData() {',
    'machineLearning.predict(nextTendencies);',
    'constructor(apiKey) { this.blockchain = new Ethereum(); }',
    'const results = await bigData.query();',
    'type NeuralNetwork = { layers: number };',
    '-> Optimizing code execution...'
  ];

  const container = document.createElement('div');
  container.className = 'code-animation-container';
  document.getElementById('hero').appendChild(container);

  function createCodeLine() {
    const line = document.createElement('div');
    line.className = 'code-line';
    line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    
    const leftPos = Math.random() * 90;
    const animationDelay = Math.random() * -25;
    const fontSize = 1 + Math.random() * 0.5;
    
    line.style.left = `${leftPos}%`;
    line.style.animationDelay = `${animationDelay}s`;
    line.style.fontSize = `${fontSize}rem`;
    
    // Random faded colors
    const colors = ['rgba(0, 243, 255, 0.08)', 'rgba(0, 255, 136, 0.08)'];
    line.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    line.addEventListener('animationend', () => line.remove());
    
    return line;
  }

  // Start animation loop
  setInterval(() => {
    container.appendChild(createCodeLine());
  }, 3000);

  // Initial population
  for(let i = 0; i < 8; i++) {
    setTimeout(() => container.appendChild(createCodeLine()), i * 750);
  }
});