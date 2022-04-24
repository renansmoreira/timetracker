import { expect } from 'chai';
import { DateRepresentation } from '../../../src/domain/date-representation';
import { Id } from '../../../src/domain/id';
import { Timer } from '../../../src/domain/timers/timer';
import { TimerNotStartedException } from '../../../src/domain/timers/timer-not-started-exception';

describe('Timer', () => {
  it('should be created', () => {
    const newTimer = new Timer();

    expect(newTimer.id).to.be.not.undefined;
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
