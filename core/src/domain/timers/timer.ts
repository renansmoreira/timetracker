import { DateRepresentation } from '../date-representation';
import { Id } from '../id';
import { Project } from '../projects/project';
import { TimerNotStartedException } from './timer-not-started-exception';

export class Timer {
  private _id: Id;
  private _description?: string;
  private _billable: boolean;
  private _project?: Project;
  private _startDate?: DateRepresentation;
  private _endDate?: DateRepresentation;
  private _elapsedTime?: number;

  constructor(id?: Id, startDate?: DateRepresentation,
    endDate?: DateRepresentation, billable?: boolean, description?: string, project? : Project) {
    this._id = id || new Id();
    this._description = description;
    this._billable = billable || false;
    this._startDate = startDate || undefined;
    this._endDate = endDate || undefined;
    this._project = project;
  }

  start(): void {
    this._startDate = new DateRepresentation();
  }

  end(): void {
    if (!this._startDate)
      throw new TimerNotStartedException();

    this._endDate = new DateRepresentation();
    this._elapsedTime = this._endDate?.minus(this._startDate).timestamp;
  }

  get id(): Id {
    return this._id;
  }

  get startDate(): DateRepresentation | undefined {
    return this._startDate;
  }

  get endDate(): DateRepresentation | undefined {
    return this._endDate;
  }

  get billable(): boolean {
    return this._billable;
  }

  get description(): string | undefined {
    return this._description;
  }

  get project(): Project | undefined {
    return this._project;
  }
}
