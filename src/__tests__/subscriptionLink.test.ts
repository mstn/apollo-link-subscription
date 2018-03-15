import gql from 'graphql-tag';

import { SubscriptionLink } from '..';

import { execute } from 'apollo-link';

describe('SubscriptionLink', () => {

  it('transforms subscription into query', () => {

    const query = gql`
      subscription onCommentAdded($repoFullName: String!){
        commentAdded(repoFullName: $repoFullName){
          id
          content
        }
      }
    `;

    const expectedResult = gql`
      query onCommentAdded($repoFullName: String!){
        commentAdded(repoFullName: $repoFullName){
          id
          content
        }
      }
    `;

    const link = new SubscriptionLink().concat((operation) => {
      expect(operation.variables).toMatchObject({
        repoFullName: 'repoName'
      });
      expect(operation.query.definitions).toEqual(expectedResult.definitions);
      return null;
    });

    execute(link, {
      query,
      variables: {
        repoFullName: 'repoName'
      }
    });

  });

});
