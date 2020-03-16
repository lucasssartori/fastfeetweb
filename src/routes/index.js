import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
// import ListStudents from '~/pages/Students/List';
// import StoreStudent from '~/pages/Students/Form';
// import ListPlan from '~/pages/Plans/List';
// import StorePlan from '~/pages/Plans/Form';
// import ListEnrollment from '~/pages/Enrollments/List';
// import StoreEnrollment from '~/pages/Enrollments/Form';
// import ListQuestions from '~/pages/Questions/List';
// import InvalidRoute from '~/pages/InvalidRoute';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="//list" component={SignIn} isPrivate />
      <Route path="//store" component={SignIn} isPrivate />
      <Route path="//update/:id" component={SignIn} isPrivate />

      <Route path="//list" component={SignIn} isPrivate />
      <Route path="//store" component={SignIn} isPrivate />
      <Route path="//update/:id" component={SignIn} isPrivate />

      <Route path="//list" component={SignIn} isPrivate />
      <Route path="//store" component={SignIn} isPrivate />
      <Route path="//update/:id" component={SignIn} isPrivate />

      <Route path="//list" component={SignIn} isPrivate />

      <Route path="/" component={SignIn} />
    </Switch>
  );
}
