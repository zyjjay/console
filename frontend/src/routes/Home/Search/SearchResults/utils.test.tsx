// Copyright (c) 2023 Red Hat, Inc.
// Copyright Contributors to the Open Cluster Management project
import i18next from 'i18next'
import { generateSearchResultExport, GetRowActions } from './utils'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const t = i18next.t.bind(i18next)

test('Correctly return row Actions', () => {
  const res = GetRowActions('Pod', 'kind:Pod', false, () => {}, t)
  res[0].click({ kind: 'Pod' }) // edit resource
  res[1].click({ kind: 'Pod' }) // view related resources
  res[2].click({ kind: 'Pod' }) // delete resource
  expect(res).toMatchSnapshot()
})

test('Correctly return empty row Actions for restricted resource', () => {
  const res = GetRowActions('Cluster', 'kind:Cluster', false, () => {}, t)
  expect(res).toMatchSnapshot()
})

test('Correctly return empty row Actions for Application', () => {
  const res = GetRowActions('Application', 'kind:Application', false, () => {}, t)
  res[0].click({
    apigroup: 'app.k8s.io',
    kind: 'Application',
    cluster: 'local-cluster',
    name: 'testApp',
    namespace: 'testAppNs',
  }) // edit app
  res[1].click({
    apigroup: 'app.k8s.io',
    kind: 'Application',
    cluster: 'local-cluster',
    name: 'testApp',
    namespace: 'testAppNs',
  }) // view app topology
  expect(res).toMatchSnapshot()
})

test('generateSearchResultExport - Correctly generates and triggers csv download', () => {
  const toastContextMock: any = {
    addAlert: jest.fn(),
  }
  const t = (key: string) => key
  window.URL.createObjectURL = jest.fn()

  const searchResultDataMock = {
    searchResult: [
      {
        items: [
          {
            _hubClusterResource: 'true',
            _ownerUID: 'local-cluster/1234-abcd',
            _uid: 'local-cluster/1234-abcd',
            apiversion: 'v1',
            cluster: 'local-cluster',
            container: 'search-postgres',
            created: '2024-04-15T14:23:59Z',
            hostIP: '10.0.68.86',
            image: 'quay.io/image',
            kind: 'Pod',
            kind_plural: 'pods',
            label: 'app=search; component=search-v2-operator; name=search-postgres; pod-template-hash=d7778bcb6',
            name: 'search-postgres-d7778bcb6-bf7xq',
            namespace: 'open-cluster-management',
            podIP: '10.129.0.116',
            restarts: '0',
            startedAt: '2024-04-15T14:23:59Z',
            status: 'Running',
          },
          {
            _hubClusterResource: 'true',
            _ownerUID: 'local-cluster/1234-abcd',
            _uid: 'local-cluster/1234-abcd',
            apiversion: 'v1',
            cluster: 'local-cluster',
            container: 'search-api',
            created: '2024-04-15T14:23:59Z',
            hostIP: '10.0.3.162',
            image: 'quay.io/image',
            kind: 'Pod',
            kind_plural: 'pods',
            label: 'app=search; component=search-v2-operator; name=search-api; pod-template-hash=69775dc595',
            name: 'search-api-69775dc595-lhrk9',
            namespace: 'open-cluster-management',
            podIP: '10.130.0.114',
            restarts: '0',
            startedAt: '2024-04-15T14:23:59Z',
            status: 'Running',
          },
          {
            _hubClusterResource: 'true',
            _ownerUID: 'local-cluster/1234-abcd',
            _uid: 'local-cluster/1234-abcd',
            apiversion: 'v1',
            cluster: 'local-cluster',
            container: 'search-collector',
            created: '2024-04-15T14:23:59Z',
            hostIP: '10.0.68.86',
            image: 'quay.io/image',
            kind: 'Pod',
            kind_plural: 'pods',
            name: 'search-collector-764d748c4f-pbgrb',
            namespace: 'open-cluster-management',
            podIP: '10.129.0.117',
            restarts: '0',
            startedAt: '2024-04-15T14:23:59Z',
            status: 'Running',
          },
        ],
        __typename: 'SearchResult',
      },
    ],
  }

  generateSearchResultExport(searchResultDataMock, toastContextMock, t)

  expect(toastContextMock.addAlert).toHaveBeenCalledWith({
    title: 'Generating data. Download may take a moment to start.',
    type: 'info',
    autoClose: true,
  })
  expect(window.URL.createObjectURL).toHaveBeenCalledTimes(1)
  expect(toastContextMock.addAlert).toHaveBeenCalledWith({
    title: 'Export successful',
    type: 'success',
    autoClose: true,
  })
})
