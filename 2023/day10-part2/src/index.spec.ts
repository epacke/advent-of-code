import {describe, expect, test} from '@jest/globals';
import { PipeNetwork, ICoordinate} from './index';

const input = `.....
.S-7.
.|.|.
.L-J.
.....`

describe('Pipe connections', () => {
  test('From 2,1 ', () => {
    const network = new PipeNetwork(input);
    expect(network.isConnectedTo({y: 2, x: 1}, {y: 3, x: 1}))
      .toEqual(true);
    expect(network.isConnectedTo({y: 3, x: 1}, {y: 2, x: 1}))
      .toEqual(true);
    expect(network.isConnectedTo({y: 3, x: 1}, {y: 3, x: 2}))
      .toEqual(true);
    expect(network.isConnectedTo({y: 3, x: 1}, {y: 1, x: 2}))
      .toEqual(false);
    expect(network.isConnectedTo({y: 1, x: 3}, {y: 0, x: 3}))
      .toEqual(false);
  })
});


describe('Figure out next step', () => {

  test('From the start', () => {
    const network = new PipeNetwork(input);
    network.currentPath = []
    const res = network.nextSteps({y: 1, x: 1}, []);
    expect(res)
      .toEqual([{ y: 2, x: 1}, {y: 1, x: 2}]);
  });

  test('From the second step', () => {
    const network = new PipeNetwork(input);
    network.currentPath = []
    const res = network.nextSteps({y: 2, x: 1}, [] );
    expect(res)
      .toEqual([{ y: 3, x: 1}, {y: 1, x: 1}]);
  });

  test('From the second step right', () => {
    const network = new PipeNetwork(input);
    network.currentPath = []
    const res = network.nextSteps({y: 1, x: 2}, []);
    expect(res)
      .toEqual([{ y: 1, x: 3}, {y: 1, x: 1}]);
  });

});
