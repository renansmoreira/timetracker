import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Display from '../../components/display/Display';
import TableBody from '../../components/table/body/table-body/TableBody';
import TableFooter from '../../components/table/footer/table-footer/TableFooter';
import TableHeaderColumn from '../../components/table/header/table-header-column/TableHeaderColumn';
import TableHeader from '../../components/table/header/table-header/TableHeader';
import Table from '../../components/table/Table';
import TableColumn from '../../components/table/table-body/TableColumn';
import TableLine from '../../components/table/table-line/TableLine';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { CustomerSchema } from './CustomerSchema';

export default function Customers() {
  const [isLoading, setIsLoading] = useState(true);
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);
  const [customers, setCustomers] = useState<JsonApiResponse<CustomerSchema>>({
    meta: {
      template: {
        GET: []
      }
    },
    data: []
  });
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
      {allowedMethods.indexOf('POST') > -1 ? (
        <Link className="button is-link" to="/customers/add">Create new</Link>
      ) : ''}

      <Table>
        <TableHeader>
          <TableLine>
            {customers.meta.template['GET'].map((template) => (
              <TableHeaderColumn key={template.name}>{template.displayName}</TableHeaderColumn>
            ))}
            {allowedMethods.indexOf('PUT') > -1 ? (
              <TableHeaderColumn>Actions</TableHeaderColumn>
            ) : ''}
          </TableLine>
        </TableHeader>
        <TableBody>
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
        </TableBody>
        <TableFooter>
          <TableLine>
            {customers.meta.template['GET'].map((template) => (
              <TableColumn key={template.name}>{template.displayName}</TableColumn>
            ))}
            {allowedMethods.indexOf('PUT') > -1 ? (
              <TableColumn />
            ) : ''}
          </TableLine>
        </TableFooter>
      </Table>

      <Outlet />
    </>
  );
}
