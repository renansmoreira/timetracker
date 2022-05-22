import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CreateNew from '../../components/create-new/CreateNew';
import Display from '../../components/display/Display';
import RecordListing from '../../components/record-listing/RecordListing';
import TableColumn from '../../components/table/table-body/TableColumn';
import TableLine from '../../components/table/table-line/TableLine';
import { emptyJsonApiResponse } from '../../responses/json-api/EmptyJsonApiResponse';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { CustomerSchema } from './CustomerSchema';

export default function Customers() {
  const [isLoading, setIsLoading] = useState(true);
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);
  const [customers, setCustomers] = useState<JsonApiResponse<CustomerSchema>>(emptyJsonApiResponse);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/customers')
      return;

    async function fetchCustomers() {
      const response = await fetch('http://localhost:3100/customers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const json = await response.json();
      setCustomers(json);
      setAllowedMethods(response.headers.get('Allow')!.split(',').map((method) => method.trim()));
      setIsLoading(false);
    }

    fetchCustomers();
  }, [location]);

  if (isLoading)
    return (
      <h2>Loading...</h2>
    )

  return (
    <>
      <CreateNew allowedMethods={allowedMethods} addRoute="/customers/add" />
      <RecordListing models={customers} allowedMethods={allowedMethods}>
        {customers.data?.map((customer) => (
          <TableLine key={customer.id}>
            <TableColumn>
              <Display>{customer.attributes.name}</Display>
            </TableColumn>
            {allowedMethods.indexOf('PUT') > -1 ? (
              <TableColumn>
                <Link className="button is-link" to={`/customers/${customer.id}`}>Update</Link>
              </TableColumn>
            ) : ''}
          </TableLine>
        ))}
      </RecordListing>

      <Outlet />
    </>
  );
}
