import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../dashboard/Dashboard";
import ChildrenList from "../children/childrenList";
import CleaningList from "../cleanings/cleaningList";
import FieldList from "../fields/fieldList";
import SalaryList from "../salary/salaryList";

function MainRoutes () {


  const [childrenListState, setChildrenListState] = useState([]);
  const [cleaningListState, setCleaningListState] = useState([]);
  const [fieldListState, setFieldListState] = useState([]);
  const [salaryListState, setSalaryListState] = useState([]);

    return <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/cleanings"
                    element={
                      <CleaningList
                        cleaningsState={cleaningListState}
                        onAddCleaning={addCleaningHandler}
                      />
                    }
                  />
                  <Route path="/children">
                    <Route
                      index
                      path="/children"
                      element={
                        <ChildrenList
                          childrenState={childrenListState}
                          onAddChild={addChildHandler}
                        />
                      }
                    />
                    <Route path=":id" element={<ChildrenList />} />
                  </Route>
                  <Route
                    path="/salary"
                    element={
                      <SalaryList
                        salaryState={salaryListState}
                        onAddSalary={addSalaryHandler}
                      />
                    }
                  />
                  <Route
                    path="/fields"
                    element={
                      <FieldList
                        fieldState={fieldListState}
                        onAddField={addFieldHandler}
                      />
                    }
                  />
                  <Route path="/settings" element={<h1>settings</h1>} />
                </Routes>
};

export default MainRoutes;