import {input, simpleInput } from './input'

type Flow = { limit: number; operator: number; partId: string; destination: string };

interface Parts {
  x: number[],
  m: number[],
  a: number[],
  s: number[],
}

class Workflow {

  id: string;
  flows: Flow[]
  default: string;

  constructor(workflow) {
    const [ id, rest ] = workflow.split('{');
    const flows = rest.split(/[,}]/g);
    flows.pop();
    this.id = id;
    this.default = flows.pop();
    this.flows = flows.map((f): Flow => {
      const [cat, test, key] = f.split(/[<>:]/g);
      const operator = f[1];
      return {
        limit: parseInt(test), operator: operator === '<' ? -1: 1, destination: key, partId: cat
      }
    });
    // Add the default work flow
    this.flows.push({limit: 0, operator: 1, partId: 'x', destination: this.default})
  }

}

const [ workFlowStr ]= input.trim().split(/\n\n/);
const workflows = new Map<string, Flow[]> ();

workFlowStr.split('\n').forEach(wfStr => {
  const wf = new Workflow(wfStr);
  workflows.set(wf.id, wf.flows)
})

const calculateCombinations = (part: Parts, workflow = 'in') => {
  if (['R','A'].includes(workflow)) {
    return workflow === 'A' ?
      Object.values(part).reduce(
        (sum, [low, high]) => sum * (high - low + 1), 1)
      : 0;
  }

  let combinations = 0;
  for (const { limit, operator, partId, destination } of workflows.get(workflow)) {
    const [lowNumber, highNumber] = part[partId];
    if ((lowNumber - limit) * operator > 0) {
      if ((highNumber - limit) * operator > 0) {
        return combinations + calculateCombinations(part, destination);
      } else {
        combinations += calculateCombinations({
          ...part,
          ...{[partId]: [lowNumber, limit - 1]}
        });
        part[partId] = [limit, highNumber];
      }
    } else if ((highNumber - limit) * operator > 0) {
      combinations += calculateCombinations({
        ...part,
        ...{ [partId]: [limit + 1, highNumber] }
      });
      part[partId] = [lowNumber, limit];
    }
  }
};

const [x, m, a, s] = [[1, 4000], [1, 4000], [1, 4000], [1, 4000]]
console.log(calculateCombinations({ x, m, a, s }))
