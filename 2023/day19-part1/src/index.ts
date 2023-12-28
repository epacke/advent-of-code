import {input, simpleInput } from './input'

interface Part {
  x?: number,
  m?: number,
  a?: number,
  s?: number,
}

class Workflow {

  id: string;
  flows: { partId: keyof(Part), qualityLimit: number, destination: string, operator: string}[];
  default: string;

  constructor(workflow) {
    const [ id, rest ] = workflow.split('{');
    const flows = rest.split(/[,}]/g);
    flows.pop();
    this.id = id;
    this.default = flows.pop();
    this.flows = flows.map(f => {
      const [partId, quality, destination] = f.split(/[<>:]/g);
      const operator = f[1];
      return {
        partId, qualityLimit: parseInt(quality), destination, operator
      }
    });
  }

  analyze(p: Part){
    for(const flow of this.flows){
      const { partId, qualityLimit, destination, operator } = flow;
      const quality = p[partId];
      if(!quality) continue
      if(operator === '<' && quality < qualityLimit) return destination;
      if(operator === '>' && quality > qualityLimit) return destination;
    }
    return this.default;
  }

}

const [ workFlowStr, partsStr ]= input.trim().split(/\n\n/);
const workFlows: {[key: string]: Workflow} = {}

workFlowStr.split('\n').forEach(wfStr => {
  const wf = new Workflow(wfStr);
  workFlows[wf.id] = wf;
})

const parts = partsStr.split('\n').map(p =>{
  let part: Part = {}
  p.replace(/[{}]/g, '').split(',').forEach(str => {
    const [key, quality] = str.split('=');
    part[key] = parseInt(quality);
  })
  return part;
})

let sum = 0;

for(const part of parts) {
  let destination = 'in'
  while (true) {
    const workflow = workFlows[destination];
    destination = workflow.analyze(part);
    if (['A', 'R'].includes(destination)) {
      if(destination === 'A') sum += Object.values(part).reduce((a, b) => a + b);
      break;
    }
  }
}

console.log(sum)