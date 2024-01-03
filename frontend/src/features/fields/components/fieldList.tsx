import * as React from "react";
import { NewData, Title } from "../../../shared";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { FieldsQuery } from "../queries";
import { Field } from "../models/Field.model";

import {
  CustomTableHead,
  ErrorBox,
  Spinner,
  EditableTableRow,
} from "../../../shared";
import { useState } from "react";

const FieldsContext: React.Context<any> = React.createContext(null);

export const FieldList = () => {
  const query = FieldsQuery();
  const fieldList = query.useList();
  const createMutation = query.useCreate();
  const nameRef: React.MutableRefObject<HTMLInputElement | undefined> =
    React.useRef<undefined>();
  const columns: string[] = ["Name", "", ""];
  const [blockedState, setBlockedState] = useState<boolean>(false);

  const rules = {
    required: true,
  }

  return (
    <>
      <Title>Fields</Title>
      {fieldList.isError && (
        <ErrorBox
          msg={fieldList.error instanceof Error && fieldList.error.message}
        />
      )}
      {fieldList.isLoading && <Spinner />}
      {fieldList.isSuccess && fieldList.data && (
        <>
          <Table size="small">
            <CustomTableHead columns={columns} />
            <TableBody>
              {fieldList.data.data.map((field: Field): React.ReactElement => {
                return (
                  <EditableTableRow
                    key={field.id}
                    item={field}
                    name="field"
                    valueName="name"
                    query={query}
                    blockedState={blockedState}
                    setBlockedState={setBlockedState}
                  />
                );
              })}
            </TableBody>
          </Table>
          <NewData
              name="field"
              valueName="name"
              query={query}
              blockedState={blockedState}
              setBlockedState={setBlockedState}
              rules={rules}
          />
        </>
      )}
    </>
  );
};
