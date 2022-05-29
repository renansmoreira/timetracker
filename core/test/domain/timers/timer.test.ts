import { expect } from 'chai';
import { Customer } from '../../../src/domain/customers/customer';
import { DateRepresentation } from '../../../src/domain/date-representation';
import { Id } from '../../../src/domain/id';
import { Project } from '../../../src/domain/projects/project';
import { Timer } from '../../../src/domain/timers/timer';
import { TimerNotStartedException } from '../../../src/domain/timers/timer-not-started-exception';

describe('Timer', () => {
  it('should be created with default values', () => {
    const newTimer = new Timer();

    expect(newTimer.id).to.be.not.undefined;
    expect(newTimer.startDate).to.be.undefined;
    expect(newTimer.endDate).to.be.undefined;
    expect(newTimer.billable).to.be.false;
    expect(newTimer.description).to.be.undefined;
  });

  it('should be created with id', () => {
    const id = new Id('123');

    const newTimer = new Timer(id);

    expect(newTimer.id).to.equal(id);
  });

  it('should be created with start timer', () => {
    const startDate = new DateRepresentation();

    const newTimer = new Timer(undefined, startDate);

    expect(newTimer.startDate).to.equal(startDate);
  });

  it('should be created with end timer', () => {
    const endDate = new DateRepresentation();

    const newTimer = new Timer(undefined, undefined, endDate);

    expect(newTimer.endDate).to.equal(endDate);
  });

  it('should be created indicating if it is billable or not', () => {
    const isBillable = true;

    const newTimer = new Timer(undefined, undefined, undefined, isBillable);

    expect(newTimer.billable).to.equal(isBillable);
  });

  it('should be created with description', () => {
    const description = 'description';

    const newTimer = new Timer(undefined, undefined, undefined, undefined, description);

    expect(newTimer.description).to.equal(description);
  });

  it('should be created with project', () => {
    const customer = new Customer('customer');
    const project = new Project('name', customer);

    const newTimer = new Timer(undefined, undefined, undefined, undefined, undefined, project);

    expect(newTimer.project).to.equal(project);
  });

  it('should be started', () => {
    const timer = new Timer();
    const currentTimestamp = Date.now();

    timer.start();

    expect(timer.startDate?.timestamp).to.be.closeTo(currentTimestamp, 5);
  });

  it('should be ended', () => {
    const timer = new Timer();
    const currentTimestamp = Date.now();
    timer.start();

    timer.end();

    expect(timer.endDate?.timestamp).to.be.closeTo(currentTimestamp, 5);
  });

  it('should not be able to end a not started timer', () => {
    const timer = new Timer();
    const expectedError = new TimerNotStartedException();

    const act = () => timer.end();

    expect(act).to.throw(expectedError.message);
  });

  it('should return the elapsed time', () => {
    const baseTime = Date.now();
    const startPastTime = baseTime - 50000;
    const expectedTimeInMs = baseTime - startPastTime;
    const timer = new Timer(new Id('1'), new DateRepresentation(startPastTime));

    const elapsedTime = timer.end();

    expect(elapsedTime.timestamp).to.be.closeTo(expectedTimeInMs, 5);
  });
})
