import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import Datetime from '../datetime/Datetime';
import TableBody from '../table/body/table-body/TableBody';
import TableFooter from '../table/footer/table-footer/TableFooter';
import TableHeaderColumn from '../table/header/table-header-column/TableHeaderColumn';
import TableHeader from '../table/header/table-header/TableHeader';
import Table from '../table/Table';
import TableColumn from '../table/table-body/TableColumn';
import TableLine from '../table/table-line/TableLine';

interface Props<T> {
  models: JsonApiResponse<T>;
  children: ReactNode;
  allowedMethods: string[];
}

export default function RecordListing<T>({ models, children, allowedMethods }: Props<T>) {
  return (
    <Table>
      <TableHeader>
        <TableLine>
          {models.meta.template['GET'].map((template) => (
            <TableHeaderColumn key={template.name}>{template.displayName}</TableHeaderColumn>
          ))}
          {allowedMethods.indexOf('PUT') > -1 ? (
            <TableHeaderColumn>Actions</TableHeaderColumn>
          ) : ''}
        </TableLine>
      </TableHeader>
      <TableBody>
        {children}
      </TableBody>
      <TableFooter>
        <TableLine>
          {models.meta.template['GET'].map((template) => (
            <TableColumn key={template.name}>{template.displayName}</TableColumn>
          ))}
          {allowedMethods.indexOf('PUT') > -1 ? (
            <TableColumn />
          ) : ''}
        </TableLine>
      </TableFooter>
    </Table>
  );
}
