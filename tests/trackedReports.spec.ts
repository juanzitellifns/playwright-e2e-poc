import { expect, test } from '@playwright/test';
import { TestAuthManager } from './../src/TestAuthManager';

let token: string | null = null

test.beforeAll(async () => {
  const testAuthManager = await TestAuthManager.getInstance()
  token = testAuthManager.getAccessToken()
})

test.afterAll(() => {
  token = null
})

const TRACKED_REPORTS_QUERY = `
          query TrackedReportsFilter($input: QueryInput!) {
            trackedReports(input: $input) {
              totalRecords
              totalPages
              pageSize
              data {
                id
                assigneeId
                statusCode
              }
              currentPage
            }
          }
        `;

test('should perform all_unassigned_forms test correctly', async ({ request }) => {
  const page = 1;
  const pageSize = 10;

  const response = await (await request.post("/graphql", {
    headers:
    {
      'Authorization': `Bearer ${token}`
    },
    data: {
      query: TRACKED_REPORTS_QUERY,
      variables: {
        "input": {
          "filters": {
            "fields": [
              {
                "fieldName": "assigneeId",
                "fieldValue": null,
                "fieldValues": [],
                "logicOperator": "OR",
                "relationalOperator": "EQUAL",
              },
            ],
            "logicOperator": "AND",
          },
          "pagination": {
            page,
            pageSize
          },
        }
      },
    }
  })).json()

  const unassignedValues = response.data.trackedReports.data.filter(i => i.assigneeId !== null)

  expect(unassignedValues.length).toEqual(0)
})

test('should perform your_open_forms test correctly', async ({ request }) => {
  const assigneeId = 'b5e8990a-0b01-4c08-87ea-fd656709432a';
  const page = 1;
  const pageSize = 10;
  const statusCode = 'IN_REVIEW';

  const response = await (await request.post("/graphql", {
    headers:
    {
      'Authorization': `Bearer ${token}`
    },
    data: {
      query: TRACKED_REPORTS_QUERY,
      variables: {
        input: {
          filters: {
            fields: [
              {
                fieldName: 'assigneeId',
                fieldValues: [assigneeId],
                logicOperator: "OR",
                relationalOperator: "EQUAL",
              },
              {
                fieldName: 'statusCode',
                fieldValues: [statusCode],
                logicOperator: "OR",
                relationalOperator: "EQUAL",
              },
            ],
            logicOperator: "AND",
          },
          pagination: {
            page,
            pageSize,
          },
        },
      },
    }
  })).json()

  const openForms = response.data.trackedReports.data.filter(i => i.statusCode !== statusCode || i.assigneeId !== assigneeId)

  expect(openForms.length).toEqual(0)
})

test('should perform aging_forms test correctly', async ({ request }) => {
  const assigneeId = 'b5e8990a-0b01-4c08-87ea-fd656709432a';
  const page = 1;
  const pageSize = 10;
  const statusCode = 'IN_REVIEW';
  const agingDate = new Date('2023-12-06T20:03:46.058Z');

  const response = await (await request.post("/graphql", {
    headers:
    {
      'Authorization': `Bearer ${token}`
    },
    data: {
      query: TRACKED_REPORTS_QUERY,
      variables: {
        input: {
          filters: {
            fields: [
              {
                fieldName: 'assigneeId',
                fieldValues: [assigneeId],
                logicOperator: "OR",
                relationalOperator: "EQUAL",
              },
              {
                fieldName: 'statusCode',
                fieldValues: [statusCode],
                logicOperator: "OR",
                relationalOperator: "EQUAL",
              },
              {
                fieldName: 'lastActivity',
                fieldValues: [agingDate.toISOString()],
                logicOperator: "OR",
                relationalOperator: "LESS",
              },
            ],
            logicOperator: "AND",
          },
          pagination: {
            page,
            pageSize,
          },
        },
      },
    }
  })).json()

  const agingForms = response.data.trackedReports.data.filter(i => i.statusCode !== statusCode && i.assigneeId !== assigneeId && new Date(i.lastActivity) < agingDate)

  expect(agingForms.length).toEqual(0)
})
