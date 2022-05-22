import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CreateNew from '../../components/create-new/CreateNew';
import Display from '../../components/display/Display';
import RecordListing from '../../components/record-listing/RecordListing';
import TableColumn from '../../components/table/table-body/TableColumn';
import TableLine from '../../components/table/table-line/TableLine';
import { emptyJsonApiResponse } from '../../responses/json-api/EmptyJsonApiResponse';
import { JsonApiResponse } from '../../responses/json-api/JsonApiResponse';
import { ProjectSchema } from './ProjectSchema';

export default function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [allowedMethods, setAllowedMethods] = useState<string[]>([]);
  const [projects, setProjects] = useState<JsonApiResponse<ProjectSchema>>(emptyJsonApiResponse);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/projects')
      return;

    async function fetchProjects() {
      const response = await fetch('http://localhost:3100/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        }
      });
      const json = await response.json();
      setProjects(json);
      setAllowedMethods(response.headers.get('Allow')!.split(',').map((method) => method.trim()));
      setIsLoading(false);
    }

    fetchProjects();
  }, [location]);

  if (isLoading)
    return (
      <h2>Loading...</h2>
    )

  return (
    <>
      <CreateNew allowedMethods={allowedMethods} addRoute="/projects/add" />
      <RecordListing models={projects} allowedMethods={allowedMethods}>
        {projects.data?.map((project) => (
          <TableLine key={project.id}>
            <TableColumn>
              <Display>{project.attributes.name}</Display>
            </TableColumn>
            <TableColumn>
              <Display>{project.attributes.billable.toString()}</Display>
            </TableColumn>
            <TableColumn>
              <Display>{project.attributes.customerName}</Display>
            </TableColumn>
            {allowedMethods.indexOf('PUT') > -1 ? (
              <TableColumn>
                <Link className="button is-link" to={`/projects/${project.id}`}>Update</Link>
              </TableColumn>
            ) : ''}
          </TableLine>
        ))}
      </RecordListing>

      <Outlet />
    </>
  );
}
