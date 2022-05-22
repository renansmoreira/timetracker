import { useEffect, useState } from 'react';
import Datetime from '../../components/datetime/Datetime';
import TableColumn from '../../components/table/table-body/TableColumn';
import TableLine from '../../components/table/table-line/TableLine';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { TimerSchema } from './TimerSchema';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CreateNew from '../../components/create-new/CreateNew';
import RecordListing from '../../components/record-listing/RecordListing';
import { emptyJsonApiResponse } from '../../responses/json-api/EmptyJsonApiResponse';

export default function Timers() {
  const [isLoading, setIsLoading] = useState(true);
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);
  const [timers, setTimers] = useState<JsonApiResponse<TimerSchema>>(emptyJsonApiResponse);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/timers')
      return;

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
      setIsLoading(false);
    }

    fetchTimers();
  }, [location]);

  if (isLoading)
    return (
      <h2>Loading...</h2>
    )

  return (
    <>
      <CreateNew allowedMethods={allowedMethods} addRoute="/timers/add" />
      <RecordListing models={timers} allowedMethods={allowedMethods}>
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
      </RecordListing>

      <Outlet />
    </>
  );
}
