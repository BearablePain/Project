import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routers } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';

const AppRouter = () => (
  <Routes>
    {routers.map(({ element, path }) => (

      <Route
        key={path}
        path={path}
        element={(
          <Suspense fallback={<PageLoader />}>
            <div className="page-wrapper">{element}</div>
            {' '}
          </Suspense>
        )}
      />
    ))}
  </Routes>
);

export default AppRouter;
