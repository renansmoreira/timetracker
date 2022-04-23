import { useEffect, useState } from 'react';
import Datetime from '../../components/datetime/Datetime';
import TableColumn from '../../components/table/table-body/TableColumn';
import TableLine from '../../components/table/table-line/TableLine';
import TableBody from '../../components/table/body/table-body/TableBody';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { TimerSchema } from './TimerSchema';
import TableHeaderColumn from '../../components/table/header/table-header-column/TableHeaderColumn';
import TableHeader from '../../components/table/header/table-header/TableHeader';
import TableFooter from '../../components/table/footer/table-footer/TableFooter';
import Table from '../../components/table/Table';
import { Link, Outlet } from 'react-router-dom';

export default function Timers() {
  const [timers, setTimers] = useState<JsonApiResponse<TimerSchema>>({
    meta: {
      template: []
    },
    data: []
  });
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTimers() {
      const response = await fetch('http://localhost:3100/timers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const json = await response.json();
      setTimers(json);
      setAllowedMethods(response.headers.get('Allow')!.split(',').map((method) => method.trim()));
    }

    fetchTimers();
  }, []);

  return (
    <div>
      {allowedMethods.indexOf('POST') > -1 ? (
        <Link className="button is-link" to="/timers/add">Create new</Link>
      ) : ''}

      <Table>
        <TableHeader>
          <TableLine>
            {timers.meta.template.map((template) => (
              <TableHeaderColumn key={template.name}>{template.displayName}</TableHeaderColumn>
            ))}
            {allowedMethods.indexOf('PUT') > -1 ? (
              <TableHeaderColumn>Actions</TableHeaderColumn>
            ) : ''}
          </TableLine>
        </TableHeader>
        <TableBody>
          {timers.data?.map((timer) => (
            <TableLine key={timer.id}>
              <TableColumn>
                <Datetime value={timer.attributes.startDate} />
              </TableColumn>
              <TableColumn>
                <Datetime value={timer.attributes.endDate} />
              </TableColumn>
              {allowedMethods.indexOf('PUT') > -1 ? (
                <TableColumn>
                  <Link className="button is-link" to={`/timers/${timer.id}`}>Update</Link>
                </TableColumn>
              ) : ''}
            </TableLine>
          ))}
        </TableBody>
        <TableFooter>
          <TableLine>
            {timers.meta.template.map((template) => (
              <TableColumn key={template.name}>{template.displayName}</TableColumn>
            ))}
            {allowedMethods.indexOf('PUT') > -1 ? (
              <TableColumn />
            ) : ''}
          </TableLine>
        </TableFooter>
      </Table>

      <Outlet />
    </div>
  );
}
