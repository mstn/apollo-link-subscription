
import {
  ApolloLink,
  Observable,
  Operation,
  NextLink,
} from 'apollo-link';

import { getMainDefinition } from 'apollo-utilities';

import {
  BREAK,
  visit,
  OperationDefinitionNode,
} from 'graphql';

const visitor = {
  OperationDefinition(node: OperationDefinitionNode) {
    switch (node.operation) {
      case 'subscription':
        return {
          ...node,
          operation: 'query'
        };
      default:
        return node;
    }
  }
};

export class SubscriptionLink extends ApolloLink {

  public request(operation: Operation, forward: NextLink): Observable<any> | null {
    const document = operation.query;
    const newDocument = visit(document, visitor);
    return forward({
      ...operation,
      query: newDocument,
    });
  }

}
